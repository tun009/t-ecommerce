import { specialCharactersRegex } from '@/commons'
import { WelfareInputProps } from '@/models/uikits/WelfareInputTypes'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useModalNotification } from '../modal/useModalNotification'

export const useInputValidationSpecialCharacter = (props: WelfareInputProps) => {
  const currentText = ref<string>(props.modelValue ?? '')
  const inputElement = ref()
  const { openModal: openNotification } = useModalNotification()
  watch(
    () => props.modelValue,
    (v) => {
      currentText.value = v ?? ''
    },
    { deep: true }
  )

  const controlShowModal = () => {
    openNotification({
      content: '입력하신 검색어에 특수문자가 들어있습니다. <br/>특수문자 제외해주세요.'
    })
    setTimeout(() => {
      ; (document.activeElement as HTMLInputElement).blur()
    }, 50)
  }

  const onKeyPress = (event: KeyboardEvent) => {
    const key = event.key
    if (key) {
      const isValid = specialCharactersRegex.test(key)
      if (isValid) {
        controlShowModal()
        event.preventDefault()
        return
      }
    }
  }

  const pasteListener = (event: Event) => {
    const clipboardEvent = event as ClipboardEvent
    const pasteContent = clipboardEvent?.clipboardData?.getData('text')
    if (pasteContent) {
      const isValid = specialCharactersRegex.test(pasteContent)
      if (isValid) {
        controlShowModal()
        event.preventDefault()
        return
      }
    }
  }

  onMounted(() => {
    inputElement.value?.addEventListener('paste', pasteListener)
  })

  onUnmounted(() => {
    inputElement.value?.removeEventListener('paste', pasteListener)
  })

  return {
    inputElement,
    currentText,
    onKeyPress,
    pasteListener
  }
}
