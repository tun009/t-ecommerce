import { ProductDetailCouponResponseModel } from '@/models/views/products/detail/ProductDetailCouponModel'
import { BaseApi } from '@/services/api/BaseApi'

class ProductDetailCouponApi extends BaseApi {
  constructor() {
    super('order/promotion')
  }

  getCouponBtn(productKey: string | number): Promise<ProductDetailCouponResponseModel> {
    return this.get(`coupons`, { couponKeys: productKey })
  }

  downloadCoupon(couponKey: string | number) {
    return this.post(`coupons/${couponKey}/download`, { couponKey: couponKey })
  }
}

export const productDetailCouponApi = new ProductDetailCouponApi()
