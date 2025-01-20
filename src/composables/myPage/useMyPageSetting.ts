import { SettingAutoLoginType } from '@/models/views/myPage/MyPageSetting'
import { myPageSettingAutoLoginApi, myPageSettingVersionCurrentApi } from "@/services/api/myPage/MyPageSettingApi"
import { useAccountStore } from '@/stores/account'
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { getOS, isAndroid, isIos } from '@/commons'

export const useMyPageSetting = () => {
  const userAgent = getOS()
  const checkUserAgent = isAndroid || isIos
  const notificationEnabled = ref(false)

  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)
  
  const settingData = reactive({
    autoLogin: false,
    appVersion: ''
  })

  const toggleNotification = () => {
    console.log('알림 설정 변경됨:', notificationEnabled.value);
  };


  const checkAutoLogin = async () => {
    try {
      const { data } = await myPageSettingAutoLoginApi.getAutoLogin()
      const { autoLogin } = data

      settingData.autoLogin = autoLogin 
    } catch (error) {
      console.error(error)
    }
  }

  const checkVersion = async () => {
    const osType = userAgent == 'iOS' ? 'IOS' : 'AOS'
    try {
      const { data } = await myPageSettingVersionCurrentApi.getVersionCurrent(osType)
      const { appVersion } = data

      settingData.appVersion = appVersion 
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(async () => {
    /* App 일때만 실행 */
    checkUserAgent && await checkAutoLogin()
    checkUserAgent && await checkVersion()
  })

  return {    
    account,
    settingData,
    accountStore,
    checkUserAgent,
    notificationEnabled,
    toggleNotification
  }
}
