export interface WelfareButtonProps {
  text?: string
  active?: boolean
  class?: any
  disabled?: boolean
  typeAction?: 'submit' | 'reset' | 'button'
}

export interface WelfareButtonTapProps extends WelfareButtonProps {
  type?: 'tapSquare' | 'tapRound' | 'tapCircle' | 'tapCircleArrow'
}

export type WelfareButtonEmits = (e: 'click', event: MouseEvent) => void

export interface WelfareButtonLineProps extends WelfareButtonProps {
  type?: 'sm' | 'md' | 'lg'
  smSate?: boolean
  mdState?: 'default' | 'point' | 'line'
  lgState?: 'grey-line' | 'black-line' | 'default'
}

export interface WelfareButtonFullProps extends WelfareButtonProps {
  isRotate?: boolean
}

export interface WelfareButtonSimpleProps extends WelfareButtonProps {}

export interface WelfareButtonHeartProps extends WelfareButtonProps {
  isActive: boolean
  type?: 'sm' | 'lg'
  size?: number
}

export type WelfareButtonHeartEmits = (e: 'update:isActive', value: boolean) => void
