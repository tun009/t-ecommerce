import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'

export interface MyPageShoppingInformationExchangeHistoryModel {
  product:ProductModel
  exchangeQuantity:number
  exchangeOption:string
  reasonForExchange:string
  claimProcessStatus:string
}