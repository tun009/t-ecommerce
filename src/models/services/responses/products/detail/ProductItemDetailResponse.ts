import {
  ProductDetailModel,
  ProductDetailOptionDepth1,
  ProductDetailOptionDepth2,
  ProductDetailOptionDepth3,
  ProductDetailLikeModel
} from '@/models/views/products/ProductDetailReviewModel'
import { BaseModelResponse } from '../../BaseModelResponse'

export interface ProductDetailResponse extends BaseModelResponse<ProductDetailModel> {}
export interface ProductDetailOptionDepth1Response extends BaseModelResponse<ProductDetailOptionDepth1[]> {}
export interface ProductDetailOptionDepth2Response extends BaseModelResponse<ProductDetailOptionDepth2[]> {}
export interface ProductDetailOptionDepth3Response extends BaseModelResponse<ProductDetailOptionDepth3[]> {}
export interface ProductDetailOptionProductLikeResponse extends BaseModelResponse<ProductDetailLikeModel> {}
