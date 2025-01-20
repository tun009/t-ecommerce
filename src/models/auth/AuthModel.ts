export enum AuthSearchCompanyType {
  name = 'name',
  url = 'url'
}

export interface AuthBaseFormType {
  name: string
  phone: string
}

export interface AuthConfirmFormProps {
  formValues: AuthBaseFormType
}

export interface AuthConfirmFormEmits {
  (e: 'setFieldValue', field: keyof AuthBaseFormType, value: string): void
  (e: 'submit'): void
}

export interface AuthVerificationFormType extends AuthBaseFormType {
  code: string
  csrfToken: string
}

export interface AuthResetPasswordFormType {
  password: string
  repeatPassword: string
}

export interface AuthVerificationFormProps {
  formValues: AuthVerificationFormType
  timeType: 'default' | 'warning'
}

export interface AuthVerificationFormEmits {
  (e: 'setFieldValue', field: keyof AuthVerificationFormType, value: string): void
  (e: 'submit'): void
  (e: 'resend'): void
}

export enum AuthLoginViolationType {
  INVALID_ID_PASSWORD = 'INVALID_ID_PASSWORD',
  LOCKED_ACCOUNT = 'LOCKED_ACCOUNT',
  ACCOUNT_DEACTIVATED_EXCEEDING_PASSWORD_FAIL_COUNT = 'ACCOUNT_DEACTIVATED_EXCEEDING_PASSWORD_FAIL_COUNT',
  DEACTIVATED_ACCOUNT = 'DEACTIVATED_ACCOUNT',
  EMAIL_VERIFICATION_REQUIRED = 'IDENTITY_VERIFICATION_REQUIRED',
  PASSWORD_EXPIRATION = 'PASSWORD_EXPIRED',
  PASSWORD_RESET_REQUIRED = 'PASSWORD_RESET_REQUIRED',
  INTERNAL_LOGIN_ERROR = 'LOGIN_ERROR',
  LOGIN_FAIL_COUNT_LIMIT_EXCEEDED = 'LOGIN_FAIL_COUNT_LIMIT_EXCEEDED'
}

export interface AuthPolicyViolationModel {
  violationType?: AuthLoginViolationType
  csrfToken?: string
}

export interface AuthResetPasswordAfter90DaysModalProps {
  csrfToken?: string
}