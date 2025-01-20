import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { SellerCompanyShipmentKeyModel, SellerCompanyShipmentModel } from '@/models/views/member/SellerCompanyShipment'
import { CheckPasswordResponseModel, ChangePasswordResponseModel } from '@/models/views/myPage/MyPageEditMemberInfo'

export interface SellerCompanyShipmentKeyResponse extends BaseModelResponse<SellerCompanyShipmentKeyModel> {}
export interface SellerCompanyShipmentResponse extends BaseModelResponse<SellerCompanyShipmentModel> {}

export interface CheckPasswordResponse extends BaseModelResponse<CheckPasswordResponseModel> {}
export interface ChangePasswordResponse extends BaseModelResponse<ChangePasswordResponseModel> {}
