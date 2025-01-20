import { useI18n } from "vue-i18n"
import { useModalNotification } from "../widgets/modal/useModalNotification"
import { useForm } from "vee-validate"
import { AuthVerificationFormType } from "@/models/auth/AuthModel"
import { ref } from "vue"
import { isValidPhoneNumberWithCharacter } from "@/commons"
import { authApi } from "@/services/api/auth/AuthApi"
import { useLoading } from "../common/useLoading"
import { useHandleKeyPress } from "../common/useHandleKeyPress"

type VerificationViewStatusType = 'confirm-account' | 'verify-account'
type AuthVerifyAccountConfigsParam = {
  type?: 'find-id' | 'reset-password'
  verifyCallback?: (value?: any) => void
}

export const useAuthVerifyAccount = (configs: AuthVerifyAccountConfigsParam) => {
  // default configs type: reset-password
  const { type = 'reset-password', verifyCallback } = configs
  const { t } = useI18n()
  const { setLoading } = useLoading()
  const { openModal: openNotification, closeModalByPop } = useModalNotification()
  const verifyRef = ref()
  const viewStatus = ref<VerificationViewStatusType>('confirm-account')
  const { values, setFieldValue, handleSubmit } = useForm<AuthVerificationFormType>()
  const otp = ref()
  const csrfToken = ref()

  const onConfirm = handleSubmit(async () => {
    try {
      if (type === 'reset-password') {
        handleResetPasswordSendOtp(values)
      }
      if (type === 'find-id') {
        if (!values.name) {
          return
        } else if (!isValidPhoneNumberWithCharacter(values.phone)) {
          return openNotification?.({
            content: t('auth.findId.notification.errorPhone')
          })
        }
        onSubmitConfirmFindId()
      }
    } catch (error) {
      console.error(error)
    }
  })

  const onVerify = () => {
    if (type === 'reset-password') {
      handleResetPasswordVerify()
    }
    if (type === 'find-id') {
      onSubmitVerifyFindId()
    }
  }

  const onResend = handleSubmit(async (values) => {
    if (type === 'reset-password') {
      handleResetPasswordSendOtp(values)
    }
    if (type === 'find-id') {
      onSubmitConfirmFindId()
    }
  })

  const handleResetPasswordSendOtp = async (values: AuthVerificationFormType) => {
    const reqData = { name: values.name, phone: values.phone.split('-').join('') }
    authApi.passwordFindId(reqData).then((res) => {
      const { csrfToken } = res.data
      setFieldValue('csrfToken', csrfToken)
      // response case: verification code be sent
      openNotification({
        content: t('auth.reset-password.verification-number-be-sent-modal-message'),
        onAccept: () => {
          closeModalByPop?.()
          activeVerifyAccount()
        }
      })
    }).catch(() => {
      // response case: response invalid name phone
      openNotification({
        content: t('auth.reset-password.invalid-phone-name')
      })
    })
  }

  const activeVerifyAccount = () => {
    if(viewStatus.value !== 'verify-account') {
      viewStatus.value = 'verify-account'
      verifyRef?.value?.timerStart()
    }
  }

  const onSubmitConfirmFindId = handleSubmit(async () => {
    try {
      // api here
      setLoading?.(true)
      const response = await authApi.findId({ memberName: values.name, cellphoneNumber: values.phone.replaceAll('-', '') })
      otp.value = response?.data?.otp
      csrfToken.value = response?.data?.csrfToken
      openNotification?.({
        content: t('auth.findId.notification.sendPhone'),
        onAccept() {
          activeVerifyAccount()
          closeModalByPop?.()
        }
      })
    } catch (error: any) {
      openNotification?.({
        content: t('auth.findId.notification.errorFindId')
      })
    }
    finally {
      setLoading?.(false)
    }
  })

  const onSubmitVerifyFindId = handleSubmit(async () => {
    if (values.code !== otp.value) {
      return openNotification?.({
        content: t('auth.findId.notification.errorOtp')
      })
    }
    try {
      // api here
      setLoading?.(true)
      const response = await authApi.otpConfirmId({ otp: otp.value, csrfToken: csrfToken.value })
      verifyCallback?.(response?.data)
    } catch (error: any) {
      openNotification?.({
        content: t('auth.findId.notification.errorFindId')
      })
    }
    finally {
      setLoading?.(false)
    }
  })

  const handleResetPasswordVerify = handleSubmit((values) => {
    const reqData = {
      csrfToken: values?.csrfToken,
      otp: values.code
    }
    authApi.passwordOtpConfirm(reqData).then((res) => {
      const { csrfToken } = res.data
      setFieldValue('csrfToken', csrfToken)
      verifyCallback?.(res.data)
    }).catch(() => {
      //  auth number incorrect
      openNotification({
        content: t('auth.reset-password.verification-number-incorrect')
      })
    })
  })

  const submitFormByKeyboard = () => {
    if(viewStatus.value !== 'verify-account') {
      onConfirm()
    } else {
      onVerify()
    }
  }
  useHandleKeyPress(submitFormByKeyboard)

  return { verifyRef, viewStatus, values, setFieldValue, onConfirm, onVerify, onResend, csrfToken }
}