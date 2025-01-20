import { HomeListLNBModel } from "@/models/services/responses/home/HomeResponse"
import { WelfareUnitProductModel } from "@/models/uikits/WelfareProductTypes"

export interface HomeItemProductSlideModel {
  name: string
  thumbnail: string
  percent: number
  pricePromotion: number
  price: number
}

export interface HomeProductNewsModel {
  name: string
  thumbnail: string
}
export interface HomeProductOrderModel {
  name: string
  thumbnail: string
  percent: number
  pricePromotion: number
  price: number
}
export interface HomeCategoryProps {
  dataCategory: HomeListLNBModel[]
}
export interface HomeDataTabModel {
  id: string
  label: string
}
export interface HomeProductMdModel {
  productMd: WelfareUnitProductModel
}
export interface HomeProductSmModel {
  productSm?: WelfareUnitProductModel
}

export interface HomeBannerTop {
  image: string
}

export enum HomeGNBType {
  MAIN = 'main',
  TIMEDEAL = 'timedeal',
  BEST = 'best',
  EVENT = 'event',
  PLANSHOP = 'planshop',
  THEME = 'theme'
}

export interface HomeGNBModel {
  gnbGroupKey: number
  customerId: string
  displayOrder: number
  gnbGroupType: HomeGNBType
  gnbDisplayKey: number
  mainTitleName: string
  linkUrl: string
}
