import {
  MyPageReviewConut,
  MyPageReviewMyOrder,
  MyPageReview,
  MyPageLikeProduct,
  MyPageReviewPrdDetail
} from '@/models/views/myPage/MyPageProductReview'
import { BaseModelResponse, ListeModelResponse } from '../BaseModelResponse'

export interface MyPageReviewConutResponse extends BaseModelResponse<MyPageReviewConut> {}

export interface MyPageReviewPrdDetailResponse extends BaseModelResponse<MyPageReviewPrdDetail> {}

export interface MyPageReviewMyOrderResponse extends ListeModelResponse<MyPageReviewMyOrder> {}

export interface MyPageReviewResponse extends ListeModelResponse<MyPageReview> {}

export interface MyPageLikeResponse extends ListeModelResponse<MyPageLikeProduct> {}
