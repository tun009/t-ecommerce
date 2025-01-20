import { BaseApi } from '../../BaseApi'

class ProductDetailProductCodeTabApi extends BaseApi {
  constructor() {
    super('shop')
  }

  getProductItemInfoDescription(productKey: number) {
    return this.get(`/item/item-info-description?productKey=${productKey}`)
  }

  getProductInformationNotice(productKey: number) {
    return this.get(`/item/item-info-ancm?productKey=${productKey}`)
  }

  getProductInformationRelease(productKey: number) {
    return this.get(`/item/item-info-issued?productKey=${productKey}`)
  }

  getGNBMenu() {
    return this.get('/display/gnb/list')
  }
  getListTodaySpecialProducts(gnbGroupKey: number) {
    return this.get(`/display/corner/schedule/list/${gnbGroupKey}`)
  }
  getSpecialPriceRemainTime(cornerSpecialPriceKey: number) {
    return this.get(`/display/corner/special-price/remain-end-time/${cornerSpecialPriceKey}`)
  }
}

export const productDetailProductCodeTabApi = new ProductDetailProductCodeTabApi()
