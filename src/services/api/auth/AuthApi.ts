import { AuthBaseFormType } from '@/models/auth/AuthModel'
import { AuthLoginFindIdConfirmRequest, AuthLoginFindIdRequest } from '@/models/services/requests/auth/AuthLoginFindIdRequest'
import { AuthLoginModelRequest, AuthSearchCompanyModelRequest } from '@/models/services/requests/auth/AuthLoginRequest'
import {
  AuthChangePasswordDataRequest,
  AuthPasswordOtpConfirmDataRequest,
  AuthResetPasswordDataRequest
} from '@/models/services/requests/auth/AuthRequest'
import { BaseModelErrorResponse, BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { AuthLoginFindIdConfirmResponse, AuthLoginFindIdResponse } from '@/models/services/responses/auth/AuthLoginFindIdResponse'
import { AuthLoginModelResponse, AuthSearchCompanyModelResponse } from '@/models/services/responses/auth/AuthLoginResponse'
import { AuthPasswordFindIdResponse, AuthPasswordOtpConfirmResponse, AuthProfileResponse } from '@/models/services/responses/auth/AuthResponse'
import { BaseApi } from '../BaseApi'

class AuthApi extends BaseApi {
  constructor() {
    super('member')
  }

  async login(data: AuthLoginModelRequest): Promise<AuthLoginModelResponse> {
    return this.post('auth:login', data, {}, false)
  }

  async verifyAccount(): Promise<BaseModelResponse<string>> {
    return this.post('members/me:verify')
  }

  async searchCompanies(request: AuthSearchCompanyModelRequest): Promise<AuthSearchCompanyModelResponse> {
    return this.get('no-auth/customer-companies', request)
  }

  async refreshToken(refreshToken: string): Promise<AuthLoginModelResponse> {
    return this.post('auth:reissue', {}, {}, false, false, {
      Authorization: `Bearer ${refreshToken}`
    })
  }

  async getProfile(): Promise<AuthProfileResponse> {
    return this.get('members/me', {}, false)
  }

  async changePassword(data: AuthChangePasswordDataRequest): Promise<BaseModelErrorResponse> {
    return this.post('members/me/password:reset', data, {}, false)
  }

  async skipChangePassword(): Promise<BaseModelErrorResponse> {
    return this.post('members/me/password:skip')
  }

  async findId(data: AuthLoginFindIdRequest): Promise<BaseModelResponse<AuthLoginFindIdResponse>> {
    return this.post('no-auth/members/id:find', data, {}, false)
  }

  async otpConfirmId(data: AuthLoginFindIdConfirmRequest): Promise<BaseModelResponse<AuthLoginFindIdConfirmResponse>> {
    return this.post('no-auth/members/id-otp:confirm', data, {}, false)
  }

  async passwordFindId(data: AuthBaseFormType): Promise<AuthPasswordFindIdResponse> {
    const reqData = {
      memberName: data.name,
      cellphoneNumber: data.phone
    }
    return this.post('no-auth/members/password:find', reqData, {}, false)
  }

  async passwordOtpConfirm(data: AuthPasswordOtpConfirmDataRequest): Promise<AuthPasswordOtpConfirmResponse> {
    return this.post('no-auth/members/password-otp:confirm', data, {}, false)
  }

  async resetPassword(memberKey: string | number, data: AuthResetPasswordDataRequest): Promise<BaseModelErrorResponse> {
    const reqData = {
      memberName: data.name,
      cellphoneNumber: data.phone,
      password: data.password,
      csrfToken: data.csrfToken
    }
    return this.post(`no-auth/members/${memberKey}/password:reset`, reqData, {}, false)
  }
  async logout(): Promise<BaseModelErrorResponse> {
    return this.post('auth:logout', {}, {}, false)
  }
}

export const authApi = new AuthApi()
