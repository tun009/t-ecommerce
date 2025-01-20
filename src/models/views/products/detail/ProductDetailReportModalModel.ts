export enum ProductDetailReportType {
  ADULT_CONTENT_PORNOGRAPHIC_MATERIAL = 'ACPM',
  VIOLENCE_PROFANITY_HATE_SPEECH = 'VRHS',
  YOUTH_CHILD_ABUSE = 'YCA',
  IMPROPER_PRODUCT_SALES = 'IPS',
  ILLEGAL_GAMBLING = 'IG',
  SPAM_FLOODING = 'SF',
  DEFAMATION_PRIVACY_INVASION = 'DPI',
  COPYRIGHT_INFRINGEMENT = 'CI',
  REPORTING_BLOCKING_MALICIOUS_USERS = 'RBMU',
  INPUT_MANUALLY = 'IM'
}

export const ProductDetailListOptionReport = {
  [ProductDetailReportType.ADULT_CONTENT_PORNOGRAPHIC_MATERIAL]: '성인/음란물',
  [ProductDetailReportType.VIOLENCE_PROFANITY_HATE_SPEECH]: '폭력/욕설/혐오물',
  [ProductDetailReportType.YOUTH_CHILD_ABUSE]: '청소년/아동학대',
  [ProductDetailReportType.IMPROPER_PRODUCT_SALES]: '부적절한 상품판매',
  [ProductDetailReportType.ILLEGAL_GAMBLING]: '도박/불법',
  [ProductDetailReportType.SPAM_FLOODING]: '스팸/도배',
  [ProductDetailReportType.DEFAMATION_PRIVACY_INVASION]: '명예훼손/개인정보침해',
  [ProductDetailReportType.COPYRIGHT_INFRINGEMENT]: '저작권침해',
  [ProductDetailReportType.REPORTING_BLOCKING_MALICIOUS_USERS]: '악의적 작성자 신고/차단',
  [ProductDetailReportType.INPUT_MANUALLY]: '직접입력'
}

export interface ProductDetailReportModaRequest {
  orderProductReviewDeclareReasonType: ProductDetailReportType
  declareContents: string
}
