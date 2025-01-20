import { dataHomePage } from '@/assets/mockData/home/mock-data-homegnb-page'
import {
  ProductNewsResponse,
  ProductOrderResponse,
  ProductLgResponse,
  ProductLg1Response,
  DataTabResponse,
  ProductMdResponse,
  ProductOrderTodayResponse,
  ProductSmResponse,
  BannerTopHomeResponse,
  HomeGNBDataResponse
} from '@/models/services/responses/home/HomeGnbProductResponse'
import { BaseApi } from '../BaseApi'
import {
  HomeProductNewsModel,
  HomeProductOrderModel,
  HomeDataTabModel,
  HomeBannerTop
} from '@/models/views/home/HomeGnbProductModel'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { HomeListLNBResponse } from '@/models/services/responses/home/HomeResponse'
import { OtherSpecialProductResponse } from '@/models/services/responses/other/OtherSpecialProductResponse'

class HomeApi extends BaseApi {
  constructor() {
    super('shop')
  }

  getListLNB(): Promise<HomeListLNBResponse> {
    return this.get("display/lnb/list")
  }

  getDisplayConnerGNBDetail(gnbGroupKey: number): Promise<OtherSpecialProductResponse> {
    return this.get(`display/corner/schedule/list/${gnbGroupKey}`)
  }

  getListProductNews() {
    return new Promise<ProductNewsResponse>((resolve) => {
      setTimeout(() => {
        const items: HomeProductNewsModel[] = dataHomePage.dataProductNews
        resolve({
          data: items
        })
      })
    })
  }

  getListProductOrder() {
    return new Promise<ProductOrderResponse>((resolve) => {
      setTimeout(() => {
        const items: HomeProductOrderModel[] = dataHomePage.productOrders
        resolve({
          data: items
        })
      })
    })
  }

  getListProductLg() {
    return new Promise<ProductLgResponse>((resolve) => {
      setTimeout(() => {
        const items = dataHomePage.productLg as WelfareUnitProductModel
        resolve({
          data: {
            title: '',
            pathRedirect: '',
            time: '',
            productLg: items
          }
        })
      })
    })
  }
  getListProductLgLast() {
    return new Promise<ProductLg1Response>((resolve) => {
      setTimeout(() => {
        const items = dataHomePage.productLg1 as WelfareUnitProductModel
        resolve({
          data: {
            productLgLast: items
          }
        })
      })
    })
  }
  getListProductMd() {
    return new Promise<ProductMdResponse>((resolve) => {
      setTimeout(() => {
        const items = dataHomePage.productMd as WelfareUnitProductModel
        resolve({
          data: {
            productMd: items
          }
        })
      })
    })
  }
  getListProductOrderToday() {
    return new Promise<ProductOrderTodayResponse>((resolve) => {
      setTimeout(() => {
        const items = dataHomePage.productOrderToday as WelfareUnitProductModel
        resolve({
          data: {
            title: '',
            pathRedirect: '',
            bannerImage: '',
            isBannerImage: false,
            productOrderToday: items
          }
        })
      })
    })
  }
  getListProductSm() {
    return new Promise<ProductSmResponse>((resolve) => {
      setTimeout(() => {
        const items = dataHomePage.productSm as WelfareUnitProductModel
        resolve({
          data: items
        })
      })
    })
  }

  getListDataTab() {
    return new Promise<DataTabResponse>((resolve) => {
      setTimeout(() => {
        const items: HomeDataTabModel[] = dataHomePage.dataTab
        resolve({
          data: items
        })
      })
    })
  }

  getListBannerTop() {
    return new Promise<BannerTopHomeResponse>((resolve) => {
      setTimeout(() => {
        const item = dataHomePage.bannerTopImage
        resolve({
          data: Array.from({ length: 4 }).fill(item) as HomeBannerTop[]
        })
      })
    })
  }

  getListGNBHome(): Promise<HomeGNBDataResponse> {
    return this.get('display/gnb/list')
  }
}

export const homeApi = new HomeApi()
