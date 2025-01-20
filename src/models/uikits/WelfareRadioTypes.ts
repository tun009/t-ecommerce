import { RadioButtonProps } from 'primevue/radiobutton'

export interface WelfareRadioProps extends Omit<RadioButtonProps, 'aria-labelledby' | 'aria-label'> {
  label?: string
  ariaLabelledby?: string
  ariaLabel?: string
  gapRadio?: number
}

export interface WelfareRadioGroupProps extends WelfareRadioProps {
  gap?: any
  options?: WelfareRadioProps[]
}

export type WelfareRadioEmits = {
  (e: 'update:modelValue', value: any): void
  (e: 'click', event: Event): void
  (e: 'change', event: Event): void
}
