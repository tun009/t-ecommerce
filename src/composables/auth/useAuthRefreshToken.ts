import { AXIOS_TIMEOUT, REFRESH_TOKEN, saveToken, storage } from '@/commons'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { axiosOAuth2Service } from '@/services/AxiosOAuth2Service'
import { authApi } from '@/services/api/auth/AuthApi'
import { useAccountStore } from '@/stores/account'
import axios, { AxiosRequestConfig } from 'axios'
import { onMounted } from 'vue'
import { useHandleApiError } from '../common/useHandleApiError'
import { useLoading } from '../common/useLoading'
import { API_RESPONSE_STATUS } from '@/services/api/ApiResponseCode'

export const useAuthRefreshToken = () => {
  const { handleError } = useHandleApiError()
  const { handleSaveProfile, logout, clearToken, redirectToLogin } = useAccountStore()
  const { setLoading } = useLoading()

  /**
   * The function to setup call to server to get new one refresh token and access token when access tolen was expired
   * use it for retry call api to get data. If the refresh api has error, send a force logout event to navigation to logout
   */
  const setupRefreshToken = () => {
    const refreshToken = (originalRequestConfig: AxiosRequestConfig) => {
      console.log('called refreshToken')
      const refreshToken = storage.get(REFRESH_TOKEN)
      return new Promise((resolve, reject) => {
        authApi
          .refreshToken(refreshToken)
          .then((response) => {
            const { accessToken, refreshToken } = response.data
            saveToken({
              accessToken,
              refreshToken
            })
            axiosOAuth2Service.attachHeaderToken({
              accessToken: accessToken ?? ''
            })
            if (originalRequestConfig.headers) {
              originalRequestConfig.headers['Authorization'] = `Bearer ${accessToken}`
            }
            axiosOAuth2Service.processWaitingQueue(null, accessToken)

            resolve(axios(originalRequestConfig))
          })
          .catch((error?: any) => {
            setLoading?.(false)
            axiosOAuth2Service.clearWaitingQueue()

            if (error?.status === API_RESPONSE_STATUS.UNAUTHORIZED) {
              handleError(error?.data, error?.data?.message, () => { redirectToLogin(); clearToken() })
            } else {
              logout()
            }
            reject(error)
          })
      })
    }
    const onHandleApiError = (response?: BaseModelErrorResponse) => {
      handleError(response)
    }

    axiosOAuth2Service.setup({
      refreshTokenCallback: refreshToken,
      apiErrorCallback: onHandleApiError,
      timeout: AXIOS_TIMEOUT,
      timeoutErrorMessage: undefined
    })
  }
  onMounted(() => {
    setupRefreshToken()
    handleSaveProfile()
  })
}
