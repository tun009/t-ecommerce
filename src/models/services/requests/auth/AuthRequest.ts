export interface AuthPasswordOtpConfirmDataRequest {
  otp: string
  csrfToken: string
}

export interface AuthResetPasswordDataRequest {
  name: string
  phone: string
  password: string
  csrfToken: string
}

export interface AuthChangePasswordDataRequest {
  password: string
  csrfToken?: string
}

export interface AuthSkipChangePasswordDataRequest {
  csrfToken: string
}