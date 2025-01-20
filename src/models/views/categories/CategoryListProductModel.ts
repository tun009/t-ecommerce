import { ProductDetailAttachFileModel } from '../products/ProductDetailReviewModel'

export enum CategoryListProductDisplayType {
  IMAGE = '이미지',
  LIST = '리스트'
}

export enum CategoryEnumDepth {
  one = 1,
  two = 2,
  three = 3
}

export interface CategoryDataModel {
  displayCategoryId: string
  upperDisplayCategoryId: string
  upperDisplayCategoryName: string
  displayCategoryName: string
  displayCategoryDepth: CategoryEnumDepth
}

export interface CategoryListProductDisplayModel {
  productKey?: string
  productCode?: string
  productName?: string
  salePrice?: number
  productDiscountAmount?: number
  productDiscountRate?: number
  immediatelyProductDiscountAmount?: number
  lastProductSalesStatusCode?: number
  lastProductSalesStatusName?: string
  lastProductProgressStatusCode?: number
  lastProductProgressStatusName?: string
  standardCategoryId?: string
  standardCategoryPath?: string
  displayCategoryPath?: string
  foAttachFileList?: ProductDetailAttachFileModel[]
}

export interface CategoryBannerImageModel {
  exhibitionKey?: number
  exhibitionName?: string
  imageAltName?: string
  imageUrl?: string
  linkUrl?: string
}
