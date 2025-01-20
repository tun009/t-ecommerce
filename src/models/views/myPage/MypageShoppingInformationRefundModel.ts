import { DEFAULT_DATE_FORMAT_DOT, formatTime, renderLabelEnum } from '@/commons'
import { OrderCartGroupDeliveryAddressModel, OrderInfoPaymentModel, OrderPriceInfoBillModel } from '../order/OrderProductPageModel'
import { DeliveryResponse, ProductOptionResponse, TicketOrderReceiverResponse, OrderPaymentResponse, warehouseResponse } from './MyPageCustomerInfo'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { DeliveryAddressCodeEnum } from '../common/DeliveryAddressModel'
import { YesNoEnum } from '@/models/common'
import { MyPageStatusDeliveryOrder, myPageListMessageStatusDelivery } from './MyPageMainMemberModel'
import { MyPageClaimDetailReason } from './MyPageOrderCancelModel'

export interface MyPageOrderDetailModel {
  products: OrderCartGroupDeliveryAddressModel[]
  infoPayment: OrderInfoPaymentModel[]
  priceInfo: OrderPriceInfoBillModel
}

export interface MyPageClaimDetailModel {
  orderKey: string
  createdDatetime: string
  orderChannel: string
  productClassification: string
  myPageClaimEntryResponses: MyPageClaimEntryResponsesModel[]
  orderPaymentResponse: OrderPaymentResponse
  orderRefundResponse: MyPageOrderRefundResponseModel
  senderMessage: string
  ordererName: string
  quantity: number
  refundQuantity: number
}

export interface MyPageClaimEntryResponsesModel {
  deliveryClaimResponse: MyPageDeliveryClaimResponseModel
  ticketClaimReceiverResponse: TicketOrderReceiverResponse
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

export interface MyPageDeliveryClaimResponseModel {
  claimDetailReason: MyPageClaimDetailReason
  claimKey: number
  claimProcessStatus: MyPageStatusDeliveryOrder
  deliveryCompletionDate: string
  deliveryFeeAmount: number
  deliveryFeeDiscountAmount: number
  deliveryFeeMemberCouponKey: number
  deliveryFeePaymentAmount: number
  deliveryProductResponses: MyPageReceiverOrderCodeResponseModel[]
  deliveryRequestDate: string
  deliveryRequiredDays: string
  deliveryResponse: DeliveryResponse
  exchangeProductResponse: Omit<ProductOptionResponse, 'optionPrice'>
  finalOrderStatus: string
  invoiceNumber: number | string
  invoiceRegistrationDate: string
  lastDeliveryCompletionDate: string
  lastOrderDeliveryStatus: string
  orderDeliveryKey: number
  orderProcessStatus: string
  productPreparationInstructionDate: string
  warehouseResponse: warehouseResponse
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

export const myPageClaimDetailReasonType: WelfareSelectDataModel[] = [
  { label: '고객 변심', value: MyPageClaimDetailReason.HEART_CHANGE },
  { label: '디자인/색상 불만족', value: MyPageClaimDetailReason.DESIGN_COLOR_DISSATISFACTION },
  { label: '가격/프로모션 비교', value: MyPageClaimDetailReason.PRICE_PROMOTION_COMPARISON },
  { label: '배송지 오류/변경', value: MyPageClaimDetailReason.DELIVERY_MISTAKE_CHANGE },
  { label: '상품 품절', value: MyPageClaimDetailReason.SOLD_OUT_PRODUCT },
  { label: '배송 지연', value: MyPageClaimDetailReason.DELIVERY_DELAY },
  { label: '상품(서비스)불량', value: MyPageClaimDetailReason.DEFECTIVE_PRODUCT },
  { label: '파손/구성품 누락/상품 오배송', value: MyPageClaimDetailReason.PRODUCT_DAMAGE_OMISSION_WRONG_DELIVERY },
  { label: '상품정보오류', value: MyPageClaimDetailReason.INCORRECT_PRODUCT_INFO },
  { label: '발급지연예상', value: MyPageClaimDetailReason.ISSUE_DELAY_EXPECTED },
  { label: '기타', value: MyPageClaimDetailReason.ETC }
]

export const myPageDeliveryRequestType: WelfareSelectDataModel[] = [
  { label: '부재시 연락', value: MyPageDeliveryRequestEnum.CONTACT_IF_ABSENT },
  { label: '경비실에 맡기기', value: MyPageDeliveryRequestEnum.LEAVE_AT_GUARDHOUSE },
  { label: '문 앞에 두기', value: MyPageDeliveryRequestEnum.LEAVE_AT_DOOR },
  { label: '우편함에 넣기', value: MyPageDeliveryRequestEnum.PUT_IN_MAILBOX },
  { label: '기타', value: MyPageDeliveryRequestEnum.CUSTOM }
]
export const MyPageShoppingInformationInfoRefundProductConvertor = (data: MyPageClaimDetailModel) => {
  const deliveryResponse = data.myPageClaimEntryResponses[0]?.deliveryClaimResponse?.deliveryResponse
  const orderPaymentResponse = data?.orderPaymentResponse
  const orderRefundResponse = data?.orderRefundResponse
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
      products: data.myPageClaimEntryResponses.map((item: MyPageClaimEntryResponsesModel) => {
        const product = item?.deliveryClaimResponse?.deliveryProductResponses[0]?.productResponse
        const productOptionResponse = product?.productOptionResponses[0]
        return {
          product: {
            id: product.productKey,
            productName: product.productName,
            productImage: product.attachfilePathName,
            pricePromotion: product.productPrice,
            quantity: item?.deliveryClaimResponse.deliveryProductResponses[0].orderQuantity,
            nameOption: `${productOptionResponse.optionLargeName} ${productOptionResponse.optionMediumName} ${productOptionResponse.optionSmallName}`,
            orderProcessStatus: data.myPageClaimEntryResponses[0].deliveryClaimResponse.orderProcessStatus
          },
          quantity: item?.deliveryClaimResponse.deliveryProductResponses[0].orderQuantity,
          refundQuantity: item?.deliveryClaimResponse.deliveryProductResponses[0].refundQuantity,
          reason: renderLabelEnum(myPageClaimDetailReasonType, item?.deliveryClaimResponse.claimDetailReason),
          options: myPageListMessageStatusDelivery[item?.deliveryClaimResponse.claimProcessStatus]
        }
      }),
      messageAddressDelivery: renderLabelEnum(myPageDeliveryRequestType, deliveryResponse.deliveryRequestType) ?? ''
    }
  ] as OrderCartGroupDeliveryAddressModel[]

  const priceInfo = {
    totalPrice: orderPaymentResponse.totalProductAmount,
    costDelivery: orderPaymentResponse.orderDeliveryAmount,
    priceSavePoint: orderPaymentResponse.welfarePointPaymentAmount,
    priceVoucher: orderPaymentResponse.immediatelyDiscountAmount
  }
  const orderRefundBill = {
    totalPrice: +orderRefundResponse.addDeliveryAmount ?? 0,
    costDelivery: orderRefundResponse.refundRewardPoint,
    priceSavePoint: orderRefundResponse.restoreWelfarePoint,
    priceVoucher: orderRefundResponse.pgCancellationAmount
  } as OrderPriceInfoBillModel

  const orderInfo = {
    orderDate: data.createdDatetime ? formatTime(data.createdDatetime, DEFAULT_DATE_FORMAT_DOT) : '',
    orderNumber: data.orderKey ? data.orderKey : ''
  } as MyPageOrderDetailInformationModel

  return {
    orderProducts,
    priceInfo,
    orderRefundBill,
    orderInfo,
    orderRefundResponse
  }
}
