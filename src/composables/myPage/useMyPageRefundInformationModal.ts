import { onBeforeMount, ref } from 'vue'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { orderApi } from '@/services/api/order/OrderApi'

export const useMyPageRefundInformationModal = (orderKey: number) => {
  const optionsSelectCard = [
    'KB국민카드',
    '신한카드',
    '롯데카드',
    'BC카드',
    '현대카드',
    '삼성카드',
    'NH카드',
    '하나카드',
    '우리BC카드',
    '우리카드',
    '씨티카드',
    '광주카드'
  ]
  const optionsSelectInstallmentTerm = [
    '일시불',
    '02개월(무이자)',
    '03개월(무이자)',
    '04개월',
    '05개월',
    '06개월',
    '07개월',
    '08개월',
    '09개월',
    '10개월',
    '11개월',
    '12개월'
  ]
  const totalPrice = ref(99999999)
  const selectedCard = ref()
  const selectedInstallmentTerm = ref(optionsSelectInstallmentTerm[0])
  const checkboxOne = ref(false)
  const { openModal: openModalNotification } = useModalNotification()
  const handleValidate = (selectedCard: string, selectedInstallmentTerm: string) => {
    if (!selectedCard) {
      openModalNotification?.({
        content: '카드사를 선택해 주세요.'
      })
      return
    }
    if (!selectedInstallmentTerm) {
      openModalNotification?.({
        content: '할부기간을 선택해 주세요.'
      })
    }
  }

  // Do not need merge api with page now
  // onBeforeMount(() => {
  //   orderApi
  //     .getTotalPriceRefund(orderKey)
  //     .then((res) => {
  //       totalPrice.value = res.data.lastPaymentAmount
  //     })
  //     .catch(() => {
  //       //handle error here
  //     })
  // })

  return { totalPrice, optionsSelectCard, optionsSelectInstallmentTerm, selectedCard, selectedInstallmentTerm, checkboxOne, handleValidate }
}
