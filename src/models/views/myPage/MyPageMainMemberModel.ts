export interface MyPageDeliveryMyPageCountModel {
  cartQuantity: number | string
  paymentCompletedCount: number | string
  productPreparationCount: number | string
  inTransitCount: number | string
  deliveryCompletedCount: number | string
  couponCount: number | string
  reviewCount: number | string
}

export const myPageListButtonChooseMonthFilter = [
  {
    value: 1,
    label: '1개월'
  },
  {
    value: 3,
    label: '3개월'
  },
  {
    value: 6,
    label: '6개월'
  },
  {
    value: -1,
    label: '기간설정'
  }
]

export interface MyPageOutputCalenderChooseMonthModel {
  year: string
  month: string
}

export interface MyPageOrderCalendarMonthProps {
  year: string
  month: string
}

export interface MyPageOrderCalendarMonthEmits {
  (e: 'close'): void
  (e: 'save', data: MyPageOutputCalenderChooseMonthModel): void
}

export interface MyPageOrderChooseMonthFilterEmits {
  (e: 'close'): void
  (
    e: 'save',
    data: {
      fromDate: MyPageOutputCalenderChooseMonthModel
      toDate: MyPageOutputCalenderChooseMonthModel
      state: number
    }
  ): void
}

export enum MyPageStatusDeliveryOrder {
  PAYMENT_WAIT = "PAYWAT",
  PAYMENT_FAILED = "PAYFAL",
  PAYMENT_COMPLETE = "PAYCMP",
  ISSUE_FAIL = "ISSUFL",
  ISSUE_DELAY = "ISSUDY",
  ISSUE_COMPLETE = "ISSUCP",
  PRODUCT_PREPARATION_DELAY = "PRPRDY",
  PRODUCT_PREPARATION = "PRPRPR",
  DELIVERY_DELAY_NOTICE = "DELDNT",
  DELIVERY_DELAY = "DELADY",
  DELIVERY = "DELIVR",
  DELIVERY_COMPLETE = "DELACP",
  PURCHASE_COMPLETE = "PURCHP",
  NO_CLAIM = "NOCLAM",
  ORDER_CANCEL_FEE_STANDBY = "ORDCFS",
  ORDER_CANCEL = "ORDCAN",
  SALE_CANCEL = "SALCAN",
  ORDER_CANCEL_WITHDRAWAL = "ORDCWD",
  CANCEL_COMPLETE = "CANCPL",
  DISUSE_REQUEST = "DISURQ",
  DISUSE_FAIL = "DISUFL",
  DISUSE_COMPLETE = "DISUCP",
  REFUND_REQUEST = "REFDRQ",
  REFUND_FAIL = "REFDFL",
  REFUND_COMPLETE = "REFDCP",
  RETURN_REQUEST = "RTNREQ",
  RETURN_RECEIPT = "RTNREC",
  RETURN_PICKUP = "RTNPIC",
  RETURN_PRODUCT_PICKUP = "RTNPPU",
  RETURN_PRODUCT_PICKUP_COMPLETE = "RTNPPC",
  RETURN_COMPLETE = "RTNCPT",
  RETURN_WITHDRAWAL = "RTNWDL",
  EXCHANGE_REQUEST = "EXCREQ",
  EXCHANGE_RECEIPT = "EXCREC",
  EXCHANGE_PICKUP = "EXCPIC",
  EXCHANGE_PRODUCT_PICKUP = "EXCPPU",
  EXCHANGE_PRODUCT_PICKUP_COMPLETE = "EXCPPC",
  EXCHANGE_FINAL_APPROVAL = "EXCFAP",
  EXCHANGE_WITHDRAWAL = "EXCWDL",
  EXCHANGE_PRODUCT_PREPARATION_DELAY = "EXPPDY",
  EXCHANGE_PRODUCT_PREPARATION = "EXPPPR",
  EXCHANGE_DELIVERY_DELAY_NOTICE = "EXDLDN",
  EXCHANGE_DELIVERY_DELAY = "EXADLY",
  EXCHANGE_DELIVERY = "EXIVRY",
  EXCHANGE_DELIVERY_COMPLETE = "EXACPL"
}

export const myPageListMessageStatusDelivery = {
  [MyPageStatusDeliveryOrder.PAYMENT_WAIT]: "결제 대기",
  [MyPageStatusDeliveryOrder.PAYMENT_FAILED]: "결제 실패",
  [MyPageStatusDeliveryOrder.PAYMENT_COMPLETE]: "결제 완료",
  [MyPageStatusDeliveryOrder.ISSUE_FAIL]: "발급 실패",
  [MyPageStatusDeliveryOrder.ISSUE_DELAY]: "발급 지연",
  [MyPageStatusDeliveryOrder.ISSUE_COMPLETE]: "발급 완료",
  [MyPageStatusDeliveryOrder.PRODUCT_PREPARATION_DELAY]: "상품 준비 지시 지연",
  [MyPageStatusDeliveryOrder.PRODUCT_PREPARATION]: "상품 준비 중",
  [MyPageStatusDeliveryOrder.DELIVERY_DELAY_NOTICE]: "배송 지연 사전 안내",
  [MyPageStatusDeliveryOrder.DELIVERY_DELAY]: "배송 지연",
  [MyPageStatusDeliveryOrder.DELIVERY]: "배송 중",
  [MyPageStatusDeliveryOrder.DELIVERY_COMPLETE]: "배송 완료",
  [MyPageStatusDeliveryOrder.PURCHASE_COMPLETE]: "구매 확정",
  [MyPageStatusDeliveryOrder.NO_CLAIM]: "없음",
  [MyPageStatusDeliveryOrder.ORDER_CANCEL_FEE_STANDBY]: "수수료 입금대기",
  [MyPageStatusDeliveryOrder.ORDER_CANCEL]: "주문 취소 신청",
  [MyPageStatusDeliveryOrder.SALE_CANCEL]: "판매 취소 신청",
  [MyPageStatusDeliveryOrder.ORDER_CANCEL_WITHDRAWAL]: "주문 취소 철회",
  [MyPageStatusDeliveryOrder.CANCEL_COMPLETE]: "주문 취소 완료",
  [MyPageStatusDeliveryOrder.DISUSE_REQUEST]: "티켓 폐기 요청",
  [MyPageStatusDeliveryOrder.DISUSE_FAIL]: "티켓 폐기 실패",
  [MyPageStatusDeliveryOrder.DISUSE_COMPLETE]: "티켓 폐기 완료",
  [MyPageStatusDeliveryOrder.REFUND_REQUEST]: "환불 요청",
  [MyPageStatusDeliveryOrder.REFUND_FAIL]: "환불 실패",
  [MyPageStatusDeliveryOrder.REFUND_COMPLETE]: "환불 완료",
  [MyPageStatusDeliveryOrder.RETURN_REQUEST]: "반품 신청",
  [MyPageStatusDeliveryOrder.RETURN_RECEIPT]: "반품 접수",
  [MyPageStatusDeliveryOrder.RETURN_PICKUP]: "반품 수거중",
  [MyPageStatusDeliveryOrder.RETURN_PRODUCT_PICKUP]: "반품 상품 수거",
  [MyPageStatusDeliveryOrder.RETURN_PRODUCT_PICKUP_COMPLETE]: "반품 회수 완료",
  [MyPageStatusDeliveryOrder.RETURN_COMPLETE]: "반품 완료",
  [MyPageStatusDeliveryOrder.RETURN_WITHDRAWAL]: "반품 철회",
  [MyPageStatusDeliveryOrder.EXCHANGE_REQUEST]: "교환 신청",
  [MyPageStatusDeliveryOrder.EXCHANGE_RECEIPT]: "교환 접수",
  [MyPageStatusDeliveryOrder.EXCHANGE_PICKUP]: "교환 수거중",
  [MyPageStatusDeliveryOrder.EXCHANGE_PRODUCT_PICKUP]: "교환 상품 수거",
  [MyPageStatusDeliveryOrder.EXCHANGE_PRODUCT_PICKUP_COMPLETE]: "교환 회수 완료",
  [MyPageStatusDeliveryOrder.EXCHANGE_FINAL_APPROVAL]: "교환 최종 승인",
  [MyPageStatusDeliveryOrder.EXCHANGE_WITHDRAWAL]: "교환 철회",
  [MyPageStatusDeliveryOrder.EXCHANGE_PRODUCT_PREPARATION_DELAY]: "교환 상품 준비 지시 지연",
  [MyPageStatusDeliveryOrder.EXCHANGE_PRODUCT_PREPARATION]: "교환 상품 준비 중",
  [MyPageStatusDeliveryOrder.EXCHANGE_DELIVERY_DELAY_NOTICE]: "교환 배송 지연 사전 안내",
  [MyPageStatusDeliveryOrder.EXCHANGE_DELIVERY_DELAY]: "교환 배송 지연",
  [MyPageStatusDeliveryOrder.EXCHANGE_DELIVERY]: "교환 배송 중",
  [MyPageStatusDeliveryOrder.EXCHANGE_DELIVERY_COMPLETE]: "교환 배송 완료"
}

export interface MyPageOrderProductPaymentModel {
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
  orderDeliveryAmount: number
  lastProductAmount: number
  lastPaymentAmount: number
}

export interface MyPageOrderDeliveryProductModel {
  receiverProductOrderKey: number
  receiverName: string
  receiverPhoneNumber: string
  productName: string
  productPrice: number
  quantity: number
  ticketCouponNumber: number
  ticketImageUrl: string
  orderProcessStatus: MyPageStatusDeliveryOrder
  issueDate: string
  expireDate: string
}

export interface MyPageOrderPaymentModel {
  orderAmount: number
  orderDeliveryAmount: number
  totalProductAmount: number
  immediatelyDiscountAmount: number
  lastOrderAmount: number
  lastPaymentAmount: number
  welfarePointPaymentAmount: number
  creditCardPaymentAmount: number
  tossPayPaymentAmount: number
  megazonePayPaymentAmount: number
  naverPayPaymentAmount: number
  kakaoPayPaymentAmount: number
  accountTransferPaymentAmount: number
  etcPaymentAmount: number
  installment: number
  couponDiscountAmount: number
  lastProductAmount: number
}

export interface MyPageOrderProductModel {
  orderKey: number
  createdDatetime: string
  orderProductResponses: {
    orderProductPaymentResponse: MyPageOrderProductPaymentModel
    orderDeliveryResponses: MyPageOrderDeliveryProductModel[]
  }[]
  orderPaymentResponse: MyPageOrderPaymentModel
}
