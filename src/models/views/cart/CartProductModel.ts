import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'

export interface CartProductModel extends ProductModel {
  isSelect: boolean
  cartKey: number
  productKey: number
  cartProductKey: number
  minimumPurchaseQuantity?: number
  maximumPurchaseQuantity: number
  adultCertificationProductYn?: string
  sellerDeliveryFeeKey: number
  immediatelyDiscountResponse?: { amount: number; promotionName: string }
}
