export interface WelfareTagProps {
  text: string
  active?: boolean
  disabled?: boolean
  class?: string
}

export interface WelfareTagEmits {
  (e: 'click'): void
  (e: 'close'): void
}
