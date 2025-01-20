export interface AuthLoginFindIdRequest {
  memberName: string
  cellphoneNumber: string
}

export interface AuthLoginFindIdConfirmRequest {
  csrfToken: string,
  otp: string
}