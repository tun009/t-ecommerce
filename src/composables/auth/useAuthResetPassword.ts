import { useAuthResetPasswordBase } from '@/composables/auth/useAuthResetPasswordBase'
import { useAuthVerifyAccount } from '@/composables/auth/useAuthVerifyAccount'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { authApi } from '@/services/api/auth/AuthApi'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from '../common/useLoading'
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/account'

export const useAuthResetPassword = () => {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const { setLoading } = useLoading()
  const { openModal: openNotification, closeModalByPop } = useModalNotification()

  const { isLogin } = storeToRefs(useAccountStore())
  const verifiedQuery = computed(() => {
    return isLogin.value && String(route.query?.verified).toLowerCase() === 'true'
  })
  const isVerified = ref<boolean>(false)
  const memberKey = ref<string | number>('')

  const {
    verifyRef,
    viewStatus,
    values: verifyAccountValues,
    setFieldValue: setVerifyAccountFieldValues,
    onConfirm,
    onVerify,
    onResend
  } = useAuthVerifyAccount({
    type: 'reset-password',
    verifyCallback: (data) => handleVerifyCallback(data)
  })

  const {
    values: resetPasswordValues,
    errors: resetPasswordErrors,
    setFieldValue: setResetPasswordFieldValues,
    handleSubmit,
    resetPasswordConfirmBtnStatusComputed
  } = useAuthResetPasswordBase()

  const handleVerifyCallback = (data: any) => {
    memberKey.value = data?.memberKey
    isVerified.value = true
  }

  const handleResetPassword = handleSubmit(async (values) => {
    try {
      setLoading?.(true)
      if (verifiedQuery.value) {
        await authApi.changePassword({ password: values.password })
      }
      else {
        const reqData = {
          name: verifyAccountValues.name,
          phone: verifyAccountValues.phone.split('-').join(''),
          password: values.password,
          csrfToken: verifyAccountValues.csrfToken
        }
        await authApi.resetPassword(memberKey.value, reqData)
      }
      openNotification?.({
        content: t('auth.changePassword.submitSuccess'),
        onAccept: () => {
          closeModalByPop?.()
          router.back()
        }
      })

    } catch {
      openNotification?.({ content: t('auth.changePassword.submitFail') })
    } finally {
      setLoading?.(false)
    }
  })

  return {
    verifiedQuery,
    isVerified,
    verifyRef,
    viewStatus,
    verifyAccountValues,
    resetPasswordValues,
    resetPasswordErrors,
    resetPasswordConfirmBtnStatusComputed,
    setVerifyAccountFieldValues,
    setResetPasswordFieldValues,
    onConfirm,
    onVerify,
    onResend,
    handleResetPassword
  }
}
