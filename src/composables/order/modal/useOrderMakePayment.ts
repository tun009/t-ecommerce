import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { OrderMakePaymentModalEmits, OrderMakePaymentModalProps } from '@/models/views/order/modal/OrderMakePaymentModel'

export const useOrderMakePayment = (props: OrderMakePaymentModalProps, emits: OrderMakePaymentModalEmits) => {
  const { openModal } = useModalNotification()

  const checked = ref(false)

  const { t } = useI18n()

  const onClickButton = () => {
    if (props.agreePaymentCheckbox) {
      emits('accept')
    } else {
      openModal?.({ content: t('order.modal.mustAgree') })
    }
  }

  return { checked, onClickButton }
}
