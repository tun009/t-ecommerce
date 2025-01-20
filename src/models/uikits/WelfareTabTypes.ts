export interface WelfareTabDataType {
  id: string
  label: string
}

export type WelfareTabType = 'box' | 'box-small' | 'line' | 'round' | 'text' | 'line-white'

export interface WelfareTabProps {
  type?: WelfareTabType
  name: string
  items: WelfareTabDataType[]
  default?: WelfareTabDataType
  class?: string
  classWrapSpace?: string
}

export interface WelfareTabEmits {
  (e: 'on-change', item: WelfareTabDataType): void
  (e: 'onMounted'): void
}
