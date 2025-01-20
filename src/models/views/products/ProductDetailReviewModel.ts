import { YesNoEnum } from '@/models/common'

export interface ProductDetailReviewModel {
  star: number
  email: string
  title: string
  subTitle: string
  des: string
  date: string
  medias: string[]
  amountLike: number
  isLike?: boolean
}

export interface ProductDetailAttachFileModel {
  attachfileType: string
  imageRepresentativeYn: YesNoEnum
  attachfilePathName: string
  attachfileName: string
  attachfileOriginName: string
  attachfileAltName: string
  attachfileUrl: string
}

export interface ProductDetailModel {
  productCode: string
  productName: string
  productOriginName: string
  salePrice: number
  deliveryFee: number
  productDiscountAmount: number
  productDetailHtmlContents: string
  inventoryQuantity: number
  optionUseYn: YesNoEnum
  optionType: ProductDetailOptionTypeEnum
  productClassificationCode: ProductDetailClassificationEnum
  productClassificationName: string
  sclassOptionUseYn: YesNoEnum
  lastProductSalesStatusCode: ProductDetailSaleStatus
  productDiscountRate: number
  immediatelyProductDiscountAmount: number
  foAttachFileList: ProductDetailAttachFileModel[]
  productLikeYn?: boolean
}

export enum ProductDetailSaleStatus {
  onSale = '01',
  suspended = '02',
  temporarilyOutOfStock = '03',
  outOfStock = '04',
  endSale = '05'
}

export const getTextButtonBuyData = (typeOption: ProductDetailOptionTypeEnum) => ({
  [ProductDetailSaleStatus.onSale]: typeOption !== ProductDetailOptionTypeEnum.multiOptionWidthDate ? '구매하기' : '예약하기',
  [ProductDetailSaleStatus.suspended]: '일시품절',
  [ProductDetailSaleStatus.temporarilyOutOfStock]: '일시품절',
  [ProductDetailSaleStatus.outOfStock]: '일시품절',
  [ProductDetailSaleStatus.endSale]: '판매종료'
})

export const dataProductDetailSaleStatus = {
  [ProductDetailSaleStatus.onSale]: '판매중',
  [ProductDetailSaleStatus.suspended]: '판매 일시중지',
  [ProductDetailSaleStatus.temporarilyOutOfStock]: '일시품절',
  [ProductDetailSaleStatus.outOfStock]: '품절',
  [ProductDetailSaleStatus.endSale]: '판매 종료'
}

export enum ProductDetailClassificationEnum {
  ticket = '01',
  delivery = '02'
}

export enum ProductDetailOptionTypeEnum {
  singleOption = '01',
  multiOption = '02',
  multiOptionWidthDate = '03'
}

export interface ProductDetailChooseOptionModalProps {
  useOptionType: YesNoEnum
  name?: string
  productKey: number
  isHeart: boolean
  price: number
  totalQuantity: number
  optionUseYn: YesNoEnum
  optionType: ProductDetailOptionTypeEnum
  productClassificationCode: ProductDetailClassificationEnum
  textButtonBuy: string
  isDisabledButtonBuy: boolean
  hideHeartBtn?: boolean
  hideBuyBtn?: boolean
  isEditInputQuantity?: boolean
}

export interface ProductDetailChooseOptionModalEmits {
  (e: 'onHeart'): void
  (e: 'onClose'): void
}

export interface ProductDetailOptionDepthData {
  optionKey?: number
  optionPrice: number
  optionInventoryQuantity: number
  optionSaleStatus: ProductDetailSaleStatus
  optionSaleStatusName: string
}

export interface ProductDetailOptionDepth1 extends ProductDetailOptionDepthData {
  option1DepthName: string
}

export interface ProductDetailOptionDepth2 extends ProductDetailOptionDepthData {
  option2DepthName: string
}

export interface ProductDetailOptionDepth3 extends ProductDetailOptionDepthData {
  option3DepthName: string
}

export interface ProductDetailChooseSelectData<T> {
  options: T[]
  value: T | undefined
}

export interface ProductDetailDiscountModel {
  name: string
  data: {
    name: string
    price: number
  }[]
}

export interface ProductDetailLikeModel {
  productLikeYn: YesNoEnum
}
export interface ProductCountTabModel {
  countTabReview: string
  countTabQuestion: string
}
