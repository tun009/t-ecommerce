import { BaseModelResponse } from '../BaseModelResponse'
import { AccountModel } from '../commons/AccountResponse'

export type AuthPasswordFindIdDataModel = {
  otp: string
  csrfToken: string
}

export type AuthPasswordFindIdResponse = BaseModelResponse<AuthPasswordFindIdDataModel>

export type AuthPasswordOtpConfirmDataModel = {
  csrfToken: string
}

export type AuthPasswordOtpConfirmResponse = BaseModelResponse<AuthPasswordOtpConfirmDataModel>

export type AuthProfileResponse = BaseModelResponse<AccountModel>
