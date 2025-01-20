import { blurElement } from '@/commons'
import { ProductVoucher } from '@/models/uikits/WelfareUnitCardTypes'
import { myPageBankMemberWelfarePointsApi } from '@/services/api/myPage/MyPageBankMemberWelfarePointsApi'
import { ComputedRef, onMounted, ref, watch } from 'vue'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { computed } from 'vue'

export const useOrderVoucher = (totalPriceDiscount: ComputedRef<number>) => {
  const dataVoucher = ref<ProductVoucher>()
  const welPointInput = ref<number>()
  const pointInput = ref<number>()
  const savePointInput = ref<number>()

  const welfarePointCheckBox = ref(false)
  const pointCheckbox = ref(false)
  const savePointCheckbox = ref(false)
  const { openModal } = useModalNotification()

  onMounted(() => {
    myPageBankMemberWelfarePointsApi
      .getWelfarePoints()
      .then((data) => {
        const newData = {
          welPointInput: data.data.pointBalance
        }
        dataVoucher.value = newData
      })
      .catch(() => {})
  })

  watch(
    () => [welfarePointCheckBox.value, pointCheckbox.value, savePointCheckbox.value],
    ([newWelfare, newPoint, newSave]) => {
      if (newWelfare) {
        const pointBalance = dataVoucher?.value?.welPointInput ?? 0
        welPointInput.value = pointBalance > totalPriceDiscount.value ? totalPriceDiscount.value : pointBalance
      } else {
        welPointInput.value = undefined
      }

      // SPECT - OUT
      // if (newPoint) {
      //   pointInput.value = dataVoucher?.value?.pointInput ?? 0
      // }

      // if (newSave) {
      //   savePointInput.value = dataVoucher?.value?.savePointInput ?? 0
      // }
    }
  )

  const handleUpdateWelPointInput = (newValue: number) => {
    if (newValue > (dataVoucher.value?.welPointInput ?? 0)) {
      openModal?.({
        content: '혜택 금액보다 크지 않은 금액을 입력하세요.'
      })
      blurElement()
      return
    }

    if (newValue > totalPriceDiscount.value) {
      openModal?.({
        content: '혜택포인트는 주문금액보다 클 수 없습니다.'
      })
      blurElement()
      return
    }
    welPointInput.value = newValue
  }

  const totalPoint = computed(() => {
    return Number(welPointInput.value ?? 0) + Number(pointInput.value ?? 0) + Number(savePointInput.value ?? 0)
  })

  return {
    welPointInput,
    pointInput,
    savePointInput,
    welfarePointCheckBox,
    pointCheckbox,
    savePointCheckbox,
    dataVoucher,
    // isDisableWelfarePoint,
    handleUpdateWelPointInput,
    totalPoint
  }
}
