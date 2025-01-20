export interface MyPageNotice {
  noticeKey: number
  titleName: string
  contents: string
  createdDate: string
  show: boolean
}

export interface MyPageCategory {
  faqFoType: MyPageFaqType
}

export interface MyPageFaqType {
  codes: Category[]
  groupCode: string
  groupName: string
}

export interface Category {
  code: string
  title: string
}

export interface Tab {
  id: string
  label: string
}

export interface MyPageFaqCategory {
  key: number
  question: string
  answer: string
  show: boolean
}

export interface MyPageInquiryMember {
  title: string
  contents: string
  orderKey: number
  productKey: number
  inquiryType: string
  inquiryState: string
  answerTitle: string
  answerContents: string
  answeredDate: string
  registeredDate: string
  show?: boolean
}

export interface MyPageInquiryProduct {
  itemInquiriesKey: number
  itemKey: number
  itemName: string
  downloadLink: string
  filename: string
  altName: string
  titleName: string
  originalFilename: string
  questionContents: string
  createdQuestionDate: string
  answerStatusCode: string
  answerTitleName: string
  answerContents: string
  answeredDate: string
  show?: boolean
}

export interface MyPageSearchInput {
  searchResultTag: string
}

export interface MyPageInquiryProductDetail {
  productCode: string
  productName: string
  productClassificationCode: string
  productClassificationName: string
  productOriginName: null
  salePrice: number
  deliveryFee: number
  productDiscountAmount: number
  productDiscountRate: number
  immediatelyProductDiscountAmount: number
  lastProductSalesStatusCode: string
  lastProductSalesStatusName: string
  productDetailHtmlContents: string
  optionUseYn: string
  optionType: string
  sclassOptionUseYn: string
  inventoryQuantity: number
  reviewPossibleYn: string
  inquiryPossibleYn: string
  foAttachFileList: FoAttachFileList[]
}

export interface FoAttachFileList {
  attachfileType: string
  imageRepresentativeYn: string
  attachfilePathName: string
  attachfileName: string
  attachfileOriginName: string
  attachfileAltName: string
}

export interface MyPageInquiryOrderNumber {
  orderKey: string
  createdDatetime: string
  orderChannel: null
  productClassification: string
  myPageOrderEntryResponses: MyPageOrderEntryResponses[]
  orderPaymentResponse: OrderPaymentResponse
  orderRefundResponse: null
  senderMessage: null
  ordererName: null
  quantity: number
  refundQuantity: null
}

export interface MyPageOrderEntryResponses {
  deliveryOrderResponse: DeliveryOrderResponse
  ticketOrderReceiverResponse: TicketOrderReceiverResponse
}

// 배송상품
export interface DeliveryOrderResponse {
  orderDeliveryKey: number
  deliveryResponse: DeliveryResponse
  warehouseResponse: warehouseResponse
  invoiceNumber: null
  deliveryRequiredDays: null
  lastOrderDeliveryStatus: null
  productPreparationInstructionDate: null
  deliveryRequestDate: null
  invoiceRegistrationDate: null
  deliveryCompletionDate: null
  lastDeliveryCompletionDate: null
  deliveryFeeAmount: null
  deliveryFeeDiscountAmount: null
  deliveryFeePaymentAmount: null
  deliveryFeeMemberCouponKey: null
  deliveryProductResponses: ReceiverOrderCodeResponse[]
  orderProcessStatus: string
  claimProcessStatus: string
  finalOrderStatus: string
}

interface ReceiverOrderCodeResponse {
  productKey: string
  orderDeliveryProductKey?: string 
  orderQuantity: number
  refundQuantity: number
  productResponse: DeliveryProductResponse
}

export interface DeliveryResponse {
  deliveryAddressCode: null
  deliveryZipCode: string
  deliveryStreetAddress: string
  deliveryLotAddress: string
  deliveryDetailAddress: string
  deliveryCellPhone: string
  deliveryTelephone: null
  deliveryRequestType: string
  deliveryRequestContent: null
  receiverName: string
}

interface DeliveryProductResponse {
  productName: string
  productPrice: number
  attachfilePathName: string
  attachfileName: string
  productOptionResponses: ProductOptionResponse[]
}

// 배송/티켓 공통사용
export interface ProductOptionResponse {
  optionKey: number
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  optionPrice: number
}

// 티켓상품
export interface TicketOrderReceiverResponse {
  receiverProductOrderKey: number
  receiverName: string
  receiverPhoneNumber: string
  ticketCouponNumber: string
  ticketImageUrl: string
  orderProcessStatus: string
  claimProcessStatus: string
  finalOrderStatus: string
  ticketUseStatus: null
  issueDate: null
  expireDate: null
  usedDate: null
  issueDelayReason: null
  issueDelayMemoContents: null
  expectedAccumulationAmount: number
  receiverProductResponse: ReceiverProductResponse
}

interface ReceiverProductResponse {
  productKey: string
  productOrderKey: string | number
  productResponse: TicketProductResponse
  orderQuantity: number
  expectedAccumulationAmount: null
  productUseYn: null
  orderProductPaymentResponse: orderProductPaymentResponse
  orderProductRefundResponse: orderProductRefundResponse
}

interface TicketProductResponse {
  productKey: number
  productName: string
  sellerProductCode: null
  productClassification: null
  attachfilePathName: null
  attachfileName: null
  productPrice: number
  sellerKey: null
  subcontractKey: null
  minimumPurchaseQuantityYn: null
  minimumPurchaseQuantity: null
  maximumPurchaseQuantityYn: null
  maximumPurchaseQuantity: null
  lastProductStatsCode: null
  sellerDeliveryFeeKey: null
  shippingPointCombinedDeliveryPossibleYn: null
  immediatelyDiscountResponse: null
  productOptionResponses: ProductOptionResponse
}

interface orderProductPaymentResponse {
  totalProductAmount: number
  immediatelyDiscountAmount: number
  couponDiscountAmount: number
  rewardPaymentAmount: null
  welfarePointPaymentAmount: number
  pgPaymentAmount: number
  creditCardPaymentAmount: number
  tossPayPaymentAmount: number
  megazonePayPaymentAmount: number
  naverPayPaymentAmount: number
  kakaoPayPaymentAmount: number
  accountTransferPaymentAmount: number
  etcPaymentAmount: number
  productAmount: number
  lastProductAmount: number
  lastPaymentAmount: number
  expectedAccumulationAmount: null
}

interface orderProductRefundResponse {
  orderTotalRefundAmount: number
  orderProductRefundAmount: number
  orderProductRefundDeliveryAmount: null
  orderRefundCouponDiscountAmount: number
  refundRewardPaymentAmount: number
  orderRefundWelfarePoint: number
  creditCardRefundAmount: number
  accountTransferRefundAmount: number
  tossPayRefundAmount: number
  etcRefundAmount: number
  megazonePayRefundAmount: number
  naverPayRefundAmount: number
  kakaoPayRefundAmount: number
  refundQuantity: number
}

export interface warehouseResponse {
  name: string
  zipCode: string
  streetAddress: string
  lotAddress: string
  detailAddress: string
  telephone1: string
  telephone2: null
  combinedDeliveryPossible: string
  deliveryGuideContents: null
  deliveryFeeKindCode: string
  freeDeliveryPossibleBuyAmount: null
  baseDeliveryFee: null
  islandMountainDeliveryFee: null
  jejuDeliveryFee: null
}

export interface OrderPaymentResponse {
  orderAmount: number
  orderDeliveryAmount: number
  deliveryDiscountAmount: number
  deliveryPaymentAmount: number
  totalProductAmount: number
  immediatelyDiscountAmount: number
  couponDiscountAmount: null
  lastOrderAmount: number
  lastPaymentAmount: number
  welfarePointPaymentAmount: number
  pgPaymentAmount: null
  creditCardPaymentAmount: number
  tossPayPaymentAmount: number
  megazonePayPaymentAmount: number
  naverPayPaymentAmount: number
  kakaoPayPaymentAmount: number
  accountTransferPaymentAmount: number
  etcPaymentAmount: number
  installment: number
}

export interface SearchProductCode {
  productName: string
  price: number
  pricePromotion: number
  thumbnailProduct: string
  percent?: number
  optionName?: string
  receiverName?: string //수신자명
  receiverPhoneNumber?: number //수신자명 휴대전화번호
  receiverAddress?: string // 주소명
  date?: string //날짜
  orderKey?: number //주문번호
  state?: string // 주문상태
  productCode?: number //상품번호
  receiverProductOrderKey?: number //티켓상품
  orderDeliveryKey?: number //배송상품
  immediatelyProductDiscountAmount?: number //할인금액
}

export interface WelfareProductCodeProps {
  title: string
  searchResult: any
}
export interface WelfareModalProductCodeProps {
  title: string
  searchValue: string
  productCode: MyPageInquiryProductDetail
}

export interface WelfareOrderNumberProps {
  title: string
  data: MyPageInquiryOrderNumber[]
}

export interface WelfareModalProductCodeContent {
  data: SearchProductCode
}
export interface WelfareFileUploadProps {
  target: string
}
export interface WelfareFileUploadData {
  file: File
  target: string
}
export interface uploadFileResponse {
  downloadLink: string
  filename: string
  originalFilename: string
  fileSize: number
}
