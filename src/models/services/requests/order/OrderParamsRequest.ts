import { OrderPostDeliveryModel, OrderTicketProductFormModel } from '@/models/views/order/OrderProductPageModel'

export interface OrderClaimsParams {
  pageNum: number
  rowSize: number
  fromDate: string
  toDate: string
}

export interface OrderProductRequest {
  cartKey: string
  cartProductKeys: string
  productKey?: string
  productOptionKey?: string
  productQuantity?: string
}

export interface OrderCompletePaymentRequest {
  orderKey: number
  orderChannel: string
  impUid?: any
  orderCashReceipt: {
    cashReceiptIssueTargetType?: any
    cashReceiptRequestNumber?: any
    cashReceipt: boolean
  }
}

export interface OrderPostOrderRequest extends OrderPostDeliveryModel {}
export interface OrderTicketProductFormRequest extends OrderTicketProductFormModel {}

export interface OrderChangeAddressRequest {
  orderKey: number
  orderDeliveryKey: number
  deliveryAddressInfo: {
    deliveryAddressCode: string
    receiverName: string
    deliveryZipCode: string
    deliveryStreetAddress: string
    deliveryLotAddress: string
    deliveryDetailAddress: string
    deliveryCellPhone: string
    deliveryTelephone: string
    deliveryRequestType: string
    deliveryRequestContent: string
  }
}
