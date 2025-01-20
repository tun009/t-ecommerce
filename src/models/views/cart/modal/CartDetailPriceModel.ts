export interface CartDetailPriceModel {
  productName: string
  totalPrice: number
  totalDiscountAmount: number
  expectedPurchasePrice: number
  discountPrograms: CartDetailPriceDiscountProgramsModel[]
}
export interface CartDetailPriceDiscountProgramsModel {
  amount: string
  promotionName: number
}
