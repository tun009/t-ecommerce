import { ProductDetailSaleStatus } from '../views/products/ProductDetailReviewModel'
import { MyPageStatusDeliveryOrder } from '../views/myPage/MyPageMainMemberModel'
import { OrderPromotionCouponsModel } from '../views/order/OrderProductPageModel'

export interface ProductModel {
  id?: number
  productName: string
  productImage: string
  price?: number
  pricePromotion?: number
  quantity: number
  quantityClone?: number
  nameOption?: string
  immediatelyProductDiscountAmount?: number
  percent?: number
  state?: ProductDetailSaleStatus
  immediatelyDiscountResponse?: {
    amount: number
    promotionName: string
  }
  deliveryName?: string
  config?: {
    name: string
    des: string
  }
  gift?: {
    name: string
    des: string[]
  }
  linkTo?: string
  orderProcessStatus?: MyPageStatusDeliveryOrder
  finalOrderStatus?: MyPageStatusDeliveryOrder
  listCoupons?: OrderPromotionCouponsModel[]
  productOptionResponses?: {
    optionKey: number
    optionLargeName: string
    optionMediumName: string
    optionSmallName: string
    optionPrice: number
    productQuantity: number
  }[]
}

export interface ProductReturnModel {
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

export enum ProductState {
  outOfStock = 'out-of-stock',
  stocking = 'stocking',
  delivery = 'delivery',
  normal = 'normal'
}

export interface WelfareUnitCardProps {
  isCheckBox?: boolean
  isShowMoney?: boolean
  isShowDelete?: boolean
  checked?: boolean
  isDeliveryPage?: boolean
  product: ProductModel
  isShowConfigDescription?: boolean
}

export type WelfareUnitCardEmits = {
  (e: 'update:checked', value: boolean): () => void
  (e: 'click:question-icon'): () => void
  (e: 'click:delete-icon'): () => void
}

export interface WelfareUnitCardOrderProps extends WelfareUnitCardProps {
  quantity: any
}
export interface WelfareUnitCardStateCustomerProps extends WelfareUnitCardProps {}
export interface WelfareUnitCardStateDeliveryProps extends WelfareUnitCardProps {
  isButtonOption?: boolean
  isButtonStateDelivery?: boolean
}

export type WelfareUnitCardOrderEmits = (e: 'update:quantity', value: any, target?: HTMLInputElement) => void
export interface WelfareUnitCardStateCustomerEmits extends WelfareUnitCardProps {}
export interface WelfareUnitCardStateDeliveryEmits extends WelfareUnitCardProps {}

export interface ProductVoucher {
  welPointInput?: number
  pointInput?: number
  savePointInput?: number
}
