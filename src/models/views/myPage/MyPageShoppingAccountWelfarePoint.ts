export enum MyPageWelfarePointTypeEnum {
  Reserves = 'Reserves',
  WelfarePoints = 'WelfarePoints',
  Coupon = 'Coupon'
}

export enum MyPageRewardPointDateRangeType {
  FIFTEEN_DAYS = '15D',
  ONE_MONTH = '1M',
  THREE_MONTHS = '3M',
  SIX_MONTHS = '6M'
}

export const myPageRewardPointDateRangeOptions = [
  {
    label: '최근  15일',
    value: MyPageRewardPointDateRangeType.FIFTEEN_DAYS
  },
  {
    label: '최근  1개월',
    value: MyPageRewardPointDateRangeType.ONE_MONTH
  },
  {
    label: '최근  3개월',
    value: MyPageRewardPointDateRangeType.THREE_MONTHS
  },
  {
    label: '최근  6개월',
    value: MyPageRewardPointDateRangeType.SIX_MONTHS
  }
]

export interface MyPageBankWelfarePointsReservesItemModel {
  rewardPoint?: number,
  rewardPointName?: string,
  date?: string
  validStartDate?: string,
  validEndDate?: string
}

export interface MyPageBankWelfarePointsReservesModel {
  extinctionAmount?: number,
  usableRewardPoints?: number
}

export interface MyPageBankWelfarePointsItemModel {
  useKey?: number,
  processDate?: string,
  useTypeName?: string,
  useName?: string,
  pointAmount?: number,
  useValidDate?: {
    startDate?: string,
    endDate?: string
  }
}

export interface MyPageBankWelfarePointsModel {
  pointBalance?: number,
  deductionPoint?: number,
  totalPointAmount?: number
}

export enum MyPageCouponSortType {
  NEWEST = "newest",
  DEADLINE = "deadline"
}

export enum MyPageCouponBenefitType {
  FIXED = "FIX",
  PERCENT = "PER"
}

export enum MyPageCouponType {
  PRODUCT = "PRD",
  CART = "CRT",
  FREE_DELIVERY = "FSP"
}

export interface MyPageBankWelfarePointsCouponItemModel {
  couponKey?: number,
  couponName?: string,
  quantity?: number,
  benefitValue?: number,
  couponType?: MyPageCouponType,
  couponBenefitType?: string,
  maxDiscountAmount?: null,
  minOrderAmount?: null,
  validToDate?: string,
  remainingMonths?: number,
  remainingDays?: number,
  remainingHours?: number,
  remainingMinutes?: number
}