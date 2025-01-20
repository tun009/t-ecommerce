import { defineStore } from 'pinia'
import { AccountModel } from '@/models/services/responses/commons/AccountResponse'
import { useStorage } from '@/composables/common/useStorage'
import { ACCESS_TOKEN, AUTH_LOGIN_ROUTER, PROFILE_WELFARE_FO, REFRESH_TOKEN, storage } from '@/commons'
import { authApi } from '@/services/api/auth/AuthApi'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { axiosOAuth2Service } from '@/services/AxiosOAuth2Service'

export const useAccountStore = defineStore('account-profile', () => {
  const router = useRouter()
  const { processLink } = useBuildLink()
  const isLogin = computed(() => {
    return !!account?.value
  })
  const [account, setAccount] = useStorage<AccountModel>(PROFILE_WELFARE_FO)

  const handleSaveProfile = async () => {
    try {
      const accessTokenAxios = axiosOAuth2Service?.axiosInstance?.defaults?.headers?.common?.Authorization
      const hasTokenAxios = accessTokenAxios ?? storage.get(ACCESS_TOKEN)
      if (hasTokenAxios) {
        const response = await authApi.getProfile()
        setAccount(response.data)
      }
    } catch (error) {
      // logout()
    }
  }

  const clearToken = () => {
    axiosOAuth2Service.clearHeaderToken()
    storage.remove(ACCESS_TOKEN)
    storage.remove(REFRESH_TOKEN)
    setAccount(undefined)
  }

  const redirectToLogin = () => {
    router.push(processLink(AUTH_LOGIN_ROUTER))
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch {
      // empty
    } finally {
      clearToken()
      redirectToLogin()
    }
  }

  return {
    isLogin,
    account,
    handleSaveProfile,
    logout,
    clearToken,
    redirectToLogin
  }
})
