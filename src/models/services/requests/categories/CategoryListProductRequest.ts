export interface CategoryListProductRequest {
  pageNum: number
  rowSize: number
  catgoryIdDepth1?: string
  catgoryIdDepth2?: string
  catgoryIdDepth3?: string
}

export interface CategoryProductSearchListRequest {
  pageNum: number
  rowSize: number
  customerKey: string
  displayCategoryId: string
  brandIds?: string // separate by comma
  discountCouponYn?: string
  freeDeliveryYn?: string
  freeInterestYn?: string
  minPrice?: string
  maxPrice?: string
  // Sort classification (01: Recommended products / 02: Popular products / 03: Recently registered / 04: High prices / 05: Low prices / 06: Product reviews)
  sortType?: string
}
