import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export enum MyPageClaimDetailReason {
  HEART_CHANGE = 'HRTCH',
  DESIGN_COLOR_DISSATISFACTION = 'DCDSF',
  PRICE_PROMOTION_COMPARISON = 'PPCMP',
  DELIVERY_MISTAKE_CHANGE = 'DLMCH',
  SOLD_OUT_PRODUCT = 'SOLDT',
  DELIVERY_DELAY = 'DLVDY',
  DEFECTIVE_PRODUCT = 'DEFPR',
  PRODUCT_DAMAGE_OMISSION_WRONG_DELIVERY = 'PDDOW',
  INCORRECT_PRODUCT_INFO = 'INCPI',
  ISSUE_DELAY_EXPECTED = 'ISDDE',
  ETC = 'ETC',
  ISSUE_DELAY = 'ISSUDY'
}

interface MyPageOrderProductPaymentResponse {
  totalProductAmount?: number
  immediatelyDiscountAmount: number
  couponDiscountAmount: number
  rewardPaymentAmount?: number
  welfarePointPaymentAmount: number
  pgPaymentAmount: number
  creditCardPaymentAmount: number
  tossPayPaymentAmount: number
  megazonePayPaymentAmount?: number
  naverPayPaymentAmount?: number
  kakaoPayPaymentAmount?: number
  accountTransferPaymentAmount: number
  etcPaymentAmount?: number
  productAmount?: number
  lastProductAmount?: number
  lastPaymentAmount: number
}

export interface MyPageOrderEntryResponse {
  receiverProductOrderKey?: number
  orderDeliveryProductKey: number
  receiverName: string
  receiverPhoneNumber: string
  streetAddress: string
  lotAddress: string
  detailAddress: string
  productKey: number
  productName?: string
  optionKey: number
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  quantity: number
  ticketCouponNumber?: string
  ticketImageUrl?: string
  orderProcessStatus: string
  claimProcessStatus: string
  finalOrderStatus: string
  issueDate?: string
  expireDate?: string
  ticketUseStatus?: string
  sellerProductCode?: string
  orderProductPaymentResponse: MyPageOrderProductPaymentResponse
  productOptions?: string
  pricePromotion?: string | number
  productImage?: any
}

export interface MyPageOrderCancelProductOption {
  productOptions?: string
  orderDeliveryProductKey: number
  productName?: string
  pricePromotion?: number
  productImage?: string
  quantity?: number
  receiverProductOrderKey?: string | number
}

interface MyPageOrderCancelProductResponse {
  orderProductKey: number
  productKey: number
  optionKey: number
  orderProductPaymentResponse: MyPageOrderProductPaymentResponse
  orderEntryResponses: MyPageOrderEntryResponse[]
  productResponse: MyPageOrderCancelProduct
}

interface MyPageOrderCancelProduct {
  productKey: number
  productName: string
  sellerProductCode?: string
  productClassification: string
  attachfilePathName: string
  attachfileName: string
  productPrice: number
  sellerKey: number
  subcontractKey?: number
  minimumPurchaseQuantityYn: string
  minimumPurchaseQuantity?: number
  maximumPurchaseQuantityYn: string
  maximumPurchaseQuantity?: number
  lastProductStatsCode: string
  sellerDeliveryFeeKey: number
  returnSellerDeliveryFeeKey: number
  exchangeSellerDeliveryFeeKey: number
  shippingPointCombinedDeliveryPossibleYn?: string
  adultCertificationProductYn?: string
  immediatelyDiscountResponse?: string
  productOptionResponses?: string
}

export interface MyPageOrderCancelModel {
  orderKey: number
  originalOrderKey?: number
  productAmount?: number
  lastPaymentAmount: number
  welfarePointPaymentAmount: number
  creditCartPaymentAmount: number
  transferPaymentAmount: number
  megazonePaymentAmount: number
  naverPaymentAmount: number
  kakaoPaymentAmount: number
  tossPaymentAmount: number
  productClassification: string
  senderName: string
  senderPhone: string
  orderCancelProductResponses: MyPageOrderCancelProductResponse[]
}

export interface MyPageTicketClaimReceiver {
  receiverProductOrderKey: number | string
  cancelReasonCode?: string
  cancelMemo?: string
}

export interface MyPageOrderCancelModelForm {
  orderKey: number | string
  cancelFee: number
  ticketClaimReceivers: MyPageTicketClaimReceiver[]
  deliveryClaims?: string
}

export interface OrderCancelModelResponse extends BaseModelResponse<MyPageOrderCancelModel> {}
