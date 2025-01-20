export type WelfareTooltipType = 'top' | 'bottom' | 'left' | 'right'

export type WelfareTooltipPositionType = 'center' | 'left' | 'right'

export interface WelfareTooltipProps {
  visible?: boolean
  text: string
  type?: WelfareTooltipType
  position?: WelfareTooltipPositionType
}
