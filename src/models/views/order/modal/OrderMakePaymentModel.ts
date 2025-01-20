export interface OrderMakePaymentModalProps {
  total: number
  agreePaymentCheckbox?: boolean
}

export interface OrderMakePaymentModalEmits {
  (e: 'cancel'): void
  (e: 'accept'): void
  (e: 'update:agreePaymentCheckbox', value: boolean): void
}
