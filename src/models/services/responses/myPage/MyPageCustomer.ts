import { ListeModelResponse, BaseModelResponse } from '../BaseModelResponse'
import {
  MyPageNotice,
  MyPageCategory,
  MyPageFaqCategory,
  MyPageInquiryProductDetail,
  MyPageInquiryOrderNumber,
  MyPageInquiryMember,
  MyPageInquiryProduct,
  uploadFileResponse
} from '@/models/views/myPage/MyPageCustomerInfo'

export interface MyPageFaqResponse extends ListeModelResponse<MyPageFaqCategory> {}

export interface MyPageNoticeListResponse extends ListeModelResponse<MyPageNotice> {}

export interface MyPageCustomerCategoryResponse extends BaseModelResponse<MyPageCategory> {}

export interface MyPageInquiryProductDetailResponse extends BaseModelResponse<MyPageInquiryProductDetail> {}

export interface MyPageInquiryOrderNumberResponse extends ListeModelResponse<MyPageInquiryOrderNumber> {}

export interface MyPageInquiryMemberResponse extends ListeModelResponse<MyPageInquiryMember> {}

export interface MyPageInquiryProductResponse extends ListeModelResponse<MyPageInquiryProduct> {}

export interface MyPageInquiryFileUploadResponse extends BaseModelResponse<uploadFileResponse> {}
