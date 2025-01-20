import { useCountDownTime } from '@/composables/common/useCountDownTime'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

export const useOrderCertificationCellMobile = () => {
  const { times, start, restart } = useCountDownTime(25000, 1000)
  const accountStore = useAccountStore()

  const { account } = storeToRefs(accountStore)
  const disabledResend = ref(true)

  const refInfoUser = ref({
    name: account.value?.memberName ?? '이름',
    phone: undefined,
    code: ''
  })

  const messageCode = ref<{
    message: string
    type: 'sended' | 'error' | undefined
  }>({
    message: '',
    type: undefined
  })

  const disabledSave = computed(() => {
    return !refInfoUser.value.code.trim()
  })

  const handleCheckCode = () => {
    messageCode.value = {
      type: 'error',
      message: 'error.numberCode'
    }
  }

  const handleSendCode = () => {
    if (disabledResend.value === true) {
      messageCode.value = {
        type: 'sended',
        message: 'message.numberCodeSended'
      }
      disabledResend.value = false
      start()
    }
  }

  const handleResendCode = () => {
    if (!disabledResend.value) {
      refInfoUser.value.code = ''
      messageCode.value = {
        type: 'sended',
        message: 'message.numberCodeSended'
      }
      restart()
    }
  }

  return {
    start,
    times,
    disabledSave,
    handleSendCode,
    handleResendCode,
    handleCheckCode,
    messageCode,
    disabledResend,
    refInfoUser
  }
}
