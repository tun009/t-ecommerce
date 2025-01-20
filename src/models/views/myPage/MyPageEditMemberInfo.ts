import { ComputedRef, Ref } from 'vue'
import { AccountModel } from '@/models/services/responses/commons/AccountResponse'

export interface CheckPasswordRequestModel {
  password: string
}

export interface ChangePasswordRequestModel {
  password: string
  csrfToken: string
}

export interface CheckPasswordResponseModel {
  success: boolean
  csrfToken?: string | null
}
export interface ChangePasswordResponseModel {
  code: string
  message: string
}

export interface InputObjModel {
  id: string
  password: string
}

export interface UseMyPageCheckPasswordParamsModel {
  account: Ref<AccountModel>
}

export interface UseMyPageCheckPasswordModel {
  failMsg: Ref<string>
  isCheckPassword: ComputedRef<boolean>
  inputObj: InputObjModel
  setInputObj: (field: keyof InputObjModel, value: any) => void
  checkPasswordObj: CheckPasswordResponseModel
  checkPassword: () => void
}
