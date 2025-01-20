import { BaseApi } from '../BaseApi'
import {
  MyPageNoticeListResponse,
  MyPageCustomerCategoryResponse,
  MyPageFaqResponse,
  MyPageInquiryProductDetailResponse,
  MyPageInquiryOrderNumberResponse,
  MyPageInquiryMemberResponse,
  MyPageInquiryProductResponse,
  MyPageInquiryFileUploadResponse
} from '@/models/services/responses/myPage/MyPageCustomer'
import { InquiryDataRequest } from '@/models/services/requests/myPage/MyPageCustomerRequest'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { OrderClaimsParams } from '@/models/services/requests/order/OrderParamsRequest'

class CustomerApi extends BaseApi {
  constructor() {
    super('operation')
  }

  // 카테고리별 FAQ 목록 조회 (FO_MC_CS011001)
  getWelfareFaQ(page = 1, rowSize = 10, faqType = '', searchContent = ''): Promise<MyPageFaqResponse> {
    return this.get(`fo/faq?pageNum=${page}&rowSize=${rowSize}&faqType=${faqType}&searchContent=${searchContent}`)
  }

  // FAQ 카테고리 목록 조회 (FO_MC_CS001000)
  getWelfareCategory(): Promise<MyPageCustomerCategoryResponse> {
    return this.get(`fo/faq/categories`)
  }

  // 고객센터 공지사항 목록 조회 (FO_MC_CS001000)
  getWelfareNoticeList(page = 1, rowSize = 10): Promise<MyPageNoticeListResponse> {
    return this.get(`notice?pageNum=${page}&rowSize=${rowSize}`)
  }

  // 1:1 문의 목록 조회 (FO_MC_MY053000)
  getWelfareInquiryMember(pageNum = 1, rowSize = 10): Promise<MyPageInquiryMemberResponse> {
    return this.get(`one-on-one-inquiries?rowSize=${rowSize}&pageNum=${pageNum}`)
  }

  // 상품 문의 내역 목록 조회 (FO_MC_MY055000)
  getWelfareInquiryPorduct(pageNum = 1, rowSize = 10): Promise<MyPageInquiryProductResponse> {
    return this.get(`items/inquiries?rowSize=${rowSize}&pageNum=${pageNum}`)
  }

  // 1:1 문의 등록 (FO_MC_CS022002P)
  getWelfareInquiryRegister(data: InquiryDataRequest): Promise<BaseModelErrorResponse> {
    const params = {
      inquiryType: data.inquiryType,
      orderKey: data.orderKey,
      orderDeliveryKey: data.orderDeliveryKey,
      receiverProductOrderKey: data.receiverProductOrderKey,
      productKey: data.productKey,
      title: data.title,
      contents: data.contents,
      inquirerPhoneNum: data.inquirerPhoneNum,
      inquirerEmail: data.inquirerEmail,
      smsReceiveYn: data.smsReceiveYn,
      emailReceiveYn: data.emailReceiveYn,
      attachmentFileList: data.attachmentFileList
    }
    return this.post(`one-on-one-inquiries`, params)
  }

  // 1:1문의 첨부파일 업로드 (FO_MC_CS021010P)
  uploadInquiriesFile(params: any): Promise<MyPageInquiryFileUploadResponse> {
    return this.postMultipart('one-on-one-inquiries/file:upload', params)
  }

  // 1:1문의 첨부파일 다운로드 (FO_MC_CS021010P)
  downloadInquiriesFile(filename: string): Promise<any> {
    return this.get(`one-on-one-inquiries/files/${filename}`)
  }
}

class InquiryProductApi extends BaseApi {
  constructor() {
    super('shop')
  }

  // 상품상세 조회 (FO_MC_IT011001)
  getWelfareInquiryProductDetail(productCode = ''): Promise<MyPageInquiryProductDetailResponse> {
    return this.get(`item/item-detail?productCode=${productCode}`)
  }
}

class InquiryOrderApi extends BaseApi {
  constructor() {
    super('order')
  }

  // 주문/배송조회 (FO_MC_MY011001)
  getWelfareInquiryOrderNumber(params: OrderClaimsParams): Promise<MyPageInquiryOrderNumberResponse> {
    return this.get('orders', params)
  }
}

export const myPageCustomer = new CustomerApi()
export const myPageInquiryProduct = new InquiryProductApi()
export const myPageInquiryOrder = new InquiryOrderApi()
