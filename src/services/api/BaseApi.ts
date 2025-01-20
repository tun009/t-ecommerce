import { axiosOAuth2Service } from '../AxiosOAuth2Service'
import qs from 'qs'
import { AxiosError, AxiosResponse } from 'axios'
import { AppConfig } from '@/commons'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

export class BaseApi {
  apiHostUrl = `${AppConfig.host}`
  baseUri?: string

  constructor(baseUri?: string) {
    this.baseUri = baseUri
  }

  createDefaultHeader(header: any = {}): Record<string, string> {
    return {
      ...header
      // 'Accept-Language': currentLanguge === 'en' ? 'en-US' : currentLanguge ?? 'vi',
      // 'Accept-Language': 'en-US'
    }
  }

  async get(uri: string, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.get(url, {
        params,
        headers: this.createDefaultHeader(header)
      })
      .then((response) => this.onSuccess(response))
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async post(uri: string, data: any = {}, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.post(url, data, {
        params,
        headers: this.createDefaultHeader(header)
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async postMultipart(uri: string, data: any = {}, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.post(url, data, {
        params,
        headers: {
          ...{ 'Content-Type': 'multipart/form-data' },
          ...this.createDefaultHeader(header)
        }
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async postUrlEncoded(
    uri: string,
    data: any = {},
    isShowErrorModal: boolean = true,
    noAddPrefix = false,
    onErrorHandler?: (error?: object) => void
  ) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.post(url, qs.stringify(data), {
        headers: {
          ...{ 'content-type': 'application/x-www-form-urlencoded' },
          ...this.createDefaultHeader()
        }
      })
      .then((response: AxiosResponse) => response?.data)
      .catch((error: AxiosError) => {
        onErrorHandler?.(error)
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async put(uri: string, data: any = {}, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.put(url, data, {
        params,
        headers: this.createDefaultHeader(header)
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async delete(uri: string, data: any = {}, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()?.({
        method: 'delete',
        headers: this.createDefaultHeader(header),
        url,
        data,
        params
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  createUrl(uri: string, noPrefix = false) {
    const url = noPrefix ? uri : `${this.apiHostUrl}/${this.baseUri}/${uri}`
    return url
  }

  onSuccess = (response: any) => {
    let ret = null
    if (response?.status === 200) {
      ret = response.data
    }
    return ret
  }

  onFailed = (error: any, isShowErrorModal: boolean = true) => {
    // console.log('error', error)
    // if (error.status === 500 || error.status === 408) {
    //   router?.push(ERROR_ROUTER)
    // }

    if (isShowErrorModal) {
      let result: BaseModelErrorResponse | undefined
      if (typeof error?.data === 'string') {
        result = {
          message: error?.data
        }
      } else {
        result = error?.data as AxiosError
      }
      axiosOAuth2Service.fireResponseError(result)
    }
    return Promise.reject(error)
  }
}
