import { MyPageBankWelfarePointsItemResponse, MyPageBankWelfarePointsResponse } from '@/models/services/responses/myPage/MyPageBankWelfarePoints'
import { BaseApi } from '../BaseApi'
import { MyPageRewardPointDateRangeType } from '@/models/views/myPage/MyPageShoppingAccountWelfarePoint'

class MyPageBankMemberWelfarePointsApi extends BaseApi {
  constructor() {
    super('member')
  }

  getWelfarePointsItems(welfarePointDateRangeType: MyPageRewardPointDateRangeType): Promise<MyPageBankWelfarePointsItemResponse> {
    return this.get('members/me/points', { welfarePointDateRangeType  })
  }
  
  getWelfarePoints(): Promise<MyPageBankWelfarePointsResponse> {
    return this.get('members/me/points/my-point')
  }
}

export const myPageBankMemberWelfarePointsApi = new MyPageBankMemberWelfarePointsApi()
