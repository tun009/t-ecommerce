import { AUTH_LOGIN_BY_ID_AVAILABLE_ROUTER } from '@/commons'
import { useRoute, useRouter } from 'vue-router'
import { useAuthVerifyAccount } from './useAuthVerifyAccount'
import { AuthLoginFindIdConfirmResponse } from '@/models/services/responses/auth/AuthLoginFindIdResponse'
import { onMounted } from 'vue'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { useI18n } from 'vue-i18n'
import { useBuildLink } from '../common/useBuildLink'

export const useAuthFindIdForm = () => {
  const { openModal: openNotification } = useModalNotification()
  const { t } = useI18n()
  const { processLink } = useBuildLink()
  const router = useRouter()
  const route = useRoute()
  const { verifyRef, viewStatus, values, setFieldValue, onConfirm, onVerify, onResend, csrfToken } = useAuthVerifyAccount({
    type: 'find-id',
    verifyCallback: (value) => handleVerifyCallback(value)
  })

  const handleVerifyCallback = (response: AuthLoginFindIdConfirmResponse) => {
    router.push(
      processLink(
        `${AUTH_LOGIN_BY_ID_AVAILABLE_ROUTER}?email=${response.memberId}&date=${response.registeredDate}&status=${response.dormancyYn}&name=${values.name}&phone=${values.phone}&csrfToken=${csrfToken.value}`
      )
    )
  }

  onMounted(() => {
    handleShowPopupPreview()
  })

  const handleShowPopupPreview = () => {
    const type = route.query.modal
    if (type === 'errorPhone') {
      openNotification?.({
        content: t('auth.findId.notification.errorPhone')
      })
    } else if (type === 'sendPhone') {
      openNotification?.({
        content: t('auth.findId.notification.sendPhone')
      })
    } else if (type === 'errorFindId') {
      openNotification?.({
        content: t('auth.findId.notification.errorFindId')
      })
    } else if (type === 'errorOtp') {
      openNotification?.({
        content: t('auth.findId.notification.errorOtp')
      })
    } else if (type === 'timeOut') {
      openNotification({ content: t('auth.reset-password.verification-number-expired') })
    }
  }

  return { verifyRef, viewStatus, values, setFieldValue, onConfirm, onVerify, onResend }
}
