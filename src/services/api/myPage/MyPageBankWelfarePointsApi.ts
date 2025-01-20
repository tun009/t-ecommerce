import { MyPageBankWelfarePointsCouponItemResponse, MyPageBankWelfarePointsReservesItemResponse, MyPageBankWelfarePointsReservesResponse } from '@/models/services/responses/myPage/MyPageBankWelfarePoints'
import { BaseApi } from '../BaseApi'
import { MyPageCouponSortType, MyPageRewardPointDateRangeType } from '@/models/views/myPage/MyPageShoppingAccountWelfarePoint'

class MyPageBankWelfarePointsApi extends BaseApi {
  constructor() {
    super('order')
  }

  getWelfarePointsReservesItems(rewardPointDateRangeType: MyPageRewardPointDateRangeType = MyPageRewardPointDateRangeType.FIFTEEN_DAYS): Promise<MyPageBankWelfarePointsReservesItemResponse> {
    return this.get('reward-point', { rewardPointDateRangeType })
  }

  getWelfarePointsReserves(): Promise<MyPageBankWelfarePointsReservesResponse> {
    return this.get('reward-point/my-point')
  }

  getWelfarePointsCouponItems(couponSortType: MyPageCouponSortType = MyPageCouponSortType.NEWEST): Promise<MyPageBankWelfarePointsCouponItemResponse> {
    return this.get('coupons', { couponSortType })
  }
  
}

export const myPageBankWelfarePointsApi = new MyPageBankWelfarePointsApi()
