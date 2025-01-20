import { CheckboxProps } from 'primevue/checkbox'

export interface WelfareCheckboxProps extends Omit<CheckboxProps, 'aria-labelledby' | 'aria-label'> {
  label?: string
  ariaLabelledby?: string
  ariaLabel?: string
}

export interface WelfareCheckboxEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'click', event: MouseEvent): void
  (e: 'change', event: Event): void
}
