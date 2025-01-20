interface ProductReviewRequestType {
  orderProductKey: number
  reviewStarPoint: number
  review: string
}

export interface ReviewProductRequest {
  productReviewRequest: ProductReviewRequestType
}
