export interface CheckPasswordRequestModel {
  password: string
}

export interface ChangePasswordRequestModel {
  password: string
  csrfToken: string
}

export interface ChangeMemberInfoAgreementModel {
  marketingAgreeYn: string
  emailAgreeYn: string
  smsAgreeYn: string
  kakaoAgreeYn: string
}
export interface ChangeMemberInfoRequestModel {
  csrfToken: string
  email: string
  deliveryZipCode: string
  deliveryLoadNameAddress: string
  deliveryDetailedAddress: string
  agreement: ChangeMemberInfoAgreementModel
}
