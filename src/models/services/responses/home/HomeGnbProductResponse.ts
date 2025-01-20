import {
  HomeProductNewsModel,
  HomeProductOrderModel,
  HomeDataTabModel,
  HomeProductMdModel,
  HomeBannerTop,
  HomeGNBModel
} from '@/models/views/home/HomeGnbProductModel'
import { HomeProductSpecialPriceModel, HomeProductSpecialPriceProductLgLastModel } from '@/models/views/home/HomeProductSpecialPriceModel'
import { HomeOrderToDayModel } from '@/models/views/home/HomeOrderToDayModel'
import { BaseModelResponse } from '../BaseModelResponse'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
export interface ProductNewsResponse {
  data: HomeProductNewsModel[]
}
export interface ProductOrderResponse {
  data: HomeProductOrderModel[]
}
export interface ProductLgResponse {
  data: HomeProductSpecialPriceModel
}
export interface ProductLg1Response {
  data: HomeProductSpecialPriceProductLgLastModel
}
export interface DataTabResponse {
  data: HomeDataTabModel[]
}
export interface ProductMdResponse {
  data: HomeProductMdModel
}
export interface ProductOrderTodayResponse {
  data: HomeOrderToDayModel
}
export interface ProductSmResponse {
  data: WelfareUnitProductModel
}

export interface BannerTopHomeResponse {
  data: HomeBannerTop[]
}

export interface HomeGNBDataResponse extends BaseModelResponse<HomeGNBModel[]> {}
