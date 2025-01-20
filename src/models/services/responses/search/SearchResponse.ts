import { YesNoEnum } from '@/models/common'
import { BaseModelResponse, ListeModelResponse } from '../BaseModelResponse'

export interface SearchProductResponse extends ListeModelResponse<SearchProductDetailResponse> {}
export interface SearchProductDetailResponse {
  productKey: number
  productCode: string
  productName: string
  loclProdName: string
  productClassification: string
  brandId: string
  brandName: string
  salePrice: number
  discountAmount: number
  discountPrice: number
  filePathName: string
  fileName: string
  fileAltName: string
  imageUrl: string
  orderCount: number
  reviewCount: number
  reviewPoint: number
  productLikeYn?: YesNoEnum
}

export interface SearchFilterInfoResponse extends BaseModelResponse<SearchFilterInfoModel> {}

export interface SearchFilterInfoModel {
  brandList: SearchBrandModel[]
  categoryList: SearchCategoryModel[]
  minPrice: number
  maxPrice: number
}

export interface SearchBrandModel {
  brandName: string
  brandId: string
  count: number
}

export interface SearchCategoryModel {
  displayCategoryIdDepth1: string
  displayCategoryNameDepth1: string
  displayCategoryIdDepth2: string
  displayCategoryNameDepth2: string
  displayCategoryIdDepth3: string
  displayCategoryNameDepth3: string
  count: number
}

export interface SearchExhibitionModelResponse extends ListeModelResponse<SearchExhibitionModel> {}

export interface SearchExhibitionModel {
  exhibitionKey: number
  exhibitionName: string
  filePathName: string
  fileName: string
  fileAltName: string
  imageUrl: string
}

export interface SearchAutocomplete {
  searchWord: string
}

export interface SearchProductBannerModel {
  searchWordBannerKey?: number
  imageAltName?: string
  imageUrl?: string
  linkUrl?: string
}

export interface SearchProductBannerResponse extends BaseModelResponse<SearchProductBannerModel[]> {}

export interface SearchCategoryProductModel {
  productKey: number
  productCode: string
  productName: string
  loclProdName: string
  productClassification: string
  productSaleStatus: string
  productType: string
  brandId: string
  brandName: string
  salePrice: number
  discountAmount: number
  discountPrice: number
  filePathName: string
  fileName: string
  fileAltName: string
  imageUrl: string
  orderCount: number
  reviewCount: number
  reviewPoint: number
  productLikeYn: string
  freeDeliveryYn: YesNoEnum
  freeInterestYn: YesNoEnum
}
