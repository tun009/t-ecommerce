import { OtherSpecialProductResponse } from '@/models/services/responses/other/OtherSpecialProductResponse'
import { BaseApi } from '../BaseApi'

class OtherApi extends BaseApi {
  constructor() {
    super('shop/display')
  }

  getDisplayConnerGNBList(gnbGroupKey: number): Promise<OtherSpecialProductResponse> {
    return this.get(`corner/schedule/list/${gnbGroupKey}`)
  }
}

export const otherApi = new OtherApi()
