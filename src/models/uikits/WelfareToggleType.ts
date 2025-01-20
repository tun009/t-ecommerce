import { InputSwitchProps } from 'primevue/inputswitch'

export interface WelfareToggleProps extends Omit<InputSwitchProps, 'aria-label' | 'aria-labelledby'> {
  modelValue?: boolean
}

export type WelfareToggleEmits = (e: 'update:modelValue', value: boolean) => void
