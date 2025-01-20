export interface HomeTermOfUseModel {
  termsKey: number | string
  termsType?: string
  termsName?: string
  effectiveDate?: string
}
export interface HomeTermOfUseDetailModel {
  termsKey: number | string
  termsType?: string
  termsName?: string
  effectiveDate?: string
  versionInfo?: string
  contents?: string
}

export enum HomeTermOfUseType {
  SVC = 'SVC',
  PSN = 'PSN',
  MRKT = 'MRKT'
}
