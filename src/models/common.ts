export enum YesNoEnum {
  Y = 'Y',
  N = 'N'
}

export interface WelfareProductAmountProps {
  quantity?: number
  min: number
  max: number
}

export enum CouponBenefitType {
  FIXED = 'FIX',
  PERCENT = 'PER'
}

export enum ProductDetailBenefitType {
  FLAT_RATE = 'FLR',
  FIXED_RATE = 'FIR'
}

export const ORDER_CHANNEL = 'WMO'

export type WelfareProductAmountEmits = (e: 'update:quantity', value: any, target?: HTMLInputElement) => void

export enum AttachFileType {
  IMAGE = '01',
  MOV = '02'
}

export enum PayMethod {
  Card = 'card',
  Trans = 'trans',
  VBank = 'vbank',
  Phone = 'phone',
  Samsung = 'samsung',
  KPay = 'kpay',
  KakaoPay = 'kakaopay',
  Payco = 'payco',
  LPay = 'lpay',
  SsgPay = 'ssgpay',
  TossPay = 'tosspay',
  CultureLand = 'cultureland',
  SmartCulture = 'smartculture',
  HappyMoney = 'happymoney',
  BooknLife = 'booknlife',
  Point = 'point',
  WeChat = 'wechat',
  Alipay = 'alipay',
  UnionPay = 'unionpay',
  TenPay = 'tenpay',
  ApplePay = 'applepay',
  NaverPay = 'naverpay'
}
