import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'

export interface CartResponse extends BaseModelResponse<CartProductsInCart> {}
export interface CartOptionsResponse extends BaseModelResponse<CartProductResponse> {}
export interface CartProductsInCart {
  cartQuantity?: number
  cartProductResponses?: CartProductResponses[]
}

export interface CartProductResponses {
  productResponse?: CartProductResponse
  cartKey?: number
  cartProductKey?: number
  productKey?: number
  productOptionKey?: string
  productQuantity?: number
  isSelect?: boolean
}
export interface CartProductOptionResponses {
  optionKey?: number
  optionLargeName?: string
  optionMediumName?: string
  optionSmallName?: string
  optionPrice?: number
}

export interface CartProductResponse {
  productKey?: number
  productName?: string
  sellerProductCode?: string
  productClassification?: string
  attachfilePathName?: string
  attachfileName?: string
  productPrice?: number
  sellerKey?: number
  subcontractKey?: number
  minimumPurchaseQuantityYn?: string
  minimumPurchaseQuantity?: number
  maximumPurchaseQuantityYn?: string
  maximumPurchaseQuantity?: number
  lastProductStatsCode?: ProductDetailSaleStatus
  saleStatus?: ProductDetailSaleStatus
  adultCertificationProductYn?: string
  sellerDeliveryFeeKey?: number
  shippingPointCombinedDeliveryPossibleYn?: string
  immediatelyDiscountResponse?: ImmediatelyDiscountResponse
  productOptionResponses?: CartProductOptionResponses[]
}

export interface ImmediatelyDiscountResponse {
  promotionName?: string
  amount?: number
}
