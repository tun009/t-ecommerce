import {
  AUTH_LOGIN_RESET_PASSWORD_ROUTER,
  FO_CURRENT_ACCOUNT_ID,
  HOMEPAGE_ROUTER,
  LOGIN_PARAM_CUSTOMER_KEY,
  WELFARE_SAVE_ID,
  emailLoginRegex,
  isEmpty,
  saveToken,
  storage
} from '@/commons'
import { AuthLoginViolationType, AuthPolicyViolationModel } from '@/models/auth/AuthModel'
import { AuthLoginDataModelResponse } from '@/models/services/responses/auth/AuthLoginResponse'
import { axiosOAuth2Service } from '@/services/AxiosOAuth2Service'
import { authApi } from '@/services/api/auth/AuthApi'
import { useAccountStore } from '@/stores/account'
import { useForm } from 'vee-validate'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { object } from 'yup'
import { useBuildLink } from '../common/useBuildLink'
import { useHandleApiError } from '../common/useHandleApiError'
import { useHandleKeyPress } from '../common/useHandleKeyPress'
import { useLoading } from '../common/useLoading'
import { useStorage } from '../common/useStorage'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { useAuthChangePasswordAfter90DaysModal } from './useAuthChangePasswordAfter90DaysModal'

export const useAuthLoginForm = () => {
  const { handleSaveProfile } = useAccountStore()
  const { openModal, closeAllModal } = useModalNotification()
  const { handleError } = useHandleApiError()
  const { loading, setLoading } = useLoading()
  const { openModal: openModalChangePassword } = useAuthChangePasswordAfter90DaysModal()

  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const { processLink } = useBuildLink()
  const myForm = {
    memberId: isEmpty,
    password: isEmpty
  }
  const [saveId, setSaveId] = useStorage<boolean>(WELFARE_SAVE_ID)
  const [accountId, setAccountId] = useStorage<string>(FO_CURRENT_ACCOUNT_ID)

  const handleShowError = () => {
    const { memberId, password } = values

    if (!memberId && !password) return handleOpenModal(t('auth.login.notification.requiredBold'))
    if (!memberId) return handleOpenModal(t('auth.login.notification.requiredId'))
    if (!password) return handleOpenModal(t('auth.login.notification.requiredPassword'))
    if (!emailLoginRegex.test(memberId)) return handleOpenModal(t('auth.login.notification.errorFormatId'))
    if (saveId?.value) {
      setAccountId(values.memberId)
    } else storage.remove(FO_CURRENT_ACCOUNT_ID)
    onSubmit()
  }

  const handleSaveAccount = () => {
    if (saveId?.value && values.memberId && values.password) {
      if (window.PasswordCredential) {
        const passwordCredential = new window.PasswordCredential({ id: values.memberId, password: values.password })
        navigator.credentials.store(passwordCredential)
      }
    }
  }
  const { values, setFieldValue, handleSubmit } = useForm({
    initialValues: {
      memberId: accountId?.value ?? '',
      password: ''
    },
    validationSchema: object(myForm)
  })

  onMounted(() => {
    if (saveId?.value == null) setSaveId(true)
    handleShowPopupPreview()
  })

  const onSubmit = handleSubmit(async (values, { resetForm }) => {
    if (loading?.value) return
    try {
      closeAllModal?.()
      setLoading?.(true)
      const response = await authApi.login({
        ...values,
        customerKey: Number(route.query.customerKey ?? LOGIN_PARAM_CUSTOMER_KEY),
        autoLogin: true
      })
      handleSaveAccount()
      const { data } = response
      saveAuthInfo(data)
      resetForm()
      handleCheckLoginViolation(data?.policyViolation)
    } catch (error: any) {
      const errorData = error?.data
      if (errorData?.data?.policyViolation?.violationType == AuthLoginViolationType.INVALID_ID_PASSWORD) {
        handleOpenModal(t('auth.login.notification.errorPassword'))
      } else if (errorData?.data?.policyViolation?.violationType == AuthLoginViolationType.DEACTIVATED_ACCOUNT) {
        handleOpenModal(t('auth.login.notification.unusedAccount'))
      } else if (errorData?.data?.policyViolation?.violationType == AuthLoginViolationType.PASSWORD_RESET_REQUIRED) {
        saveAuthInfo(errorData?.data)
        router.push(processLink(`${AUTH_LOGIN_RESET_PASSWORD_ROUTER}?verified=true`))
      } else if (errorData?.data?.policyViolation?.violationType == AuthLoginViolationType.LOGIN_FAIL_COUNT_LIMIT_EXCEEDED) {
        handleOpenModal(t('auth.login.notification.errorPasswordMultiple'))
      } else if (
        errorData?.data?.policyViolation?.violationType == AuthLoginViolationType.EMAIL_VERIFICATION_REQUIRED &&
        errorData?.data?.policyViolated
      ) {
        handleVerifyAccount(errorData?.data)
      } else {
        handleError(errorData)
      }
    } finally {
      setLoading?.(false)
    }
  })

  const handleVerifyAccount = (response: AuthLoginDataModelResponse) => {
    saveAuthInfo(response)
    openModal?.({
      content: t('auth.login.notification.errorAccountVerify'),
      onAccept() {
        authApi
          .verifyAccount()
          .then(() => router.push(processLink(HOMEPAGE_ROUTER)))
          .catch(() => {})
      }
    })
  }

  const saveAuthInfo = (data: AuthLoginDataModelResponse) => {
    const { accessToken, refreshToken } = data
    saveToken({
      accessToken,
      refreshToken
    })
    axiosOAuth2Service.attachHeaderToken({
      accessToken: accessToken ?? ''
    })
    handleSaveProfile()
  }

  const handleOpenModal = (message: string = '') => {
    openModal?.({ content: message })
  }

  const handleShowPopupPreview = () => {
    const type = route.query.modal
    if (type === 'id') {
      handleOpenModal(t('auth.login.notification.requiredId'))
    } else if (type === 'password') {
      handleOpenModal(t('auth.login.notification.requiredPassword'))
    } else if (type === 'id-password') {
      handleOpenModal(t('auth.login.notification.requiredBold'))
    } else if (type === 'error-password') {
      handleOpenModal(t('auth.login.notification.errorPassword'))
    } else if (type === 'limit-password') {
      handleOpenModal(t('auth.login.notification.errorPasswordMultiple'))
    }
  }

  const handleCheckLoginViolation = async (policyViolation?: AuthPolicyViolationModel) => {
    if (policyViolation && policyViolation?.violationType === AuthLoginViolationType.PASSWORD_EXPIRATION) {
      openModalChangePassword?.({
        csrfToken: policyViolation?.csrfToken
      })
    } else {
      router.push(processLink(HOMEPAGE_ROUTER))
    }
  }

  useHandleKeyPress(() => {
    onSubmit()
  })

  return { values, setFieldValue, handleShowError, saveId, setSaveId }
}
