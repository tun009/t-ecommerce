import { MyPageAutoLoginResponse, MyPageVersionResponse } from '@/models/services/responses/myPage/MyPageResponse'
import { BaseApi } from '../BaseApi'

class MyPageSettingApi extends BaseApi  {
  constructor(endpoint: string) {
    super(endpoint)
  }

  getAutoLogin (): Promise<MyPageAutoLoginResponse> {
    return this.get('members/me/auto-login')
  }

  getVersionCurrent (osType:string): Promise<MyPageVersionResponse> {
    return this.get(`version/current?osType=${osType}`)
  }
}

export const myPageSettingAutoLoginApi = new MyPageSettingApi('member')
export const myPageSettingVersionCurrentApi = new MyPageSettingApi('operation')
 