import { ACCESS_TOKEN, AUTH_LOGIN_ROUTER, HOMEPAGE_ROUTER, REDIRECT_UN_AUTH_ROUTE, storage } from '@/commons'
import router from '@/router'
import { axiosOAuth2Service } from '@/services/AxiosOAuth2Service'
import { useBuildLink } from './useBuildLink'

export const useCheckLogin = () => {
  const { processLink } = useBuildLink()
  router.beforeEach(async (to, from, next) => {
    const accessTokenAxios = axiosOAuth2Service?.axiosInstance?.defaults?.headers?.common?.Authorization
    const hasTokenAxios = accessTokenAxios ?? storage.get(ACCESS_TOKEN)
    const backTo = storage.get(REDIRECT_UN_AUTH_ROUTE)
    const language = to.query.lang as string
    const getRoute = (route: string, lang: string) => {
      return lang ? `${route}?lang=${lang}` : processLink(route)
    }

    if (!hasTokenAxios && to?.path !== AUTH_LOGIN_ROUTER && to?.meta?.isRequiresAuth) {
      storage.set(REDIRECT_UN_AUTH_ROUTE, to?.fullPath)
      next(getRoute(AUTH_LOGIN_ROUTER, language))
    } else if (to?.path === AUTH_LOGIN_ROUTER && !to?.meta?.isRequiresAuth && hasTokenAxios) {
      next(getRoute(HOMEPAGE_ROUTER, language))
    } else if (to?.path === AUTH_LOGIN_ROUTER && !hasTokenAxios) {
      !backTo && storage.set(REDIRECT_UN_AUTH_ROUTE, from?.fullPath)
      next()
    } else if (to?.path === HOMEPAGE_ROUTER && backTo && hasTokenAxios) {
      storage.remove(REDIRECT_UN_AUTH_ROUTE)
      next(getRoute(backTo ?? HOMEPAGE_ROUTER, language))
    } else {
      next()
    }
  })
}
