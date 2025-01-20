import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { ProductModel, ProductVoucher } from '@/models/uikits/WelfareUnitCardTypes'
import {
  OrderBankPaymentModel,
  OrderBillCompleteModel,
  OrderCouponCompletedModel,
  OrderProductBaseInfoModel,
  OrderProductModel,
  OrderProductTicket,
  OrderPromotionCouponsModel
} from '@/models/views/order/OrderProductPageModel'
import { BaseModelResponse } from '../BaseModelResponse'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'

export interface OrderProductCustomerCartResponse {
  data: ProductModel[]
}

export interface OrderProductCouponsResponse {
  data: ProductModel
}

export interface OptionInstallmentMonthResponse {
  data: WelfareSelectDataModel[]
}

export interface BanksListResponse {
  data: OrderBankPaymentModel[]
}

export interface OptionTypeDeliveryAddressResponse {
  data: WelfareSelectDataModel[]
}

export interface OptionCodePhoneListsResponse {
  data: WelfareSelectDataModel[]
}

export interface OptionProductVoucherResponse {
  data: ProductVoucher
}

export interface RelateProductResponse extends BaseModelResponse<WelfareUnitProductModel[]> {}

export interface OrderBillResponse extends BaseModelResponse<OrderBillCompleteModel> {}

export interface OrderCouponResponse extends BaseModelResponse<OrderCouponCompletedModel> {}

export interface OrderProductBaseInfoResponse extends BaseModelResponse<OrderProductBaseInfoModel> {}
export interface OrderProductTicketResponse extends BaseModelResponse<OrderProductTicket> {}

export interface OrderProductCouponResponse {
  couponKey: number
  couponName: string
  benefitValue: number
  couponType: string
  couponBenefitType: string
  maxDiscountAmount: number
  minOrderAmount: number
  validToDate: string
  downloaded: boolean
}
export interface OrderProductCouponDiscountResponse {
  couponKey: number
  couponName: string
  couponType: string
  downloaded: boolean
  benefit: {
    benefitType: string
    maxDiscountAmount: number
    benefitSettingValue: number
  }
  validPeriod: {
    validPeriodType: string
    afterIssueValidDay: string
    validFromDate: string
    validToDate: string
  }
}
export interface OrderProductResponse extends BaseModelResponse<OrderProductModel> {}
export interface OrderProductCouponResponse extends BaseModelResponse<OrderPromotionCouponsModel[]> {}

export interface OrderPaymentCompleteResponse extends BaseModelResponse<OrderPaymentCompleteModel> {}

export interface OrderPostPaymentResponse
  extends BaseModelResponse<{ orderKey: number; orderPaymentResponse: { lastPaymentAmount: number; pgPaymentAmount: number } }> {}

export interface OrderPaymentCompleteModel {
  orderKey: number
  createdDatetime: string
  myPageOrderEntryResponses: OrderEntryResponse[]
  orderPaymentResponse: OrderPaymentResponse
  senderMessage: string
  ordererName: string
  orderChannel: string
  cartKey: number
  cartProductKeys: any[] //Unknown type
}

export interface OrderPaymentCouponCompleteResponse extends BaseModelResponse<OrderPaymentCouponCompleteModel> {}

export interface OrderPaymentCouponCompleteModel {
  orderKey: number
  createdDatetime: string
  orderChannel: string
  productClassification: string
  myPageOrderEntryResponses: OrderEntryResponse[]
  orderPaymentResponse: OrderPaymentResponse
  orderRefundResponse: any
  senderMessage: string
  ordererName: string
  quantity: number
  refundQuantity: number | null
}

export interface OrderPaymentResponse {
  orderAmount: number
  orderDeliveryAmount: number
  deliveryDiscountAmount: number
  totalProductAmount: number
  immediatelyDiscountAmount: number
  couponDiscountAmount: number
  lastOrderAmount: number
  lastPaymentAmount: number
  welfarePointPaymentAmount: number
  pgPaymentAmount: number
  creditCardPaymentAmount: number
  tossPayPaymentAmount: number
  megazonePayPaymentAmount: number
  naverPayPaymentAmount: number
  kakaoPayPaymentAmount: number
  accountTransferPaymentAmount: number
  etcPaymentAmount: number
  installment: number
  cardName?: string
}

export interface OrderEntryResponse {
  deliveryOrderResponse?: OrderDeliveryResponse | null
  ticketOrderReceiverResponse?: OrderTicketOrderReceiverResponse | null
}

interface OrderTicketOrderReceiverResponse {
  receiverProductOrderKey: number
  receiverName: string
  receiverPhoneNumber: string
  ticketCouponNumber: string | null
  ticketImageUrl: string | null
  orderProcessStatus: string
  claimProcessStatus: string
  finalOrderStatus: string
  ticketUseStatus: string
  issueDate: string | null
  expireDate: string | null
  usedDate: string | null
  issueDelayReason: string | null
  issueDelayMemoContents: string | null
  expectedAccumulationAmount: number | null
  receiverProductResponse: OrderReceiverProductResponse
}

interface OrderDeliveryResponse {
  orderDeliveryKey: number
  deliveryResponse: {
    deliveryAddressCode: string
    receiverName: string
    deliveryZipCode: string
    deliveryStreetAddress: string
    deliveryLotAddress: string
    deliveryDetailAddress: string
    deliveryCellPhone: string
    deliveryTelephone: string
    deliveryRequestType: string
    deliveryRequestContent: string
  }
  warehouseResponse: OrderWareHouseResponse
  invoiceNumber: string
  deliveryRequiredDays: number
  lastOrderDeliveryStatus: string
  orderProcessStatus: string
  claimProcessStatus: string
  finalOrderStatus: string
  productPreparationInstructionDate: string
  deliveryRequestDate: string
  invoiceRegistrationDate: string
  deliveryCompletionDate: string
  lastDeliveryCompletionDate: string
  deliveryFeeAmount: number
  deliveryFeeDiscountAmount: number
  deliveryFeePaymentAmount: number
  deliveryFeeMemberCouponKey: number
  deliveryProductResponses: OrderDeliveryProduct[]
}

interface OrderWareHouseResponse {
  name: string
  zipCode: string
  streetAddress: string
  lotAddress: string
  detailAddress: string
  telephone1: string
  telephone2: string
  combinedDeliveryPossible: string
  deliveryGuideContents: string
  deliveryFeeKindCode: string
  freeDeliveryPossibleBuyAmount: string
  baseDeliveryFee: string
  islandMountainDeliveryFee: any
  jejuDeliveryFee: any
}

interface OrderProductOptionResponse {
  optionKey: number
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  optionPrice: number | null
  productQuantity: number
}

interface OrderDeliveryOrderProductResponse {
  productKey: number
  productName: string
  sellerProductCode: string | null
  productClassification: string | null
  attachfilePathName: string | null
  attachfileName: string | null
  productPrice: number
  sellerKey: number | null
  subcontractKey: number | null
  minimumPurchaseQuantityYn: string | null
  minimumPurchaseQuantity: number | null
  maximumPurchaseQuantityYn: string | null
  maximumPurchaseQuantity: number | null
  lastProductStatsCode: string | null
  sellerDeliveryFeeKey: number | null
  shippingPointCombinedDeliveryPossibleYn: string | null
  immediatelyDiscountResponse: string | null
  productOptionResponses: OrderProductOptionResponse[] | null
  saleStatus?: ProductDetailSaleStatus
}

interface OrderProductPayment {
  rewardPaymentAmount: number | null
  totalProductAmount: number
  immediatelyDiscountAmount: number
  couponDiscountAmount: number
  welfarePointPaymentAmount: number
  pgPaymentAmount: number
  creditCardPaymentAmount: number
  accountTransferPaymentAmount: number
  tossPayPaymentAmount: number
  megazonePayPaymentAmount: number
  naverPayPaymentAmount: number
  kakaoPayPaymentAmount: number
  etcPaymentAmount: number
  productAmount: number
  orderDeliveryAmount?: number
  lastProductAmount: number
  lastPaymentAmount: number
}
interface OrderDeliveryProduct {
  orderDeliveryProductKey: number
  productKey: number
  optionKey: number
  productResponse: OrderDeliveryOrderProductResponse
  productTypeTargetDatetime: string | null
  orderQuantity: number | null
  refundQuantity: number | null
  rewardPointResponse: string | null
  expectedAccumulationAmount: number | null
  productUseYn: string | null
  orderProductPaymentResponse: OrderProductPayment
  orderProductRefundResponse: string | null
}

interface OrderReceiverProductResponse {
  productOrderKey: number | null
  productResponse: OrderDeliveryOrderProductResponse
  orderQuantity: number | null
  expectedAccumulationAmount: number | null
  productUseYn: string | null
  orderProductPaymentResponse: OrderProductPayment
  orderProductRefundResponse: OrderProductRefundResponse
}

interface OrderProductRefundResponse {
  orderTotalRefundAmount: number
  orderProductRefundAmount: number
  orderRefundCouponDiscountAmount: number
  refundRewardPaymentAmount: number | null
  orderRefundWelfarePoint: number
  creditCardRefundAmount: number
  accountTransferRefundAmount: number
  tossPayRefundAmount: number
  etcRefundAmount: number
  megazonePayRefundAmount: number
  naverPayRefundAmount: number
  kakaoPayRefundAmount: number
  refundQuantity: number | null
}

export const orderPaymentMethodData = {
  creditCardPaymentAmount: '신용카드',
  lpayPaymentAmount: '토스페이',
  samsungpayPaymentAmount: '삼성페이',
  naverpayPaymentAmount: '네이버페이',
  kakaopayPaymentAmount: '카카오페이',
  applepayPaymentAmount: '애플페이'
}
