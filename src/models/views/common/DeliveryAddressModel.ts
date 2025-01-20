import { YesNoEnum } from '@/models/common'

export enum DeliveryAddressCodeEnum {
  COMPANY = 'COMPANY',
  HOME = 'HOME',
  ETC = 'ETC'
}

interface DeliveryAddressBaseModel {
  basicJibun?: string
  basicRoad?: string
  detail?: string
  zipCode?: string
}

export interface DeliveryAddressModel {
  deliveryAddressKey?: number
  deliveryAddressCode?: DeliveryAddressCodeEnum
  deliveryAddressBaseYn?: YesNoEnum
  deliveryAddressName?: string
  deliveryTelNumber?: string
  deliveryCellphoneNumber?: string
  address?: DeliveryAddressBaseModel
}
