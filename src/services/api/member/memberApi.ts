import { SellerCompanyShipmentKeyResponse, SellerCompanyShipmentResponse } from '@/models/services/responses/member/MemberResponse'
import { BaseApi } from './../BaseApi'

class MemberApi extends BaseApi {
  constructor() {
    super('member')
  }

  getSellerCompanyShipment(keyList: number[]): Promise<SellerCompanyShipmentResponse> {
    return this.post('seller-companies/shipments:multiGet', {
      keyList
    })
  }

  getKeySellerCompanyShipment(productKey: number): Promise<SellerCompanyShipmentKeyResponse> {
    return this.get(
      this.apiHostUrl + '/shop/item/item-info-delivery',
      {
        productKey
      },
      true,
      true
    )
  }
}

export const memberApi = new MemberApi()
