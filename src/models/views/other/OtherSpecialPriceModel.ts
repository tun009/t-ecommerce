import { YesNoEnum } from '@/models/common'

export interface OtherCornerSettingModel {
  cornerSettingKey: number
  customerId: string
  cornerKey: number
  templateKey: number
  cornerScheduleKey: number
  foCornerBannerResponseList: OtherCornerBannerResponse[]
  foCornerSpecialPriceResponseList: OtherCornerSpecialPriceResponse[]
  foCornerProductResponseList: OtherCornerProductResponse[]
  foCornerTextResponse: OtherCornerTextResponse
  foCornerGroupResponseList: OtherCornerGroupResponse[]
}

interface OtherCornerBannerResponse {
  cornerBannerKey: number
  cornerScheduleKey: number
  displayOrder: number
  imageUseYn: string
  imagePathName: string
  imageName: string
  imageAltName: string
  imageUrl: string
  imageTextContents: string
  linkType: string
  linkUrl: string
  linkExhibitionKey: number | null
  linkEventKey: number | null
  linkProductKey: number
}

export interface OtherCornerSpecialPriceResponse {
  cornerSpecialPriceKey: number
  cornerScheduleKey: number
  productKey: number
  displayOrder: number
  displayStartDatetime: string
  displayEndDatetime: string
  displayProductName: string
  benefitImageUseYn: string
  benefitImagePathName: string
  benefitImageName: string
  benefitImageAltName: string
  benefitImageUrl: string
  productName: string
  productSalePrice: number
  productSaleStatus: string
  productDiscountAmount: number
  productDiscountPrice: number
  filePathName: string
  fileName: string
  fileAltName: string
  imageUrl: string
  productLikeYn: YesNoEnum
  remainEndTime: string
  endTimeFlag: string
}

interface OtherCornerProductResponse {
  cornerProductKey: number
  cornerScheduleKey: number
  displayOrder: number
  imageUseYn: string
  imagePathName: string
  imageName: string
  imageAltName: string
  imageUrl: string
  imageTextContents: string
  linkType: string
  linkUrl: string
  linkExhibitionKey: number | null
  linkEventKey: number | null
  linkProductKey: number
}

interface OtherCornerTextResponse {
  cornerTextKey: number
  cornerScheduleKey: number
  textContents: string
}

interface OtherCornerGroupResponse {
  cornerGroupKey: number
  cornerScheduleKey: number
  displayOrder: number
  imageUseYn: string
  imagePathName: string
  imageName: string
  imageAltName: string
  imageUrl: string
  imageTextContents: string
  linkType: string
  linkUrl: string
  linkExhibitionKey: number | null
  linkEventKey: number | null
  linkProductKey: number | null
  foCornerGroupProductResponseList: OtherCornerGroupProductResponse[]
}

interface OtherCornerGroupProductResponse {
  cornerGroupProductKey: number
  cornerGroupKey: number
  productKey: number
  displayOrder: number
  imageUseYn: string
  imagePathName: string
  imageName: string
  imageAltName: string
  imageUrl: string
  imageTextContents: string
  linkType: string
  linkUrl: string
  linkExhibitionKey: number | null
  linkEventKey: number | null
  linkProductKey: number
}

export interface OtherSpecialDataModel {
  id?: string | number
  titleDayWarning?: string
  thumbnailBo?: string
  thumbnailProduct: string
  pricePromotion?: number
  inventoryQuantity?: number
  price?: number
  percent?: number
  benefits?: string[]
  name?: string
  productLikeYn?: YesNoEnum
}
