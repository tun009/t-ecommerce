import { BaseModelResponse, DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { MyPageDeliveryMyPageCountModel, MyPageOrderProductModel } from '@/models/views/myPage/MyPageMainMemberModel'
import { MyPageDeliveryOrderItemModel, MyPageStatusDeliveryOrderDataModel } from '@/models/views/myPage/MyPageStatusOrderModal'
import { SettingAutoLoginType, SettingVersionType } from '@/models/views/myPage/MyPageSetting'

export interface MyPageMainMemberResponse extends BaseModelResponse<MyPageDeliveryMyPageCountModel> {}

export interface MyPageOrderListResponse extends DataTablePaginationResponseModel<MyPageOrderProductModel> {}

export interface MyPageStatusDeliveryResponse extends BaseModelResponse<MyPageStatusDeliveryOrderDataModel> {}
export interface MyPageListDeliveryResponse extends BaseModelResponse<MyPageDeliveryOrderItemModel[]> { }

export interface MyPageAutoLoginResponse extends BaseModelResponse<SettingAutoLoginType> {}
export interface MyPageVersionResponse extends BaseModelResponse<SettingVersionType> {}
