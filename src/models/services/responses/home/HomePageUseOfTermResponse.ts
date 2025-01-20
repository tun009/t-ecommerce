import { HomeTermOfUseDetailModel, HomeTermOfUseModel } from "@/models/views/home/HomeTermOfUseModel";
import { BaseModelResponse } from "../BaseModelResponse";

export interface HomeTermOfUseDetailResponse extends BaseModelResponse<HomeTermOfUseDetailModel> {}
export interface HomeTermOfUseResponse extends BaseModelResponse<HomeTermOfUseModel[]> {}