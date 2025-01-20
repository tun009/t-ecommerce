import { ALERT_PROVIDE, limitAlert } from '@/commons'
import { AlertDataParam, WelfareAlertData, WelfareAlertMutation } from '@/models/uikits/WelfareAlertTypes'
import { inject, provide, reactive } from 'vue'

export const useAlertProvide = () => {
  const modalData = reactive<{ alerts: WelfareAlertData[] }>({
    alerts: []
  })

  const pushAlert = (params: WelfareAlertData) => {
    if (modalData.alerts.length >= limitAlert) {
      modalData.alerts.shift()
    }
    modalData.alerts.push(params)
  }

  const pushAlertSuccess = (params: AlertDataParam) => {
    pushAlert({
      type: 'success',
      message: params.message,
      onClose: params?.onClosed,
      id: Date.now() + Math.random() * 100 + ''
    })
  }

  const pushAlertError = (params: AlertDataParam) => {
    pushAlert({
      type: 'error',
      message: params.message,
      onClose: params?.onClosed,
      id: Date.now().toString()
    })
  }

  const pushAlertInformation = (params: AlertDataParam) => {
    pushAlert({
      type: 'information',
      message: params.message,
      onClose: params?.onClosed,
      id: Date.now().toString()
    })
  }

  const closeAlert = (id: string) => {
    modalData.alerts = modalData.alerts.filter((item) => item.id !== id)
  }

  provide(ALERT_PROVIDE, {
    pushAlertError,
    pushAlertInformation,
    pushAlertSuccess,
    closeAlert,
    pushAlert
  })

  return modalData
}

export function useAlert() {
  const mutationModal = inject<WelfareAlertMutation>(ALERT_PROVIDE)
  return { ...mutationModal }
}
