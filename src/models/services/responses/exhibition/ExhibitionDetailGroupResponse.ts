import {
  ExhibitionCategoryItemModel,
  ExhibitionCouponModel,
  ExhibitionInformationModel,
  ExhibitionMarketingInformationModel,
  ExhibitionProductItemModel
} from '@/models/views/exhibition/ExhibitionDetailGroupModel'
import { BaseModelResponse } from '../BaseModelResponse'

export interface ExhibitionCategoryListResponse extends BaseModelResponse<ExhibitionCategoryItemModel[]> {}
export interface ExhibitionItemListByCategoryResponse extends BaseModelResponse<ExhibitionProductItemModel[]> {}
export interface ExhibitionInfomationResponse extends BaseModelResponse<ExhibitionInformationModel> {}
export interface ExhibitionMarketingInfomationResponse extends BaseModelResponse<ExhibitionMarketingInformationModel> {}
export interface ExhibitionCouponInfomationResponse
  extends BaseModelResponse<{
    coupons: ExhibitionCouponModel[]
  }> {}
