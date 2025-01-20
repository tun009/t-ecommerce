import { BaseApi } from '../../BaseApi'
import { ProductDetailInquiriesRequest, ProductDetailInquiryRequest } from '@/models/services/requests/products/detail/ProductDetailProductQARequest'

class ProductDetailProductQATabApi extends BaseApi {
  constructor() {
    super('operation')
  }
  getListProductInquiries(itemKey: string, productInquiriesParam: ProductDetailInquiriesRequest) {
    return this.get(`/items/${itemKey}/inquiries`, productInquiriesParam)
  }
  postNewQuestion(inquiry: ProductDetailInquiryRequest) {
    return this.post(`/items/inquiries`, inquiry, {}, false)
  }
}

export const productDetailProductQATabApi = new ProductDetailProductQATabApi()
