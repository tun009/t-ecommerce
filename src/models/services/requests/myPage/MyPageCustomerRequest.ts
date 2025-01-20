export interface InquiryDataRequest {
  inquiryType: string
  orderKey?: number
  productKey?: number
  orderDeliveryKey?: number
  receiverProductOrderKey?: number
  title: string
  contents: string
  inquirerPhoneNum: string
  inquirerEmail: string
  smsReceiveYn: string
  emailReceiveYn: string
  attachmentFileList: string[]
}
