import { BaseApi } from '../../BaseApi'
import { ProductDetailReviewsResponse } from '@/models/services/responses/products/detail/ProductDetailReviewsResponse'
import { PAGE_SIZE } from '@/commons'
import {
  ProductDetailReviewBaseInfoResponse,
  ProductDetailReviewPhotoVideoRequest,
  ProductDetailReviewPhotoVideoResponse,
  ProductDetailReviewSearchSortType
} from '@/models/views/products/detail/ProductDetailViewPhotoVideoProductModel'
import { ProductDetailReportModaRequest } from '@/models/views/products/detail/ProductDetailReportModalModel'
import { BaseModelResponse, ListeModelResponse } from '@/models/services/responses/BaseModelResponse'

class ProductDetailReviewsApi extends BaseApi {
  constructor() {
    super('order')
  }

  getProductReviews(
    productKey: number,
    reviewSearchSortType: ProductDetailReviewSearchSortType = ProductDetailReviewSearchSortType.NEWEST,
    pageNum: number = 1,
    rowSize: number = PAGE_SIZE
  ): Promise<ProductDetailReviewsResponse> {
    return this.get(`product-reviews/${productKey}`, { reviewSearchSortType, pageNum, rowSize })
  }

  getListFileByProductKey(params: ProductDetailReviewPhotoVideoRequest): Promise<ListeModelResponse<ProductDetailReviewPhotoVideoResponse>> {
    return this.get(`product-reviews/${params.productKey}/files`, params)
  }

  async postReportReview(orderProductReviewKey: string, params: ProductDetailReportModaRequest) {
    return await this.post(`product-reviews/${orderProductReviewKey}/declare`, params)
  }

  getDetailReviewByOrderProductReviewKey(orderProductReviewKey: string) {
    return this.get(`review/${orderProductReviewKey}`)
  }

  getAverageReviews(productKey: number): Promise<BaseModelResponse<ProductDetailReviewBaseInfoResponse>> {
    return this.get(`product-reviews/${productKey}/basic-info`)
  }

  like(orderProductReviewKey: number) {
    return this.post(`product-reviews/${orderProductReviewKey}`)
  }

  disLike(orderProductReviewKey: number) {
    return this.delete(`product-reviews/${orderProductReviewKey}`)
  }

  validCanWriteReview(productKey: number) {
    return this.get(`product-reviews/${productKey}/validate`)
  }
}

export const productDetailReviewsApi = new ProductDetailReviewsApi()
