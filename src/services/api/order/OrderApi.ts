import { dataOrderPage } from '@/assets/mockData/orders/mock-data-order-page'
import { ORDER_CHANNEL } from '@/models/common'
import {
  OrderChangeAddressRequest,
  OrderCompletePaymentRequest,
  OrderPostOrderRequest,
  OrderProductRequest,
  OrderTicketProductFormRequest
} from '@/models/services/requests/order/OrderParamsRequest'
import { MyPageOrderDetailResponse } from '@/models/services/responses/myPage/MyPageOrderDetailResponse'
import {
  BanksListResponse,
  OptionCodePhoneListsResponse,
  OptionInstallmentMonthResponse,
  OptionProductVoucherResponse,
  OptionTypeDeliveryAddressResponse,
  OrderCouponResponse,
  OrderPaymentCompleteResponse,
  OrderPaymentCouponCompleteResponse,
  OrderPostPaymentResponse,
  OrderProductBaseInfoResponse,
  OrderProductCouponResponse,
  OrderProductCouponsResponse,
  OrderProductCustomerCartResponse,
  OrderProductResponse,
  OrderProductTicketResponse,
  RelateProductResponse
} from '@/models/services/responses/order/OrderProductCartResponse'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { MyPageOrderDetailModel, MyPageOrderDetailModelResponse } from '@/models/views/myPage/MyPageOrderDetailModel'
import {
  OrderBankPaymentModel,
  OrderCartGroupDeliveryAddressModel,
  OrderCartProductModel,
  OrderCouponCompletedModel,
  OrderInfoPaymentModel,
  OrderProductCustomerDeliveryAddressModel
} from '@/models/views/order/OrderProductPageModel'
import { BaseApi } from '../BaseApi'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

import { MyPageOrderCancelModelForm, OrderCancelModelResponse } from '@/models/views/myPage/MyPageOrderCancelModel'
class OrderApi extends BaseApi {
  constructor() {
    super('order')
  }

  async getTotalPriceRefund(orderKey: number) {
    return this.get(`order-cancels/${orderKey}`)
  }

  async paymentComplete(data: OrderCompletePaymentRequest): Promise<OrderPaymentCompleteResponse> {
    return this.post(`delivery-order/payment-complete`, data)
  }

  async paymentCompleteCoupon(data: OrderCompletePaymentRequest): Promise<OrderPaymentCouponCompleteResponse> {
    return this.post(`orders/tickets/payment-complete`, data)
  }

  getListProductCustomerCart() {
    return new Promise<OrderProductCustomerCartResponse>((resolve) => {
      setTimeout(() => {
        const items: ProductModel = dataOrderPage.productCustomer
        resolve({
          data: Array.from({ length: 4 }).map((_, index) => ({
            ...items,
            id: index,
            quantityClone: items.quantity
          })) as ProductModel[]
        })
      })
    })
  }

  getProductDetail(id: any) {
    return new Promise<OrderProductCouponsResponse>((resolve) => {
      setTimeout(() => {
        const item: ProductModel = dataOrderPage.productCustomer
        resolve({
          data: {
            ...item,
            quantity: +id === 1 ? 1 : 4
          }
        })
      })
    })
  }

  getOptionInstallmentMonth() {
    return new Promise<OptionInstallmentMonthResponse>((resolve) => {
      setTimeout(() => {
        const items: WelfareSelectDataModel[] = dataOrderPage.optionsInstallmentMonth
        resolve({
          data: items
        })
      })
    })
  }

  getOptionPaymentMethod() {
    return new Promise<OptionInstallmentMonthResponse>((resolve) => {
      setTimeout(() => {
        const items: WelfareSelectDataModel[] = dataOrderPage.optionsPaymentMethod
        resolve({
          data: items
        })
      })
    })
  }

  getListBanks() {
    return new Promise<BanksListResponse>((resolve) => {
      setTimeout(() => {
        const items: OrderBankPaymentModel[] = dataOrderPage.dataBanks
        resolve({
          data: items
        })
      })
    })
  }

  getTypeDelivery() {
    return new Promise<OptionTypeDeliveryAddressResponse>((resolve) => {
      setTimeout(() => {
        const items: WelfareSelectDataModel[] = dataOrderPage.typeAddressDelivery
        resolve({
          data: items
        })
      })
    })
  }

  getCodePhoneList() {
    return new Promise<OptionCodePhoneListsResponse>((resolve) => {
      setTimeout(() => {
        const items: WelfareSelectDataModel[] = dataOrderPage.codeTelList
        resolve({
          data: items
        })
      })
    })
  }

  getVoucherList() {
    return new Promise<OptionProductVoucherResponse>((resolve) => {
      setTimeout(() => {
        const items = dataOrderPage.voucher
        resolve({
          data: items
        })
      })
    })
  }

  getPaymentCartCompleteInfoCoupon(id: number) {
    return new Promise<OrderCouponResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            products: Array.from({ length: 3 }).fill({
              product: dataOrderPage.productCustomer,
              quantity: 3
            }) as OrderCartProductModel[],
            receivers: Array.from({ length: 20 }).map((v, index) => {
              return {
                ...dataOrderPage.receiver,
                nameTitle: dataOrderPage.receiver.nameTitle + (index + 1)
              }
            }),
            infoPayment: dataOrderPage.infoPaymentList as OrderInfoPaymentModel[],
            priceInfo: dataOrderPage.priceBill
          } as OrderCouponCompletedModel
        })
      })
    })
  }

  getOrderDetail(id: number) {
    return new Promise<MyPageOrderDetailResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            products: Array.from({ length: 2 }).fill({
              deliveryAddress: dataOrderPage.deliveryAddress as OrderProductCustomerDeliveryAddressModel,
              products: Array.from({ length: 2 }).map((_, index) => ({
                product: { ...dataOrderPage.productCustomer, id: index },
                quantity: 11
              })) as unknown as OrderCartProductModel[],
              messageAddressDelivery: '부재시 문앞에 놓아주세요.'
            }) as OrderCartGroupDeliveryAddressModel[],
            infoPayment: dataOrderPage.infoPaymentList as OrderInfoPaymentModel[],
            priceInfo: dataOrderPage.priceBill
          } as MyPageOrderDetailModel
        })
      })
    })
  }

  async getOrderDetailCoupon(orderKey: number) {
    return this.get(`orders/${orderKey}`)
  }

  async getOrderDetailClaim(orderKey: number): Promise<MyPageOrderDetailModelResponse> {
    return this.get(`orders/claims/${orderKey}`)
  }

  changeOrderDeliveryAddress(data: OrderChangeAddressRequest) {
    return this.put(`delivery-address`, data)
  }

  getOrderCancel(orderKey: number | string): Promise<OrderCancelModelResponse> {
    return this.get(`order-cancels/${orderKey}`)
  }
  putOrderCancel(order: MyPageOrderCancelModelForm) {
    return this.put('order-cancels', order)
  }

  getRelateProduct() {
    return new Promise<RelateProductResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          data: Array.from({ length: 15 }).fill(dataOrderPage.relateProduct) as WelfareUnitProductModel[]
        })
      })
    })
  }

  getOrderBaseInfo(productKey: number): Promise<OrderProductBaseInfoResponse> {
    return this.get(`product-reviews/${productKey}/basic-info`, {}, false)
  }

  getListCoupons(productKey: number) {
    return this.get(`promotion/coupons`, { couponKeys: productKey }, false)
  }

  getPointInfo(productKey: string) {
    return this.get(`promotion/rewards/${productKey}?orderChannel=${ORDER_CHANNEL}`)
  }

  getOrderInfo(request: OrderProductRequest): Promise<OrderProductResponse> {
    return this.get(`delivery-order/products`, request)
  }

  getCouponProduct(productKey: number): Promise<OrderProductCouponResponse> {
    return this.get(`promotion/coupons/${productKey}/target-order`)
  }

  postDeliveryOrder(data: OrderPostOrderRequest): Promise<OrderPostPaymentResponse> {
    return this.post('delivery-order', data)
  }

  getOrderTicket(productKey: number, productQuantity: number = 1, orderChannel = ORDER_CHANNEL): Promise<OrderProductTicketResponse> {
    return this.get('orders/tickets', {
      productKey,
      productQuantity,
      orderChannelType: orderChannel
    })
  }

  postTicketOrder(data: OrderTicketProductFormRequest): Promise<OrderPostPaymentResponse> {
    return this.post('orders/tickets', data)
  }

  downloadCoupon(couponKey: string | number): Promise<BaseModelErrorResponse> {
    return this.post(`promotion/coupons/${couponKey}/download`, undefined, {}, false)
  }
}

export const orderApi = new OrderApi()
