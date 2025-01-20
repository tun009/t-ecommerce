export interface ProductDetailInquiriesRequest {
  itemKey?: string
  answerStatusCode?: string
  myQuestionYn?: string
  pageNum: number
  rowSize: number
}

export interface ProductDetailInquiryRequest {
  itemKey: number
  sellerKey?: number
  answerStatusCode: string
  releaseYn: string
  titleName: string
  questionContents: string
}
