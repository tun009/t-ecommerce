import { DEFAULT_DATE_FORMAT_DOT, formatTime, renderLabelEnum } from '@/commons'
import { OrderCartGroupDeliveryAddressModel, OrderInfoPaymentModel, OrderPriceInfoBillModel } from '../order/OrderProductPageModel'
import { DeliveryResponse, ProductOptionResponse, TicketOrderReceiverResponse, OrderPaymentResponse, warehouseResponse } from './MyPageCustomerInfo'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { DeliveryAddressCodeEnum } from '../common/DeliveryAddressModel'
import { YesNoEnum } from '@/models/common'
import { MyPageStatusDeliveryOrder } from './MyPageMainMemberModel'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { MyPageClaimDetailModel } from './MypageShoppingInformationRefundModel'

export interface MyPageOrderDetailModel {
  products: OrderCartGroupDeliveryAddressModel[]
  infoPayment: OrderInfoPaymentModel[]
  priceInfo: OrderPriceInfoBillModel
}

export interface MyPageInquiryOrderNumberModel {
  orderKey: string
  createdDatetime: string
  orderChannel: string
  productClassification: string
  myPageOrderEntryResponses: MyPageOrderEntryResponsesModel[]
  orderPaymentResponse: OrderPaymentResponse
  orderRefundResponse: MyPageOrderRefundResponseModel
  senderMessage: string
  ordererName: string
  quantity: number
  refundQuantity: number
}

export interface MyPageOrderEntryResponsesModel {
  deliveryOrderResponse: MyPageDeliveryOrderResponseModel
  ticketOrderReceiverResponse: TicketOrderReceiverResponse
}

export interface MyPageOrderRefundResponseModel {
  refundAmount: number
  refundDeliveryAmount: number
  addDeliveryAmount: string
  restoreWelfarePoint: number
  cancellationFee: number
  pgCancellationAmount: number
  refundQuantity: number
  refundRewardPoint: number
}

export interface MyPageDeliveryOrderResponseModel {
  orderDeliveryKey: number
  deliveryResponse: DeliveryResponse
  warehouseResponse: warehouseResponse
  invoiceNumber: number | string
  deliveryRequiredDays: string
  lastOrderDeliveryStatus: string
  productPreparationInstructionDate: string
  deliveryRequestDate: string
  invoiceRegistrationDate: string
  deliveryCompletionDate: string
  lastDeliveryCompletionDate: string
  deliveryFeeAmount: number
  deliveryFeeDiscountAmount: number
  deliveryFeePaymentAmount: number
  deliveryFeeMemberCouponKey: number
  deliveryProductResponses: MyPageReceiverOrderCodeResponseModel[]
  orderProcessStatus: string
  claimProcessStatus: string
  finalOrderStatus: string
}

export interface MyPageReceiverOrderCodeResponseModel {
  productKey: string
  orderQuantity: number
  refundQuantity: number
  productResponse: MyPageDeliveryProductResponseModel
}

export interface MyPageDeliveryProductResponseModel {
  productKey?: number
  productName: string
  productPrice: number
  attachfilePathName: string
  attachfileName: string
  productOptionResponses: ProductOptionResponse[]
}

export interface MyPageOrderDetailInformationModel {
  orderDate: string
  orderNumber: string
}

export enum MyPageDeliveryRequestEnum {
  CONTACT_IF_ABSENT = 'CALL',
  LEAVE_AT_GUARDHOUSE = 'GUARD',
  LEAVE_AT_DOOR = 'DOOR',
  PUT_IN_MAILBOX = 'MAILB',
  CUSTOM = 'OTHER'
}

export const myPageDeliveryRequestType: WelfareSelectDataModel[] = [
  { label: '부재시 연락', value: MyPageDeliveryRequestEnum.CONTACT_IF_ABSENT },
  { label: '경비실에 맡기기', value: MyPageDeliveryRequestEnum.LEAVE_AT_GUARDHOUSE },
  { label: '문 앞에 두기', value: MyPageDeliveryRequestEnum.LEAVE_AT_DOOR },
  { label: '우편함에 넣기', value: MyPageDeliveryRequestEnum.PUT_IN_MAILBOX },
  { label: '기타', value: MyPageDeliveryRequestEnum.CUSTOM }
]
export const MyPageOrderDetailProductConvertor = (data: MyPageInquiryOrderNumberModel) => {
  const deliveryResponse = data?.myPageOrderEntryResponses[0]?.deliveryOrderResponse?.deliveryResponse
  const orderPaymentResponse = data?.orderPaymentResponse
  const orderRefundResponse = data?.orderRefundResponse
  const orderProcessStatus: string[] = []
  const claimStatus: string[] = []
  const finalOrderStatus: string[] = []

  const orderProducts = [
    {
      deliveryAddress: {
        deliveryAddressCode: deliveryResponse?.deliveryAddressCode ?? DeliveryAddressCodeEnum.HOME,
        deliveryAddressBaseYn: YesNoEnum.Y,
        deliveryAddressName: deliveryResponse?.receiverName ?? '',
        deliveryTelNumber: deliveryResponse?.deliveryTelephone ?? '',
        deliveryCellphoneNumber: deliveryResponse?.deliveryCellPhone ?? '',
        address: {
          basicJibun: deliveryResponse?.deliveryLotAddress ?? '',
          basicRoad: deliveryResponse?.deliveryStreetAddress ?? '',
          detail: `(${deliveryResponse?.deliveryDetailAddress ?? ''})`,
          zipCode: deliveryResponse?.deliveryZipCode ?? ''
        }
      },
      products: data?.myPageOrderEntryResponses.map((item: MyPageOrderEntryResponsesModel) => {
        const product = item?.deliveryOrderResponse?.deliveryProductResponses?.[0]?.productResponse
        const productOptionResponse = product?.productOptionResponses?.[0]
        orderProcessStatus.push(item?.deliveryOrderResponse?.orderProcessStatus)
        claimStatus.push(item?.deliveryOrderResponse?.claimProcessStatus)
        finalOrderStatus.push(item?.deliveryOrderResponse?.finalOrderStatus)
        return {
          products: [
            {
              product: {
                id: product?.productKey,
                productName: product?.productName,
                productImage: product?.attachfilePathName,
                pricePromotion: product?.productPrice,
                quantity: item?.deliveryOrderResponse?.deliveryProductResponses?.[0]?.orderQuantity,
                nameOption: `${productOptionResponse?.optionLargeName ?? ''} ${productOptionResponse?.optionMediumName ?? ''} ${productOptionResponse?.optionSmallName ?? ''}`,
                orderProcessStatus: data?.myPageOrderEntryResponses?.[0]?.deliveryOrderResponse?.orderProcessStatus,
                finalOrderStatus: data?.myPageOrderEntryResponses?.[0]?.deliveryOrderResponse?.finalOrderStatus
              }
            }
          ],
          quantity: item?.deliveryOrderResponse.deliveryProductResponses[0].orderQuantity,
          refundQuantity: item?.deliveryOrderResponse.deliveryProductResponses[0].refundQuantity
        }
      }),
      messageAddressDelivery: renderLabelEnum(myPageDeliveryRequestType, deliveryResponse?.deliveryRequestType) ?? ''
    }
  ] as OrderCartGroupDeliveryAddressModel[]

  const priceInfo = {
    totalPrice: orderPaymentResponse?.totalProductAmount,
    costDelivery: orderPaymentResponse?.orderDeliveryAmount,
    priceVoucher: orderPaymentResponse?.immediatelyDiscountAmount,
    priceSavePoint: orderPaymentResponse?.welfarePointPaymentAmount
  }

  const orderRefundBill = {
    totalPrice: orderRefundResponse?.refundAmount,
    priceSavePoint: orderRefundResponse?.restoreWelfarePoint,
    priceVoucher: orderRefundResponse?.pgCancellationAmount
  } as OrderPriceInfoBillModel

  const orderInfo = {
    orderDate: data?.createdDatetime ? formatTime(data?.createdDatetime, DEFAULT_DATE_FORMAT_DOT) : '',
    orderNumber: data?.orderKey ? data?.orderKey : ''
  } as MyPageOrderDetailInformationModel

  const orderDeliveryKey = data.myPageOrderEntryResponses?.[0]?.deliveryOrderResponse?.orderDeliveryKey ?? 0

  return {
    orderProducts,
    priceInfo,
    orderRefundBill,
    orderInfo,
    orderDeliveryKey,
    orderProcessStatus,
    claimStatus,
    finalOrderStatus
  }
}

export interface MyPageOrderDetailModelResponse extends BaseModelResponse<MyPageClaimDetailModel> { }

