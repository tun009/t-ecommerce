import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import {
  orderProductOptionsSelectBoxCompanyCashReceipt,
  orderProductOptionsSelectBoxPersonCashReceipt
} from '@/models/views/order/OrderProductPageModel'
import { ComputedRef, ref } from 'vue'
import { useModalNotification } from '../widgets/modal/useModalNotification'

export const useOrderCashMoney = (isShow: ComputedRef<boolean>) => {
  const isUseApplyCash = ref(true)
  const personalApplyCash = ref(true)
  const { openModal, closeModalByPop } = useModalNotification()

  const incomePersonal = ref<WelfareSelectDataModel>(orderProductOptionsSelectBoxPersonCashReceipt[0])

  const incomeCompany = ref<WelfareSelectDataModel>(orderProductOptionsSelectBoxCompanyCashReceipt[0])

  const infoPersonal = ref<{
    prefix: string | undefined
    phone: string
    numberBankPerson: string[]
  }>({
    prefix: undefined,
    phone: '',
    numberBankPerson: ['', '', '', '']
  })

  const infoCompany = ref({
    numberBank: ['', '', ''],
    numberCompany: ['', '', '', '']
  })

  const showModalValidate = (message = '현금영수증 발행 관련 정보를 입력해주세요.') => {
    openModal?.({
      content: message,
      onAccept() {
        closeModalByPop?.()
      }
    })
  }

  const validateCashMoney = () => {
    if (isShow.value && isUseApplyCash.value) {
      if (personalApplyCash.value) {
        if (incomePersonal.value.value) {
          if (!infoPersonal.value.phone.trim() || !infoPersonal.value?.prefix) {
            showModalValidate()
            return false
          }
        } else {
          const isEmpty = infoPersonal.value.numberBankPerson.some((item) => !item.trim())
          if (isEmpty) {
            showModalValidate('현금영수증 카드번호를 정확히 입력해 주세요.')
            return false
          }
        }
      } else if (incomeCompany.value.value) {
        const isEmptyNumberCompany = infoCompany.value.numberCompany.some((item) => !item.trim())
        if (isEmptyNumberCompany) {
          showModalValidate('사업자 등록번호를 정확히 입력해 주세요.')
          return false
        }
      } else {
        const isEmpty = infoCompany.value.numberBank.some((item) => !item.trim())
        if (isEmpty) {
          showModalValidate('현금영수증 카드번호를 정확히 입력해 주세요.')
          return false
        }
      }
    }
    return true
  }

  return {
    isUseApplyCash,
    personalApplyCash,
    incomePersonal,
    incomeCompany,
    infoPersonal,
    infoCompany,
    validateCashMoney
  }
}
