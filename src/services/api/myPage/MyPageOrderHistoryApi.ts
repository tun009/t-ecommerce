import { BaseApi } from '../BaseApi'
import { MyPageOrderHistoryResponse } from '@/models/services/responses/myPage/MyPageOrderHistoryResponse'
import { dataOrderHistoryPage } from '@/assets/mockData/myPage/mock-data-mypage-page'

class MyPageOrderHistoryApi extends BaseApi {
  getListOrderHistory() {
    return new Promise<MyPageOrderHistoryResponse>((resolve) => {
      setTimeout(() => {
        const items = dataOrderHistoryPage.productCustomer
        resolve({
          data: items
        })
      })
    })
  }
}

export const myPageOrderHistoryApi = new MyPageOrderHistoryApi()
