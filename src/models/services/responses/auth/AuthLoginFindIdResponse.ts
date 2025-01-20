import { YesNoEnum } from "@/models/common"

export interface AuthLoginFindIdResponse {
  otp?: string,
  csrfToken?: string,
  success?: boolean
}

export interface AuthLoginFindIdConfirmResponse {
  memberId?: string,
  registeredDate?: string,
  dormancyYn?: YesNoEnum,
  success?: boolean
}
