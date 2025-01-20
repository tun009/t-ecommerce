import { AUTH_LOGIN_ROUTER } from '@/commons'
import { useAuthChangePasswordAfter90DaysModal } from '@/composables/auth/useAuthChangePasswordAfter90DaysModal'
import { useAuthResetPasswordBase } from '@/composables/auth/useAuthResetPasswordBase'
import { useLoading } from '@/composables/common/useLoading'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { authApi } from '@/services/api/auth/AuthApi'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useBuildLink } from '../common/useBuildLink'

export const useAuthChangePasswordAfter90Days = () => {
  const router = useRouter()
  const { processLink } = useBuildLink()
  const { t } = useI18n()
  const { openModal: openNotification, closeModalByPop } = useModalNotification()
  const { closeModal: closeModalChangePassword } = useAuthChangePasswordAfter90DaysModal()
  const { setLoading } = useLoading()

  const { values, errors, setFieldValue, handleSubmit, resetPasswordConfirmBtnStatusComputed } = useAuthResetPasswordBase()

  const handleChangePassword = handleSubmit((values) => {
    setLoading?.(true)
    authApi
      .changePassword({
        password: values.password
      })
      .then(() => {
        openNotification?.({
          content: t('auth.changePassword.submitSuccess'),
          onAccept: () => {
            closeModalChangePassword?.()
            closeModalByPop?.()
            router.push(processLink(AUTH_LOGIN_ROUTER))
          }
        })
      })
      .catch(() => {
        openNotification?.({ content: t('auth.changePassword.submitFail') })
      })
      .finally(() => setLoading?.(false))
  })

  const onSkip = async () => {
    setLoading?.(true)
    authApi.skipChangePassword().finally(() => {
      closeModalChangePassword?.()
      setLoading?.(false)
    })
  }

  const onClose = () => {
    closeModalChangePassword?.()
  }

  return { values, errors, setFieldValue, resetPasswordConfirmBtnStatusComputed, handleChangePassword, onSkip, onClose }
}
