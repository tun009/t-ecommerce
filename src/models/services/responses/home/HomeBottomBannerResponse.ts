import { DataTablePaginationResponseModel } from "../BaseModelResponse"

export enum HomePopupAttributeType {
  imageText = "imageText",
  image = "image"
}

export enum HomeNonDisplayPeriodType {
  DAY = "day",
  WEEK = "week",
  CONTINUE = "continue",
  UNUSED = "unused"
}

export interface HomeBottomBannerModal {
  popupKey?: number,
  popupName?: string,
  popupAttributeType?: HomePopupAttributeType,
  nonDisplayPeriodType?: HomeNonDisplayPeriodType,
  popupFormType?: string,
  popupDisplayOrder?: number,
  imageUrl?: string,
  imageAltName?: string,
  mainTitleContents?: string,
  subTitleContents?: string,
  linkUrl?: string
}

export interface HomeBottomBannerStorage {
  popupKey: number,
  time: string
}

export interface HomeBottomBannerResponse extends DataTablePaginationResponseModel<HomeBottomBannerModal> { }