import { ref } from 'vue'

export const useOrderInputCardBank = (props: { value: string[] }, emits: (e: 'update:value', value: string[]) => void) => {
  const refInput = ref<HTMLInputElement[]>([])

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const target = event.target as HTMLInputElement

    if (event.key === 'Backspace' && !target.value.trim()) {
      refInput.value?.[index - 1]?.focus()
    }
  }

  const handleUpdateInput = (event: InputEvent, index: number) => {
    const newValue = props.value
    const target = event.target as HTMLInputElement
    const value = target.value
    newValue[index] = target.value
    emits('update:value', newValue)
    if (value.trim().length === 4 && event.inputType !== 'deleteContentBackward') {
      refInput.value?.[index + 1]?.focus()
    }
  }
  return {
    refInput,
    handleKeyDown,
    handleUpdateInput
    // handleInput
  }
}
