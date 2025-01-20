import { BaseApi } from '../BaseApi'
// import {
//   MyPageBankWelfarePointsCouponItemResponse,
//   MyPageBankWelfarePointsReservesItemResponse,
//   MyPageBankWelfarePointsReservesResponse
// } from '@/models/services/responses/myPage/MyPageBankWelfarePoints'
import { CheckPasswordRequestModel, ChangePasswordRequestModel, ChangeMemberInfoRequestModel } from '@/models/services/requests/member/MemberRequest'
import { CheckPasswordResponse, ChangePasswordResponse } from '@/models/services/responses/member/MemberResponse'

export interface PostCheckPasswordResponse {}

class MyPageEditMemberInfoApi extends BaseApi {
  constructor() {
    super('member')
  }

  postCheckPassword(params: CheckPasswordRequestModel): Promise<CheckPasswordResponse> {
    return this.post('members/me/password:check', params, {}, false)
  }

  putChangePassword(params: ChangePasswordRequestModel): Promise<ChangePasswordResponse> {
    return this.put('members/me/password', params, {}, false)
  }

  putChangeMemberInfo(params: ChangeMemberInfoRequestModel): Promise<ChangePasswordResponse> {
    return this.put('members/me', params, {}, false)
  }

  // getWelfarePointsReservesItems(rewardPointDateRangeType: MyPageRewardPointDateRangeType = MyPageRewardPointDateRangeType.FIFTEEN_DAYS): Promise<MyPageBankWelfarePointsReservesItemResponse> {
  //   return this.get('reward-point', { rewardPointDateRangeType })
  // }

  // getWelfarePointsReserves(): Promise<MyPageBankWelfarePointsReservesResponse> {
  //   return this.get('reward-point/my-point')
  // }

  // getWelfarePointsCouponItems(couponSortType: MyPageCouponSortType = MyPageCouponSortType.NEWEST): Promise<MyPageBankWelfarePointsCouponItemResponse> {
  //   return this.get('coupons', { couponSortType })
  // }
}

export const myPageEditMemberInfoApi = new MyPageEditMemberInfoApi()
