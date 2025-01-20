export const WELFARE_LIST_CART_KEY = 'FO_WELFARE_LIST_CART_KEY'
export const WELFARE_SAVE_ID = 'FO_SAVE_ID'
export const ACCESS_TOKEN = 'FO_ACCESS_TOKEN'
export const REFRESH_TOKEN = 'FO_REFRESH_TOKEN'
export const PROFILE_WELFARE_FO = 'FO_PROFILE_WELFARE'
export const SAVE_SEARCH_FO = 'FO_SAVE_SEARCH'
export const RECENTLY_SEARCH_FO = 'FO_RECENTLY_SEARCH'
export const FO_SHOW_MAIN_POPUP_TIME = 'FO_SHOW_MAIN_POPUP_TIME'
export const REDIRECT_UN_AUTH_ROUTE = 'FO_REDIRECT_UN_AUTH_ROUTE'
export const FO_CURRENT_ACCOUNT_ID = 'FO_CURRENT_ACCOUNT_ID'
export const FO_BANK_PAYMENT = 'FO_BANK_PAYMENT'

export const storage = {
  get(key: string, type = 'local') {
    const storage = this.getStorage(type)
    return this.getItem(key, storage)
  },

  set(key: string, value: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.setItem(key, JSON.stringify(value))
  },

  remove(key: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.removeItem(key)
  },

  getItem(key: string, storage: any) {
    if (!key || !storage) return null
    const value = storage.getItem(key)
    if (!value) {
      return null
    }
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },

  getStorage(type = 'local') {
    switch (type) {
      case 'session':
        return sessionStorage
      case 'local':
        return localStorage
      default:
        return null
    }
  }
}

export const saveToken = (params: { accessToken?: string; refreshToken?: string }) => {
  storage.set(ACCESS_TOKEN, params.accessToken ?? '')
  storage.set(REFRESH_TOKEN, params.refreshToken ?? '')
}
