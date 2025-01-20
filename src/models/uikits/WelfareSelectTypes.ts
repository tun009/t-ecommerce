import { DropdownProps } from 'primevue/dropdown'

export interface WelfareSelectProps extends Omit<DropdownProps, 'aria-label' | 'aria-labelledby'> {
  class?: string
}

export interface WelfareSelectDataModel {
  value: string | number | boolean
  label: string
}

export type WelfareSelectEmits = (e: 'update:modelValue', value: any) => void
