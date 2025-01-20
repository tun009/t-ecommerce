import {
  ExhibitionCategoryListResponse,
  ExhibitionCouponInfomationResponse,
  ExhibitionInfomationResponse,
  ExhibitionItemListByCategoryResponse,
  ExhibitionMarketingInfomationResponse
} from '@/models/services/responses/exhibition/ExhibitionDetailGroupResponse'
import { BaseApi } from '@/services/api/BaseApi'

class ExhibitionDetailGroupApi extends BaseApi {
  constructor() {
    super('shop/display/exhibition')
  }

  getCategoryList(exhibitionKey: string | number): Promise<ExhibitionCategoryListResponse> {
    return this.get('category-list/' + exhibitionKey)
  }

  getItemListByCategory(exhibitionCornerKey: string | number): Promise<ExhibitionItemListByCategoryResponse> {
    return this.get('category/item-list/' + exhibitionCornerKey)
  }

  getExhibitionInfo(exhibitionKey: string | number): Promise<ExhibitionInfomationResponse> {
    return this.get('info/' + exhibitionKey)
  }

  getExhibitionMarketingInfo(exhibitionKey: string | number): Promise<ExhibitionMarketingInfomationResponse> {
    return this.get('marketing/info/' + exhibitionKey)
  }

  getCouponInfo(exhibitionKey: string | number): Promise<ExhibitionCouponInfomationResponse> {
    return this.get('coupon/info/' + exhibitionKey)
  }
}

export const exhibitionDetailGroupApi = new ExhibitionDetailGroupApi()
