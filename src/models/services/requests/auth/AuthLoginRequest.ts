import { AuthSearchCompanyType } from "@/models/auth/AuthModel"

export interface AuthLoginModelRequest {
  memberId: string
  password: string
  customerKey?: number
  autoLogin: boolean
}

export interface AuthSearchCompanyModelRequest {
  searchType: AuthSearchCompanyType
  searchWord: string
}