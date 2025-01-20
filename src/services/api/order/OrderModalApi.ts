import { CODE_CONTACT_TEL_LIST, CODE_TEL_LIST } from '@/commons'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import {
  OptionCodeContactListsResponse,
  OptionCodeTelListsResponse,
  OrderDeliveryAddressModelResponse
} from '@/models/services/responses/order/modal/OrderDeliveryAddressResponse'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { BaseApi } from '../BaseApi'

class OrderModalApi extends BaseApi {
  constructor() {
    super('member')
  }

  async getListAddressData(): Promise<OrderDeliveryAddressModelResponse> {
    return this.get('members/me/delivery-address')
  }

  async createNewAddress(data: DeliveryAddressModel): Promise<BaseModelResponse<string>> {
    return this.post('members/me/delivery-address', data, {}, false)
  }

  async editAddress(data: DeliveryAddressModel, key: number): Promise<BaseModelResponse<string>> {
    return this.put(`members/me/delivery-address/${key}`, data, {}, false)
  }

  async deleteAddress(key: string | number): Promise<BaseModelResponse<string>> {
    return this.delete(`members/me/delivery-address/${key}`)
  }

  getCodeTelList() {
    return new Promise<OptionCodeTelListsResponse>((resolve) => {
      setTimeout(() => {
        const items: WelfareSelectDataModel[] = CODE_TEL_LIST.map((t) => {
          return {
            label: t,
            value: t
          }
        })
        resolve({
          data: items
        })
      })
    })
  }

  getCodeContactList() {
    return new Promise<OptionCodeContactListsResponse>((resolve) => {
      setTimeout(() => {
        const items: WelfareSelectDataModel[] = CODE_CONTACT_TEL_LIST.map((t) => {
          return {
            label: t,
            value: t
          }
        })
        resolve({
          data: items
        })
      })
    })
  }
}

export const orderModalApi = new OrderModalApi()
