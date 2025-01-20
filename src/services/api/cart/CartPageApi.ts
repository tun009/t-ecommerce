import { BaseApi } from '@/services/api/BaseApi'
import { CartResponse } from '@/models/services/responses/cart/CartResponse'
class CartPageApi extends BaseApi {
  constructor() {
    super('order')
  }

  getOrderCart() {
    return this.get('cart')
  }

  removeSelectedProduct(cartKey: number, listSelected: number[]) {
    return this.delete(`cart/${cartKey}`, { cartProductKeys: listSelected })
  }

  updateProductItem(
    cartProductKey: number,
    body: {
      cartProductKey: number,
      optionKey: number | null
      productQuantity: number
    }
  ) {
    return this.put(`cart/item/${cartProductKey}`, body)
  }

  getAllOptionsByOptionKey(optionKey: number) {
    return this.get(`cart/option/${optionKey}`)
  }

  deleteAllOutOfStockProducts(): Promise<CartResponse> {
    return this.post('cart/soldout')
  }
}
export const cartPageApi = new CartPageApi()
