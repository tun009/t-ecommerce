import {
  MyPageReviewConutResponse,
  MyPageReviewMyOrderResponse,
  MyPageReviewResponse,
  MyPageLikeResponse,
  MyPageReviewPrdDetailResponse
} from '@/models/services/responses/myPage/MyPageProductReview'

import { BaseApi } from '../BaseApi'

class MyPageProductApi extends BaseApi {
  constructor(endpoint: string) {
    super(endpoint)
  }

  getWelfareReviewCount(): Promise<MyPageReviewConutResponse> {
    return this.get('review/count')
  }

  getWelfareReviewMyOrder(): Promise<MyPageReviewMyOrderResponse> {
    return this.get('review/myorders')
  }

  getWelfareReviewMyReview(): Promise<MyPageReviewResponse> {
    return this.get('review/myreview')
  }
  deleteWelfareReviewMyReview(orderProductReviewKey: number) {
    return this.delete(`review/${orderProductReviewKey}`)
  }

  getWelfareReviewPrdDetail(productKey: number): Promise<MyPageReviewPrdDetailResponse> {
    return this.get(`product?productKey=${productKey}`)
  }

  postWelfareReviewPrdWrite(params: any): Promise<MyPageReviewPrdDetailResponse> {
    return this.postMultipart(`review`, params)
  }
  putWelfareReviewPrdWrite(orderProductReviewKey: number, params: any): Promise<MyPageReviewPrdDetailResponse> {
    return this.put(`review/${orderProductReviewKey}`, params)
  }

  getWelfareReviewMyReviewDetail(orderProductReviewKey: number): Promise<MyPageReviewResponse> {
    return this.get(`review/${orderProductReviewKey}`)
  }
  getWelfarePrdLikeList(page = 1, rowSize = 5): Promise<MyPageLikeResponse> {
    return this.get(`item-like-list?pageNum=${page}&rowSize=${rowSize}`)
  }

  postWelfareCartPrd(productKey: number, params: { optionKey: null; productQuantity: number }): Promise<MyPageLikeResponse> {
    return this.post(`cart/${productKey}`, params)
  }

  deleteLikeProductList(productKeyList: { productKey: number }[]): Promise<MyPageLikeResponse> {
    return this.delete(`item-like-delete-multi`, { productKeyList })
  }
}

export const myPageProductOrder = new MyPageProductApi('order')
export const myPageProductShopApi = new MyPageProductApi('shop/item')
