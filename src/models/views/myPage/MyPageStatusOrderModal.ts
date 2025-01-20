import { MyPageStatusDeliveryOrder } from './MyPageMainMemberModel'

export interface MyPageStatusDataOrderModel {
  title: string
  createDate: string
  content: string
  des?: string[]
}

export interface MyPageStatusDeliveryOrderProps {
  id: string | number
}

export interface MyPageStatusDeliveryOrderInformationModel {
  productName: string
  recipient: string
  statusDelivery: string
  companyDelivery: {
    name: string
    phone: string
  }
  billNumber: string
}

export interface MyPageStatusDeliveryOrderDataModel {
  infoDelivery: MyPageStatusDeliveryOrderInformationModel
  detailDelivery: {
    createDate: string
    location: string
    situation: string
  }[]
}

export interface MyPageDeliveryOrderItemModel {
  nameCompany: string
  numberBill: string
  statusDelivery: MyPageStatusDeliveryOrder
}
