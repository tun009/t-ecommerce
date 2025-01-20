import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { VERIFY_TIME, formatSecondsToTime } from '@/commons'
import { AuthVerificationFormEmits, AuthVerificationFormProps } from '@/models/auth/AuthModel'
import { useModalNotification } from '../widgets/modal/useModalNotification'

export const useAuthVerificationForm = (props: AuthVerificationFormProps, emit: AuthVerificationFormEmits) => {
  const { t } = useI18n()
  const { openModal: openNotification } = useModalNotification()

  const time = ref<number>(0)
  const idTimer = ref()

  const handleResend = () => {
    emit('resend')
    timerStart()
  }

  const timerStart = () => {
    time.value = VERIFY_TIME
    clearInterval(idTimer.value)
    idTimer.value = setInterval(() => {
      --time.value
      if (time.value === 0) clearInterval(idTimer.value)
    }, 1000)
  }

  const handleSubmit = () => {
    if (!handleShowExpired()) {
      emit('submit')
    }
  }

  const handleShowExpired = () => {
    if (time.value <= 0 && !!idTimer.value) {
      openNotification({ content: t('auth.reset-password.verification-number-expired') })
    }
    return time.value <= 0
  }

  const timerComputed = computed(() => {
    handleShowExpired()
    return formatSecondsToTime(time.value)
  })
  return { timerComputed, timerStart, handleResend, handleSubmit }
}
