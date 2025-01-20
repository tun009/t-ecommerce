import { YesNoEnum } from '../common'
import { ProductDetailSaleStatus } from '../views/products/ProductDetailReviewModel'

export interface WelfareUnitProductModel {
  id?: string | number
  titleDayWarning?: string
  thumbnailBo?: string
  thumbnailProduct: string
  pricePromotion?: number
  inventoryQuantity?: number
  productSaleStatus?: ProductDetailSaleStatus
  price?: number
  percent?: number
  benefits?: string[]
  buyers?: string[]
  buyerCount?: number
  rateStar?: number
  rateCountStar?: number
  name?: string
  productLikeYn?: YesNoEnum
  timeCount?: string
  productType?: string
  productClassification?: string
  freeDeliveryYn: YesNoEnum
  freeInterestYn: YesNoEnum
}

export interface WelfareUnitProductProps {
  data: WelfareUnitProductModel
  isBuy?: boolean
  isCart?: boolean
  isHeart?: boolean
  isDefaultHeart?: boolean
  isCoupon?: boolean
  isPrice?: boolean
  type?: 'ssm' | 'sm' | 'md' | 'lg'
  isSale?: boolean
  isLineThrough?: boolean
  rateStarClass?: string
}

export interface WelfareUnitProductEmits {
  (e: 'isPrice'): void

  (e: 'is-heart', id: string | number): void
}

export interface WelfareUnitProductSmallProps {
  data: WelfareUnitProductModel
  isDark?: boolean
}

export interface ProductNewModel {
  name: string
  thumbnail: string
}

export interface GroupProductNewsProps {
  data: ProductNewModel[]
}
