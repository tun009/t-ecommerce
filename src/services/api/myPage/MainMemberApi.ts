import {
  MyPageMainMemberResponse,
  MyPageOrderListResponse,
  MyPageStatusDeliveryResponse,
  MyPageListDeliveryResponse
} from '@/models/services/responses/myPage/MyPageResponse'
import { BaseApi } from './../BaseApi'
import { MockDataMyPage } from '@/assets/mockData/myPage/mock-data-my-page'
import { MyPageDeliveryOrderItemModel } from '@/models/views/myPage/MyPageStatusOrderModal'
import { OrderClaimsParams } from '@/models/services/requests/order/OrderParamsRequest'

class MainMember extends BaseApi {
  constructor() {
    super('order')
  }

  getDeliveryCountState(): Promise<MyPageMainMemberResponse> {
    return this.get('orders/my-page')
  }

  getListOrderDelivery(params: OrderClaimsParams) {
    return this.get('orders/claims', params)
  }

  getInfoStatusDelivery(id: string | number): Promise<MyPageStatusDeliveryResponse> {
    if (!id) throw new Error()
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: MockDataMyPage.statusDeliveryData
        })
      }, 300)
    })
  }

  getListDelivery(id: string | number): Promise<MyPageListDeliveryResponse> {
    if (!id) throw new Error()
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: Array.from({ length: 4 }).fill(MockDataMyPage.listOrderDeliveryData) as MyPageDeliveryOrderItemModel[]
        })
      }, 300)
    })
  }
}

export const mainMember = new MainMember()
