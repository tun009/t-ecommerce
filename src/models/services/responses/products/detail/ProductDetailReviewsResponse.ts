import { ProductDetailReviewPhotoVideoResponse } from '@/models/views/products/detail/ProductDetailViewPhotoVideoProductModel'
import { ListeModelResponse } from '../../BaseModelResponse'

export interface ProductDetailReviewsResponseModel {
  orderKey?: number
  orderProductKey?: number
  orderProductReviewKey?: number
  orderQuantity?: number
  paymentDate?: string
  productResponse?: {
    productKey?: number,
    productName?: string,
    sellerProductCode?: string,
    productClassification?: string,
    attachfilePathName?: string,
    attachfileName?: string,
    productPrice?: number,
    sellerKey?: string,
    subcontractKey?: string,
    minimumPurchaseQuantityYn?: string,
    minimumPurchaseQuantity?: string,
    maximumPurchaseQuantityYn?: string,
    maximumPurchaseQuantity?: string,
    lastProductStatsCode?: string,
    sellerDeliveryFeeKey?: string,
    shippingPointCombinedDeliveryPossibleYn?: string,
    immediatelyDiscountResponse?: string,
    productOptionResponses?: {
      optionKey?: string,
      optionLargeName?: string,
      optionMediumName?: string,
      optionSmallName?: string,
      optionPrice?: string
    }[]
  }
  productReviewResponse?: {
    orderProductReviewKey?: number
    orderProductKey?: number
    reviewStarPoint?: number
    memberId?: string
    review?: string
    rewardPoint?: number
    reviewCreationDate?: string
    totalLikes?: number
    canModify?: boolean
    canModifyLikes?: boolean
    productReviewFileResponses?: ProductDetailReviewPhotoVideoResponse[],
  }
}

export interface ProductDetailReviewsResponse extends ListeModelResponse<ProductDetailReviewsResponseModel[]> { }
