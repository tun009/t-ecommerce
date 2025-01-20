import { PG, TIER_CODE, USER_CODE } from '@/commons'
import { AccountModel } from '@/models/services/responses/commons/AccountResponse'

declare global {
  interface Window {
    IMP: any
  }
}

enum PayMethod {
  Card = 'card',
  Trans = 'trans',
  VBank = 'vbank',
  Phone = 'phone',
  Samsung = 'samsungpay',
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
  NaverPay = 'naverpay',
  ApplePay = 'applepay',
  Lpay = 'lpay'
}

type Pg =
  | 'html5_inicis'
  | 'kcp'
  | 'kcp_billing'
  | 'uplus'
  | 'jtnet'
  | 'nice'
  | 'kakaopay'
  | 'kakao'
  | 'danal'
  | 'danal_tpay'
  | 'kicc'
  | 'paypal'
  | 'mobilians'
  | 'payco'
  | 'settle'
  | 'naverco'
  | 'naverpay'
  | 'smilepay'

enum LANGUAGE {
  Korean = 'ko',
  English = 'en'
}

export interface DataPayment {
  merchantUid: string
  productName: string
  amount: number
  pg?: string
  payMethod?: PayMethod | number
  m_redirect_url?: string
}

export interface RequestPayParams {
  // TODO: Define the type of the dataPayment property
  dataPayment: DataPayment
  account: AccountModel
}

export interface RequestPay {
  pg: string
  pay_method: PayMethod
  merchant_uid: string
  amount: number
  buyer_name: string
  language?: LANGUAGE
  buyer_email?: string
  buyer_tel?: string
  buyer_addr?: string
  buyer_postcode?: string
  name: string
  m_redirect_url?: string
}

export const usePayment = () => {
  const { IMP } = window
  //   IMP.init(USER_CODE)
  IMP.agency(USER_CODE, TIER_CODE)

  const requestPay = (params: RequestPayParams, callback?: (res: any) => void) => {
    console.log('params', params)
    // Account payment
    const { cellphoneNumber, memberId, memberName, address } = params.account
    const buyer_addr = (address?.basicJibun || '') + ' ' + (address?.detail || '')
    const buyer_postcode = params.account.address?.zipCode
    // Data payment
    const paid_amount = params.dataPayment.amount
    const merchant_uid = params.dataPayment.merchantUid
    const product_name = params.dataPayment.productName
    const m_redirect_url = params.dataPayment.m_redirect_url

    // method payment
    const pay_method = getPaymentMethod(params.dataPayment.payMethod)
    const Pg = params.dataPayment.pg || PG
    // TODO: call back url
    // const { protocol, hostname, port } = window.location
    // const m_redirect_url = `${protocol}//${hostname}${port ? `:${port}` : ''}/order-product?member=yes&cartKey=1&cartProductKeys=45`

    const requestPay: RequestPay = {
      pg: Pg,
      pay_method: pay_method,
      merchant_uid: merchant_uid.toString(),
      name: product_name,
      amount: paid_amount,
      buyer_email: memberId,
      buyer_name: memberName,
      buyer_tel: cellphoneNumber,
      buyer_addr: buyer_addr,
      buyer_postcode: buyer_postcode,
      m_redirect_url: m_redirect_url
    }
    // console.log('requestPay', requestPay)
    IMP.request_pay(requestPay, callback)
  }

  const getPaymentMethod = (currentBank?: number | PayMethod) => {
    let pay_method = PayMethod.Card
    switch (currentBank) {
      case 3:
        // kakao pay
        pay_method = PayMethod.KakaoPay
        break
      case 4:
        // naver pay
        pay_method = PayMethod.NaverPay
        break
      case 7:
        // samsung pay
        pay_method = PayMethod.Samsung
        break
      case 8:
        // TODO:  apple pay
        pay_method = PayMethod.ApplePay
        break
      case 6:
        // TODO:  L pay
        pay_method = PayMethod.Lpay
        break
      default:
        pay_method = PayMethod.Card
        break
    }
    return pay_method
  }

  const callBackPayment = (response: any) => {
    console.log('callBackPayment')
    if (response.success) {
      console.log(response)
    } else {
      console.log(response)
    }
  }

  return {
    requestPay
  }
}
