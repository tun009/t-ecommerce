export interface MyPageReviewConut {
  reviewCount: number
  orderCount: number
}
export interface MyProductOptionResponses {
  optionSmallName: string
  optionMediumName: string
  optionLargeName: string
  optionPrice: number
}

export interface ImmediatelyDiscountResponse {
  promotionName: string
  amount: number
}

/* 
  productClassification : 01 :티켓형 / 02 : 배송용

*/
export interface MyProductResponse {
  productOptionResponses: MyProductOptionResponses[]
  attachfileName: string
  productClassification: string
  attachfilePathName: string
  productKey: number
  productPrice: number
  sellerProductCode: string
  productName: string
}

export interface MyProductReviewFileResponses {
  reviewFileKey: number
  orderProductReviewKey: number
  attachFileType: string
  reviewFilePath: string
  reviewFileName: string
  reviewFullPath: string
}

export interface MyLikeFileResponse {
  attachfileType: string
  imageRepresentativeYn: string
  attachfilePathName: string
  attachfileName: string
  attachfileOriginName: string
  attachfileAltName: string
}

export interface MyProductReviewResponse {
  orderProductKey: number
  orderProductReviewKey: number
  review: string
  canModify: boolean
  canModifyLikes: boolean
  reviewCreationDate: string
  rewardPoint: number
  reviewStarPoint: number
  totalLikes: number
  memberId: string
  productReviewFileResponses: MyProductReviewFileResponses[]
}

export interface MyPageReviewMyOrder {
  attachfilePathName: string
  productName: any
  productOptionResponses: any
  orderProductKey: number
  orderKey: number
  orderProductReviewKey: number
  orderQuantity: number
  productResponse: MyProductResponse
  productReviewResponse: MyProductReviewResponse
}

export interface MyPageReview {
  orderProductReviewKey: number
  paymentDate: string
  orderProductKey: number
  orderKey: number
  orderQuantity: number
  productResponse: MyProductResponse
  productReviewResponse: MyProductReviewResponse
}

export interface MyPageReviewPrdDetail {
  productKey: number
  productName: string
  sellerProductCode: string
  productClassification: string
  attachfilePathName: string
  attachfileName: string
  productPrice: number
  sellerKey: number
  subcontractKey: null
  minimumPurchaseQuantityYn: string
  minimumPurchaseQuantity: number
  maximumPurchaseQuantityYn: string
  maximumPurchaseQuantity: number
  lastProductStatsCode: string
  sellerDeliveryFeeKey: number
  shippingPointCombinedDeliveryPossibleYn: number
  immediatelyDiscountResponse: ImmediatelyDiscountResponse
  productOptionResponses: MyProductOptionResponses[]
}

export interface MyPageLikeProduct {
  productKey: number
  productCode: string
  productName: string
  salePrice: number
  productDiscountAmount: number
  productDiscountRate: number
  immediatelyProductDiscountAmount: number
  lastProductSalesStatusCode: string
  lastProductSalesStatusName: string
  foAttachFileList: MyLikeFileResponse[]
}

export interface MyPageRecentlyProduct {
  productKey: number
  salePrice: number
  productName: string
  timestamp: number
  foAttachFileList: MyLikeFileResponse[]
}
