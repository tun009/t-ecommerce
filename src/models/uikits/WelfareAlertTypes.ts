export interface WelfareAlertProps {
  type: 'success' | 'error' | 'information'
  message: any
  id?: string
}

export interface WelfareAlertViewProps {
  data: WelfareAlertProps
}

export type WelfareAlertEmits = (e: 'closed') => void

export interface WelfareAlertContainerProps {
  message: any
}

export interface WelfareAlertData extends WelfareAlertProps {
  onClose?: () => void
}
export interface AlertDataParam {
  message: any
  onClosed?: () => void
}

export interface WelfareAlertMutation {
  pushAlertError: (params: AlertDataParam) => void
  pushAlertInformation: (params: AlertDataParam) => void
  pushAlertSuccess: (params: AlertDataParam) => void
  closeAlert: (index: string) => void
  pushAlert: (data: WelfareAlertProps, onClose?: () => void) => void
}
