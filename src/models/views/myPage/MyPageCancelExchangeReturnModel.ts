import { MyPageOrderPaymentModel, MyPageOrderProductPaymentModel } from './MyPageMainMemberModel'

export interface MyPageCancelExchangeReturnModel {
  orderKey: number
  createdDatetime: string
  orderProductResponses: MyPageOrderProductResponse[]
  orderPaymentResponse: MyPageOrderPaymentModel
  orderRefundResponse: MyPageOrderRefundResponse
  senderMessage: string,
  ordererName: string
}

export interface MyPageOrderProductResponse {
  productOrderKey: number
  productKey: number
  optionKey: number
  orderSequence: string
  productName: string
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  productTypeTargetDatetime: string
  orderQuantity: number
  orderChannel: number
  productUseYn: string
  attachfilePathName: string
  attachfileName: string
  orderProductPaymentResponse: MyPageOrderProductPaymentModel
  orderProductRefundResponse: MyPageOrderProductRefundResponse
  orderDeliveryResponses: MyPageOrderDeliveryResponse[]
  
}

export interface MyPageOrderProductRefundResponse {
  orderTotalRefundAmount: number
  orderProductRefundAmount: number
  orderProductRefundDeliveryAmount: number
  orderRefundCouponDiscountAmount: number
  orderRefundWelfarePoint: number
  creditCardRefundAmount: number
  accountTransferRefundAmount: number
  tossPayRefundAmount: number
  etcRefundAmount: number
  megazonePayRefundAmount: number
  naverPayRefundAmount: number
  kakaoPayRefundAmount: number
}

export interface MyPageOrderDeliveryResponse {
  receiverProductOrderKey: number
  receiverName: string
  receiverPhoneNumber: string
  productName: string
  productPrice: number
  quantity: number
  ticketCouponNumber: string
  ticketImageUrl: string
  orderProcessStatus: string
  claimProcessStatus: string
  ticketOrderStatus: string
  issueDate: string
  expireDate: string
}

export interface MyPageOrderRefundResponse {
  refundAmount: number
  refundDeliveryAmount: number
  restoreWelfarePoint: number
  cancellationFee: number
  pgCancellationAmount: number
}
