import { HomeBottomBannerResponse } from '@/models/services/responses/home/HomeBottomBannerResponse'
import { BaseApi } from '../BaseApi'

class HomePageBottomBannerApi extends BaseApi {
  constructor() {
    super('shop')
  }

  getBanner(): Promise<HomeBottomBannerResponse> {
    return this.get(`display/popup/list`)
  }
}

export const homePageBottomBannerApi = new HomePageBottomBannerApi()
