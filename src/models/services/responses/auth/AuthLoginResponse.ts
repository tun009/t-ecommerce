import { AuthPolicyViolationModel } from '@/models/auth/AuthModel'
import { BaseModelResponse } from '../BaseModelResponse'

export interface AuthLoginDataModelResponse {
  accessToken?: string
  refreshToken?: string
  authenticated?: boolean
  tokenType?: string
  accountStatusNormal?: boolean
  policyViolation?: AuthPolicyViolationModel
}

export interface AuthSearchCompanyData {
  customerKey?: number
  customerName?: string,
  customerDomainUrl?: string
}

export interface AuthLoginModelResponse extends BaseModelResponse<AuthLoginDataModelResponse> { }
export interface AuthSearchCompanyModelResponse extends BaseModelResponse<AuthSearchCompanyData[]> { }
