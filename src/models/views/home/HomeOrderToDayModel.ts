import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'

export interface HomeOrderProductNewModel {
  name: string
  thumbnail: string
  percent: number
  pricePromotion: number
  price: number
}

export interface HomeOrderToDayModel {
  classProduct?: string
  title: string
  pathRedirect: string
  bannerImage: string
  isBannerImage: boolean
  productOrderToday?: WelfareUnitProductModel
}
