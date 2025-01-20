import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'

export interface HomeOrderProductNewModel {
  name: string
  thumbnail: string
  percent: number
  pricePromotion: number
  price: number
}
export interface HomeProductSpecialPriceModel {
  title: string
  pathRedirect: string
  time: string
  productLg: WelfareUnitProductModel
}
export interface HomeProductSpecialPriceProductLgLastModel {
  productLgLast: WelfareUnitProductModel
}
