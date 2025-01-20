export interface ProductDetailProductQAResponse {
  itemKey: number,
  releaseYn: string,
  titleName: string,
  questionContents: string,
  createdQuestionDate: string,
  answerStatusCode: string,
  answerTitleName: string,
  answerContents: string,
  memberInfo: ProductMemberInfoResponse,
  answeredDate: string,
  myQuestionYn: string,
}

export interface ProductMemberInfoResponse {
  key: number,
  loginId: string
}