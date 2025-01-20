import { BaseModelResponse } from "../BaseModelResponse"

export interface HomeListLNBModel {
  displayOrder?: number,
  displayCategoryId?: string,
  displayCategoryName?: string,
  linkUrl?: string
}

export interface HomeListLNBResponse extends BaseModelResponse<HomeListLNBModel[]> { }