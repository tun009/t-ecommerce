import { WelfareProductAmountEmits, WelfareProductAmountProps } from '@/models/common'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { ref, watch } from 'vue'

export const useProductAmountInput = (props: WelfareProductAmountProps, emits: WelfareProductAmountEmits) => {
  const { openModal } = useModalNotification()

  const quantity = ref(props.quantity ?? 0)
  const handleMinus = () => {
    if (quantity.value - 1 <= props.min - 1) {
      // openModal?.({
      //   content: `최소수량은 ${props.min}개 이상 입니다.`
      // })
      return
    }
    quantity.value = quantity.value - 1
    emits('update:quantity', quantity.value)
  }

  const handlePlus = () => {
    if (quantity.value + 1 >= props.max + 1) {
      openModal?.({
        content: `하루 최대주문 가능 수량은 ${props.max}개 입니다.`
      })
      return
    }
    quantity.value = quantity.value + 1
    emits('update:quantity', quantity.value)
  }

  const handleInputQuantity = (payload: Event) => {
    const target = payload.target as HTMLInputElement
    const valueInput = target.value
    if (!valueInput || +valueInput <= props.min - 1) {
      emits('update:quantity', props.min)
      target.value = props.min.toString()
      target.blur()
      console.log({ m: props.min })
      quantity.value = props.min
      openModal?.({
        content: `최소수량은 ${props.min}개 이상 입니다.`
      })
      return
    }

    if (+valueInput >= props.max + 1) {
      emits('update:quantity', props.max)
      target.blur()
      quantity.value = props.max
      target.value = props.max.toString()
      openModal?.({
        content: `하루 최대주문 가능 수량은 ${props.max}개 입니다.`
      })
      return
    }
    const value = +valueInput
    if (value) emits('update:quantity', value)
  }

  watch(() => props.quantity, (newQuantity) => {
    quantity.value = newQuantity ?? 0
  })

  return {
    handleInputQuantity,
    handleMinus,
    handlePlus,
    quantity
  }
}
