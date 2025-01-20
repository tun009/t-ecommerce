import { MyPageBankWelfarePointsCouponItemModel, MyPageBankWelfarePointsModel, MyPageBankWelfarePointsReservesItemModel, MyPageBankWelfarePointsReservesModel } from "@/models/views/myPage/MyPageShoppingAccountWelfarePoint"
import { BaseModelResponse } from "../BaseModelResponse"
import { MyPageBankWelfarePointsItemModel } from "../../../views/myPage/MyPageShoppingAccountWelfarePoint"

export interface MyPageBankWelfarePointsReservesItemResponse extends BaseModelResponse<MyPageBankWelfarePointsReservesItemModel[]> {}
export interface MyPageBankWelfarePointsReservesResponse extends BaseModelResponse<MyPageBankWelfarePointsReservesModel> {}

export interface MyPageBankWelfarePointsItemResponse extends BaseModelResponse<MyPageBankWelfarePointsItemModel[]> {}
export interface MyPageBankWelfarePointsResponse extends BaseModelResponse<MyPageBankWelfarePointsModel> {}

export interface MyPageBankWelfarePointsCouponItemResponse extends BaseModelResponse<MyPageBankWelfarePointsCouponItemModel[]> {}
