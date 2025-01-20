import { CouponBenefitType, YesNoEnum } from '@/models/common'

export enum ExhibitionFormTypeEnum {
  NONE = 'none',
  TAB = 'tab',
  DROPDOWN = 'dropdown',
  BUTTON = 'button'
}

export interface ExhibitionCategoryItemModel {
  exhibitionCornerKey: number
  cornerName: string
  exhibitionFormType: ExhibitionFormTypeEnum
}

export enum ExhibitionProductDetailClassificationEnum {
  TICKET = '01',
  DELIVERY = '02'
}

export enum ExhibitionRepresentativeTypeEnum {
  IMAGE = 'image',
  IMAGE_TEXT = 'imageText',
  VOD = 'vod',
  HTML = 'html'
}

export interface ExhibitionProductItemModel {
  productKey: number
  productCode: string
  productName: string
  loclProdName: string
  productClassification: ExhibitionProductDetailClassificationEnum
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
}

export interface ExhibitionInformationModel {
  exhibitionName: string
  displayStartDate: string
  displayEndDate: string
  noticeContents: string
  mobileNoticeUseYn: YesNoEnum
  mobileNoticeDisplayUseYn: YesNoEnum
  mobileMarketingImageName: string
  mobileMarketingImagePathName: string
  mobileMarketingImageAltName: string
  mobileMarketingImageDeleteYn: YesNoEnum
  s3ImageFullUrl: string
  mobileMarketingVideoName: string
  mobileMarketingVideoPathName: string
  mobileMarketingVideoAltName: string
  videoDeleteYn: string
  s3VideoFullUrl: string
  mobileMarketingVideoThumbnailName: string
  mobileMarketingVideoThumbnailPathName: string
  mobileMarketingVideoThumbnailAltName: string
  videoThumbnailDeleteYn: string
  s3VideoThumbnailFullUrl: string
  youtubeUrl: string
  youtubeAltName: string
  mainTitleName1: string
  mainTitleName2: string
  subTitleName: string
  colorHexaValue: string
  htmlContents: string
}

export interface ExhibitionMarketingInformationModel {
  marketingCouponMainTitleName: string
  marketingCouponSubTitleName: string
  marketingCouponImageName: string
  marketingCouponImagePathName: string
  marketingCouponImageAltName: string
  marketingCouponImageLinkUrl: string
  s3CouponImageFullUrl: string
  mobileMarketingImageLinkUrl: string
  mobileMarketingImageName: string
  mobileMarketingImagePathName: string
  mobileMarketingImageAltName: string
  marketingCouponYn: YesNoEnum
  marketingBannerYn: YesNoEnum
  s3MarketingImageFullUrl: string
  exhibitionRepresentativeType: ExhibitionRepresentativeTypeEnum
}

export interface ExhibitionCouponModel {
  couponKey: number
  exhibitionKey: number
  couponName: string
  couponType: string
  validPeriod: {
    validPeriodType: string
    afterIssueValidDay: number
    validFromDate: string
    validToDate: string
  }
  benefit: {
    benefitType: CouponBenefitType
    maxDiscountAmount: number
    benefitSettingValue: number
  }
  downloaded: boolean
}
