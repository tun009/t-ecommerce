export enum ProductDetailReviewSearchSortType {
  NEWEST = 'newest',
  MOST_RECOMMENDED = 'mostRecommended',
  LEAST_RECOMMENDED = 'leastRecommended',
  LOWEST_RATING = 'lowestRating',
  HIGHEST_RATING = 'highestRating'
}

export const SORT_REVIEWS = [
  ProductDetailReviewSearchSortType.NEWEST,
  ProductDetailReviewSearchSortType.MOST_RECOMMENDED,
  ProductDetailReviewSearchSortType.LEAST_RECOMMENDED,
  ProductDetailReviewSearchSortType.HIGHEST_RATING,
  ProductDetailReviewSearchSortType.LOWEST_RATING
]


export const ProductDetailListReviewSearchSortType = {
  [ProductDetailReviewSearchSortType.NEWEST]: 'productDetail.productReview.sort.newest',
  [ProductDetailReviewSearchSortType.MOST_RECOMMENDED]: 'productDetail.productReview.sort.mostRecommended',
  [ProductDetailReviewSearchSortType.LEAST_RECOMMENDED]: 'productDetail.productReview.sort.leastRecommended',
  [ProductDetailReviewSearchSortType.LOWEST_RATING]: 'productDetail.productReview.sort.lowestRating',
  [ProductDetailReviewSearchSortType.HIGHEST_RATING]: 'productDetail.productReview.sort.highestRating'
}

export interface ProductDetailReviewPhotoVideoRequest {
  productKey: string
  reviewSearchSortType: string
  pageNum: number
  rowSize: number
}

export interface ProductDetailReviewPhotoVideoResponse {
  reviewFileKey: number
  orderProductReviewKey: number
  attachFileType: string
  reviewFilePath: string
  reviewFileName: string
  reviewFullPath: string
}

export interface ProductDetailReviewBaseInfoResponse {
  reviewStarPoint: number,
  reviewCount: number
}