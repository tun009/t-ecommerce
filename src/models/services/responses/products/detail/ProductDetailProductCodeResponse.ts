export interface ProductDetailInfoDescriptionModel {
  productKey: number
  productCode: string
  detailChannel: string
  detailChannelName: string
  pcDetailHtmlContents: string
  mobileDetailHtmlContents: string
}

export interface ProductDetailInformationNoticeModel {
  productCode: string
  productName: string
  foItemInfoAncmList: {
    productInfoProvisionItemContents: string
    productInfoProvisionContents: string
  }[]
}

export interface ProductDetailInformationReleaseModel {
  productKey: number
  productCode: string
  ticketType: string
  ticketTypeName: string
  deliveryFeePolicyTypeName: string
  exchangeReturnPeriodContents: string
  exchangeReturnContents: string
  exchangeReturnWarningContents: string
}
