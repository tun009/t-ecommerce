import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface ProductDetailCouponModel {
  couponKey: number
  couponName: string
  benefitValue: number
  couponType: string
  couponBenefitType?: string
  maxDiscountAmount?: string | number
  minOrderAmount?: string | number
  validToDate: string
  downloaded: boolean
}

export interface ProductDetailCouponResponseModel extends BaseModelResponse<ProductDetailCouponModel[]> {}
