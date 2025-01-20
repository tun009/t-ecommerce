import { HomeTermOfUseType } from '@/models/views/home/HomeTermOfUseModel'
import { BaseApi } from '../BaseApi'
import { HomeTermOfUseDetailResponse, HomeTermOfUseResponse } from '@/models/services/responses/home/HomePageUseOfTermResponse'

class HomePageTermOfUseApi extends BaseApi {
  constructor() {
    super('operation/no-auth')
  }

  getListTermOfUse(termsType: HomeTermOfUseType): Promise<HomeTermOfUseResponse> {
    return this.get('terms', { termsType: termsType })
  }

  getDetailTermOfUse(key: string | number): Promise<HomeTermOfUseDetailResponse> {
    return this.get(`terms/${key}`)
  }
}

export const homePageTermOfUseApi = new HomePageTermOfUseApi()
