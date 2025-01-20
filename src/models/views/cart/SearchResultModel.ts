import { YesNoEnum } from "@/models/common"

export interface SearchOptionsModel {
  customerKey: number
  searchWord: string
  pageNum: number
  rowSize: number
  displayCategoryIds?: string
  brandIds?: string
  minPrice?: number
  maxPrice?: number
  sortType?: string
  discountCouponYn?: YesNoEnum
  freeDeliveryYn?: YesNoEnum
  freeInterestYn?: YesNoEnum
}
