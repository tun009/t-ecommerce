import { PayMethod, YesNoEnum } from '@/models/common'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { ProductDetailSaleStatus } from '../products/ProductDetailReviewModel'
import { DeliveryAddressModel } from '../common/DeliveryAddressModel'

export interface OrderBankPaymentNoteModel {
  title: string
  list: (string | OrderBankPaymentNoteModel)[]
}

export interface OrderBankPaymentModel {
  name?: string
  value?: PayMethod
  image?: any
  notes?: OrderBankPaymentNoteModel
}

export type OrderProductStateAddress = 'default' | 'new' | 'list'

export interface OrderProductAddressModel {
  postcode: string
  address: string
  detailAddress: string
  extraAddress: string
}

export enum OrderDeliveryAddressCode {
  company = 'COMPANY',
  home = 'HOME',
  etc = 'ETC'
}

export enum OrderDeliveryAddressBasePrimary {
  yes = 'Y',
  no = 'N'
}

export interface OrderProductCustomerDeliveryAddressModel {
  address?: {
    basicJibun?: string
    basicRoad?: string
    detail?: string
    zipCode?: string
  }
  deliveryAddressKey?: number
  deliveryAddressCode?: OrderDeliveryAddressCode
  deliveryAddressBaseYn?: OrderDeliveryAddressBasePrimary
  deliveryAddressName?: string
  deliveryZipCode?: string
  deliveryLoadNameAddress?: string
  deliveryLoadLotBasedAddress?: string
  deliveryDetailedAddress?: string
  deliveryTelNumber?: string
  deliveryCellphoneNumber?: string
}

export type StateAddressDelivery = 'default' | 'new' | 'list'

export interface OrderCartProductModel {
  product?: ProductModel
  quantity: number
  refundQuantity?: number
  coupon?: number
  reason?: string
  options?: string
  products: {
    product: ProductModel
    coupon?: number
  }[]
  listCoupons?: OrderPromotionCouponsModel[]
  messageDelivery?: string
}

export interface OrderInfoPeopleSendProductModel {
  name: string
  phone: string
}

export interface OrderCartGroupDeliveryAddressModel {
  deliveryAddress: DeliveryAddressModel
  typeDelivery?: StateAddressDelivery
  messageAddressDelivery?: string
  messageTypeAddressDelivery?: OrderProductMessageAddressDeliveryEnum
  products: OrderCartProductModel[]
}

export interface OrderBillCompleteModel {
  product: OrderCartGroupDeliveryAddressModel[]
  infoPayment: OrderInfoPaymentModel[]
  priceInfo: OrderPriceInfoBillModel
}

export interface OrderCouponCompletedModel {
  products: OrderCartProductModel[]
  receivers: OrderReceiverModel[]
  infoPayment: OrderInfoPaymentModel[]
  priceInfo: OrderPriceInfoBillModel
}

export interface OrderInfoPaymentModel {
  method: string
  cardCompany: string
}

export interface OrderReceiverModel {
  nameTitle: string
  name: string
  phone: string
  describe: string
}

export interface OrderPriceInfoBillModel {
  totalPrice: number
  costDelivery: number
  priceVoucher: number
  priceSavePoint: number
  discounts?: {
    title: string
    value: number
  }[]
  usePointDiscounts?: {
    title: string
    value: number
  }[]
}

export const orderProductTextTypeAddressDeliveryOrder: any = {
  [OrderDeliveryAddressCode.home]: '자택',
  [OrderDeliveryAddressCode.company]: '직장',
  [OrderDeliveryAddressCode.etc]: '기타'
}

export const orderProductOptionRadioUseCashReceipt = [
  { label: '신청', value: true },
  { label: '미신청', value: false }
]

export enum CashReceiptIssueTargetTypeEnum {
  person = 'person',
  company = 'company'
}

export const orderProductOptionsSelectBoxPersonCashReceipt: WelfareSelectDataModel[] = [
  { label: '휴대폰번호', value: true },
  { label: '현금영수증 카드번호', value: false }
]

export const orderProductOptionsSelectBoxCompanyCashReceipt: WelfareSelectDataModel[] = [
  { label: '사업자등록번호', value: true },
  { label: '현금영수증 카드번호', value: false }
]

export const orderProductListDataCountAddressDelivery: WelfareSelectDataModel[] = [
  ...Array.from({ length: 99 }).map((item, index) => ({ label: `${index + 2}개`, value: index + 2 })),
  { label: '대량주문', value: 'max' }
]

export const orderProductListDataCountPeople: WelfareSelectDataModel[] = Array.from({ length: 19 }).map((item, index) => ({
  label: `${index + 2}명`,
  value: index + 2
}))

export const orderProductInitialAddressDelivery = {
  deliveryAddressCode: OrderDeliveryAddressCode.home,
  deliveryAddressBaseYn: OrderDeliveryAddressBasePrimary.no,
  address: {
    basicJibun: '',
    basicRoad: '',
    detail: '',
    zipCode: ''
  },
  deliveryAddressName: '',
  deliveryTelNumber: '',
  deliveryCellphoneNumber: '',
  deliveryAddressKey: 0
}

export const orderProductOptionsAdress = [
  '부재시 휴대폰으로 연락 바랍니다.',
  '부재시 경비실에 맡겨주세요.',
  '문 앞에 놓아주세요.',
  '택배함에 넣어주세요.',
  '직접입력'
]

export const orderProductListOptionTailEmail = ['naver.com', 'kr']

export enum OrderProductMessageAddressDeliveryEnum {
  call = 'CALL',
  guard = 'GUARD',
  door = 'DOOR',
  mail = 'MAILB',
  other = 'OTHER'
}

export const orderProductMessageAddressDeliveryOptions = [
  {
    label: '부재시 휴대폰으로 연락 바랍니다.',
    value: OrderProductMessageAddressDeliveryEnum.call
  },
  {
    label: '부재시 경비실에 맡겨주세요.',
    value: OrderProductMessageAddressDeliveryEnum.guard
  },
  {
    label: '문 앞에 놓아주세요.',
    value: OrderProductMessageAddressDeliveryEnum.door
  },
  {
    label: '택배함에 넣어주세요.',
    value: OrderProductMessageAddressDeliveryEnum.mail
  },
  {
    label: '직접입력',
    value: OrderProductMessageAddressDeliveryEnum.other
  }
]

export interface OrderProductBaseInfoModel {
  reviewStarPoint: number
  reviewCount: number
}

export interface OrderDeliveryItemDetailModel {
  productResponse: {
    productKey: number
    productName: string
    sellerProductCode: string
    productClassification: string
    attachfilePathName: string
    attachfileName: string
    productPrice: number
    sellerKey: number
    subcontractKey: number
    minimumPurchaseQuantityYn: YesNoEnum
    minimumPurchaseQuantity: number
    maximumPurchaseQuantityYn: YesNoEnum
    maximumPurchaseQuantity: number
    lastProductStatsCode: ProductDetailSaleStatus
    saleStatus: ProductDetailSaleStatus
    sellerDeliveryFeeKey: number
    shippingPointCombinedDeliveryPossibleYn: YesNoEnum
    immediatelyDiscountResponse: {
      amount: number
      promotionName: string
    }
    productOptionResponses?: {
      optionKey: number
      optionLargeName: string
      optionMediumName: string
      optionSmallName: string
      productQuantity: number
      optionPrice: number
      saleStatus: string
      productQuantity: number
    }[]
  }
  listCoupons?: OrderPromotionCouponsModel[]
  productQuantity: number
}

export interface OrderProductModel {
  orderDeliveryItemDetailResponses: OrderDeliveryItemDetailModel[]
  cartKey: number
  cartProductKeys: number[]
}

export interface PointInfoModel {
  rewardName: string
  validStartDate?: string
  validEndDate?: string
  benefitType: string
  maxSavingAmount: number
  benefitValue: number
  useMinOrderAmount: number
  rewardPointType?: string
  useMaxOrderAmount: number
  rewardPointAmount: number
}

export enum OrderCouponEnum {
  PRODUCT = 'PRD',
  CART = 'CRT',
  FREE_DELIVERY = 'FSP'
}

export enum OrderCouponBenefitEnum {
  FIX = 'FIX',
  PERCENT = 'PER'
}

export interface OrderPromotionCouponsModel {
  memberCouponKey: number
  couponName: string
  benefitValue: number
  couponType: OrderCouponEnum
  couponBenefitType: OrderCouponBenefitEnum
  maxDiscountAmount: number
  minOrderAmount: null
  validToDate: string
  remainingDays: number
  remainingHours: number
  remainingMinutes: number
  discountAmount: number
}

export interface OrderDeliveryProductRequestsModel {
  productKey?: number
  optionKey?: number | null
  memberCouponKey?: number | null
  orderQuantity?: number
}
export interface OrderDeliveryRequestsModel {
  orderDeliveryProductRequests: OrderDeliveryProductRequestsModel[]
  deliveryAddressCode?: string
  receiverName?: string
  deliveryZipCode?: string
  deliveryStreetAddress?: string
  deliveryLotAddress?: string
  deliveryDetailAddress?: string
  deliveryCellPhone?: string
  deliveryTelephone?: string
  deliveryRequestType?: string
  deliveryRequestContent?: string
}

export interface OrderPostDeliveryModel {
  orderDeliveryRequests?: OrderDeliveryRequestsModel[]
  orderPaymentRequest: {
    orderAmount: number
    orderDeliveryAmount: number
    deliveryDiscountAmount: number
    deliveryPaymentAmount: number
    totalProductAmount: number
    immediatelyDiscountAmount: number
    couponDiscountAmount: number
    lastOrderAmount: number
    lastPaymentAmount: number
    welfarePointPaymentAmount: number
    pgPaymentAmount: number
    etcPaymentAmount: number
    productAmount: number
    rewardPaymentAmount: number
  }
  productQuantity: number
  cartKey?: number
  cartProductKeys?: number[]
  orderChannel: string
  pgRatio: number
  welfarePointsRatio: number
  reawrdPointRatio: number
  singePayment: boolean
  multipleDelivery: boolean
}

export interface OrderPostDeliveryResponseModel {
  orderKey: number
}

export interface OrderProductTicket {
  maxBuyQntUseYn: YesNoEnum
  maxBuyQnt: number
  minBuyqntUseYn: YesNoEnum
  minBuyQnt: number
  availableRewardPoints: number
  immediatelyDiscountResponse: {
    amount: number
    promotionName: string
  }
  productResponse: {
    productKey: number
    productName: string
    sellerProductCode: string
    productClassification: ProductDetailSaleStatus
    attachfilePathName: string
    attachfileName: string
    productPrice: number
    sellerKey: number
    subcontractKey: number
    minimumPurchaseQuantityYn: YesNoEnum
    minimumPurchaseQuantity: number
    maximumPurchaseQuantityYn: YesNoEnum
    maximumPurchaseQuantity: number
    lastProductStatsCode: ProductDetailSaleStatus
    saleStatus: ProductDetailSaleStatus
    sellerDeliveryFeeKey: number
    shippingPointCombinedDeliveryPossibleYn: number
    adultCertificationProductYn: YesNoEnum
    immediatelyDiscountResponse: {
      amount: number
      promotionName: string
    }
    productOptionResponses: number
  }
}

export interface OrderTicketProductRequestsModel {
  productKey: number
  optionKey: number | null
  orderQuantity: number
  memberCouponKey: number | null
  ticketReceiverRequests: {
    receiverName: string
    receiverPhoneNumber: string
    ticketQuantity: number
  }[]
}

export interface OrderTicketProductFormModel {
  productClassification: ProductDetailSaleStatus
  orderChannel: string
  productQuantity: number
  orderPaymentRequest: {
    orderAmount: number
    orderDeliveryAmount: number
    deliveryDiscountAmount: number
    deliveryPaymentAmount: number
    totalProductAmount: number
    immediatelyDiscountAmount: number
    couponDiscountAmount: number
    lastOrderAmount: number
    lastPaymentAmount: number
    welfarePointPaymentAmount: number
    pgPaymentAmount: number
    etcPaymentAmount: number
    productAmount: number
    rewardPaymentAmount: number
    installment: number
  }
  ticketOrderProductRequests: OrderTicketProductRequestsModel[]
  senderMessage: string
  ordererName: string
}
