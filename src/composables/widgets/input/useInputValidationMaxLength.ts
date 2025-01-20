import { blurElement, isInteger } from '@/commons'
import { stringFormatNumber } from '@/commons/regex'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import {
  InputValidationMaxLengthProps,
  WelfareInputEmits,
  WelfareInputMaxLengthValidationProps,
  WelfareTextareaEmits
} from '@/models/uikits/WelfareInputTypes'
import { ref } from 'vue'

export const useInputValidationMaxLength = (
  props: InputValidationMaxLengthProps | WelfareInputMaxLengthValidationProps,
  emits: WelfareInputEmits | WelfareTextareaEmits
) => {
  const inputElement = ref()
  const { openModal, closeModalByPop } = useModalNotification()
  const currentText = ref('')

  const controlShowModal = (isShow: boolean, isInputNumber: boolean = false) => {
    if (isShow) {
      const maxLength = props.maxLength ?? 0
      openModal({
        content: isInputNumber ? '숫자만 입력 해주세요.' : props?.messageWarning ?? `한글 기준 ${maxLength}자 이내로 입력 해주세요.`,
        onAccept() {
          closeModalByPop?.()
        }
      })
    }
  }

  const validateContent = (
    input?: string
  ): {
    hasInvalid: boolean
    validContent: string
  } => {
    let result = ''
    let hasInvalid = false
    if (!input)
      return {
        hasInvalid,
        validContent: result
      }
    const maxLength = props.maxLength
    for (const element of input) {
      if (typeof props.onValidateContent === 'function') {
        if (props.onValidateContent?.(element) !== false) {
          result += element
        }
        if (props.onValidateContent?.(element) === false) {
          hasInvalid = true
        }
      } else {
        result += element
      }
      if (maxLength !== undefined && maxLength !== null && result.length >= maxLength) {
        hasInvalid = true
        break
      }
    }
    return {
      hasInvalid,
      validContent: result
    }
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace' && currentText.value.length > 0) {
      const target = event.target as HTMLInputElement
      const selectionStart = target?.selectionStart
      const selectionEnd = target?.selectionEnd

      if (selectionStart === selectionEnd) {
        currentText.value = currentText.value.slice(0, currentText.value.length - 1)
      } else if ((selectionStart || selectionStart === 0) && (selectionEnd || selectionEnd === 0)) {
        currentText.value = currentText.value.slice(0, selectionStart) + currentText.value.slice(selectionEnd, currentText.value.length)
      }
      target.value = currentText.value || ''
      emits('update:modelValue', currentText.value || '')
      emits('keydown', event)
    }
  }

  const onInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement
    // we block the IME korean/vietnamese input on windows fire when entering composed characters
    // when deleting in
    if (event.inputType === 'deleteContentBackward') {
      target.value = currentText.value
      emits('update:modelValue', currentText.value || '')
      emits('input', event)
      return
    }

    const value = target.value
    let numericValue = value.replace(stringFormatNumber, '')

    if (props.isNumberInputType) {
      const isMaxLengthExceeded = props.maxLength && numericValue.length > props.maxLength

      if (value && !isInteger(value)) {
        if (isMaxLengthExceeded) {
          numericValue = numericValue.substring(0, props.maxLength)
        }
        emits('update:modelValue', numericValue || '')
        target.value = numericValue || ''
        !props.hiddenWarning && blurElement()
        currentText.value = numericValue
        controlShowModal(!props.hiddenWarning, props.isNumberInputType)
        emits('input', event)
        return
      }

      if (value && isMaxLengthExceeded) {
        numericValue = numericValue.substring(0, props.maxLength)
        target.value = numericValue || ''
        currentText.value = numericValue
        !props.hiddenWarning && blurElement()
        controlShowModal(!props.hiddenWarning)
        emits('update:modelValue', numericValue || '')
        emits('input', event)
        return
      }
      numericValue = numericValue.substring(0, props.maxLength)
      target.value = numericValue || ''
      currentText.value = numericValue
      emits('update:modelValue', numericValue || '')
      emits('input', event)
    } else {
      const result = validateContent(value)
      controlShowModal(!props.hiddenWarning && result.hasInvalid)
      result.hasInvalid && !props.hiddenWarning && blurElement()
      emits('update:modelValue', result.validContent || '')
      target.value = result.validContent || ''
      currentText.value = result.validContent
    }
    emits('input', event)
  }

  return {
    inputElement,
    onInput,
    onKeyDown
  }
}
