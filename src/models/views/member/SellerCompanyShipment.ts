export interface SellerCompanyShipmentBase {
  deliveryGuideContent: string
  periodInfo: string
  defaultDeliveryFee: number
  isolatedAreaDeliveryFee: number
  jejuDeliveryFee: number
}

export interface SellerCompanyShipmentDelivery extends SellerCompanyShipmentBase {
  freeAvailableAmount: number
  defaultDeliveryFee: number
  deliveryFeeType: SellerCompanyShipmentDeliveryStatus
}

export enum SellerCompanyShipmentDeliveryStatus {
  free = '01',
  pay = '02',
  conditional = '03'
}

export const sellerCompanyShipmentDeliveryStatusData = {
  [SellerCompanyShipmentDeliveryStatus.free]: '무료배송',
  [SellerCompanyShipmentDeliveryStatus.pay]: '배송비',
  [SellerCompanyShipmentDeliveryStatus.conditional]: '배송비'
}

export interface SellerCompanyShipmentModel {
  deliveryShipment: SellerCompanyShipmentDelivery
  returnShipment: SellerCompanyShipmentBase
  exchangeShipment: SellerCompanyShipmentBase
}

export interface SellerCompanyShipmentKeyModel {
  productKey?: number
  productCode?: string
  productIssueDeliveryFeeKey?: number
  productReturnDeliveryFeeKey?: number
  productExchangeDeliveryFeeKey?: number
}
