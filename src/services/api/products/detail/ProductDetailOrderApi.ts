import { ProductDetailAddToCartRequest } from '@/models/services/requests/products/detail/ProductDetailAddToCartRequest'
import { BaseApi } from '../../BaseApi'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { CartProductsInCart } from '@/models/services/responses/cart/CartResponse'

class ProductDetailOrderApi extends BaseApi {
  constructor() {
    super('order')
  }

  addToCart(key: number, body: ProductDetailAddToCartRequest): Promise<BaseModelResponse<CartProductsInCart>> {
    return this.post(`cart/${key}`, body)
  }
}

export const productDetailOrderApi = new ProductDetailOrderApi()
