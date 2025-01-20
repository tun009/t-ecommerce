import { InputNumberInputEvent } from 'primevue/inputnumber'
import { Nullable } from 'primevue/ts-helpers'
import { InputHTMLAttributes } from 'vue'

export interface WelfareInputProps {
  searchIcon?: boolean
  passwordIcon?: boolean
  class?: string
  classWrap?: string
  classWrapInput?: string
  classWrapTitle?: string
  modelValue?: string
  title?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  maxLength?: number
  showMaxLength?: boolean
  errorText?: string
  autofocus?: boolean
  clearText?: boolean
  type?: string
  name?: string
  autocomplete?: 'off' | 'on' | 'new-password'
  onlyRequiredTitle?: boolean
  clearIcon?: boolean
}

export interface WelfareInputExpose {
  addEventListener: (event: string, listener: (event: Event) => void) => void
  removeEventListener: (event: string, listener: (event: Event) => void) => void
  setText: (text: string) => void
  setFocus: () => void
  setBlur: () => void
}

export interface WelfareInputEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'keyup', event: KeyboardEvent): void
  (e: 'keypress', event: KeyboardEvent): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'paste', event: ClipboardEvent): void
  (e: 'click-icon-search'): void
  (e: 'click-icon-clear'): void
  (e: 'click-input'): void
  (e: 'input', event: InputEvent): void
}

export interface WelfareBaseInputEmits {
  (e: 'update:modelValue', value: any): void

  (e: 'clickIconRight', event: Event): void

  (e: 'keypress', event: KeyboardEvent): void

  (e: 'keydown', event: KeyboardEvent): void

  (e: 'focus', event: Event): void
}

export interface WelfareInputNumberProps extends Omit<WelfareInputProps, 'modelValue'> {
  modelValue?: Nullable<number | undefined | null>
  inputId?: string
  useGrouping?: boolean
  class?: string
  inputClass?: string
  inputProps?: InputHTMLAttributes
  locale?: string
}
export interface WelfareInputNumberEmits extends WelfareBaseInputEmits {
  (e: 'input', event: InputNumberInputEvent): void
  (e: 'focusText', event: Event): void
}

export interface WelfareInputMaskProps extends WelfareInputProps {
  modelValue: string | undefined
  inputId?: string
  mask?: string
}

export interface WelfareTextareaProps extends WelfareInputProps {
  classMaxlength?: string
}
export interface WelfareTextareaEmits extends WelfareInputEmits {}

export interface WelfareInputMaxLengthValidationProps extends WelfareInputProps {
  hiddenWarning?: boolean
  messageWarning?: string
  isNumberInputType?: boolean
  notCountCharacterRegExp?: RegExp
  onValidateContent?: (content?: string, maxLength?: number) => boolean
}

export interface InputValidationMaxLengthProps extends WelfareTextareaProps {
  messageWarning?: string
  hiddenWarning?: boolean
  isNumberInputType?: boolean
  onValidateContent?: (content?: string) => boolean
}

export interface InputValidationMaxBytesProps extends WelfareTextareaProps {
  messageWarning?: string
  hiddenWarning?: boolean
  maxBytes?: number
  hiddenLablelRight?: boolean
  hiddenLablelTextBytes?: boolean
}

export interface WelfareInputMaxBytesValidationProps extends WelfareInputProps {
  hiddenWarning?: boolean
  messageWarning?: string
  maxBytes?: number
  hiddenLablelTextBytes?: boolean
}
