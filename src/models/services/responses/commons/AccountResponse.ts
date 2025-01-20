import { YesNoEnum } from '@/models/common'

export type AccountModel = {
  memberKey: number
  memberId: string
  memberName: string
  birthDate: string
  cellphoneNumber: string
  email: string
  deliveryZipCode: string
  deliveryLoadNameAddress: string
  deliveryLoadLotBasedAddress: string
  deliveryDetailedAddress: string
  rewardPointBalance: number
  pointBalance: number
  company: {
    customerName: string
    employeeNumber: string
    holdingOfficeYn: {
      code: YesNoEnum
      title: string
    }
    rankName: string
  }
  agreement: {
    [key: string]: {
      code: YesNoEnum
      title: string
    }
    marketingAgreeYn: {
      code: YesNoEnum
      title: string
    }
    smsAgreeYn: {
      code: YesNoEnum
      title: string
    }
    emailAgreeYn: {
      code: YesNoEnum
      title: string
    }
    kakaoAgreeYn: {
      code: YesNoEnum
      title: string
    }
  }
  address?: {
    basicJibun: string
    basicRoad: string
    detail: string
    zipCode: string
  }
}
