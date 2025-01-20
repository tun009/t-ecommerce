import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { OrderBankPaymentModel } from '@/models/views/order/OrderProductPageModel'
import { orderApi } from '@/services/api/order/OrderApi'
import { onBeforeMount, ref } from 'vue'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { PayMethod } from '@/models/common'
import { FO_BANK_PAYMENT, storage } from '@/commons'
// import { useStorage } from '../common/useStorage'

export const useOrderBank = () => {
  const method = JSON.parse(storage.get(FO_BANK_PAYMENT))
  const paymentMethodUseAgain = ref(method?.paymentMethodUseAgain)
  const switchMethodPaymentRadio = ref(false)
  const currentBank = ref<PayMethod | undefined>(method?.paymentMethodUseAgain ? method?.currentBank : undefined)
  const methodPaymentSelect = ref<WelfareSelectDataModel>()
  const installmentMonthSelect = ref()
  const optionsPaymentMethod = ref<WelfareSelectDataModel[]>([])
  const optionsInstallmentMonthSelect = ref<WelfareSelectDataModel[]>([])
  const { openModal, closeModalByPop } = useModalNotification()

  const dataBanks = ref<OrderBankPaymentModel[]>([])

  onBeforeMount(async () => {
    orderApi
      .getListBanks()
      .then((data) => {
        dataBanks.value = data.data
      })
      .catch(() => {})
    orderApi
      .getOptionPaymentMethod()
      .then((data) => {
        optionsPaymentMethod.value = data.data
      })
      .catch(() => {})
    orderApi
      .getOptionInstallmentMonth()
      .then((data) => {
        optionsInstallmentMonthSelect.value = data.data
        installmentMonthSelect.value = data.data?.[0]
      })
      .catch(() => {})
  })

  const openModalValidate = (message = '결제하실 카드사를 선택하시기 바랍니다.') => {
    openModal?.({
      content: message,
      onAccept: () => {
        closeModalByPop?.()
        moveBankBox()
      }
    })
  }

  const moveBankBox = () => {
    const bankBox = document.getElementById('wf-bank-order')
    if (bankBox) {
      bankBox.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  const validateBank = () => {
    if (!switchMethodPaymentRadio.value) {
      if (!currentBank.value) {
        openModalValidate('결제수단을 입력해주세요.')
        return false
      }
      if (currentBank.value === PayMethod.Card && !methodPaymentSelect.value?.value) {
        openModalValidate()
        return false
      }
    }

    return true
  }

  return {
    paymentMethodUseAgain,
    switchMethodPaymentRadio,
    currentBank,
    methodPaymentSelect,
    installmentMonthSelect,
    optionsPaymentMethod,
    optionsInstallmentMonthSelect,
    dataBanks,
    validateBank
  }
}
