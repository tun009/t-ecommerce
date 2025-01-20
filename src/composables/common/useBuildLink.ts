import { RouteLocationNamedRaw, RouteLocationPathRaw, RouteLocationRaw, useRoute } from 'vue-router'

/**
 * The compose to handle build link base on current localization on query params
 */
export const useBuildLink = () => {
  const router = useRoute()

  /**
   * The function build link base on current localization on query params
   * @param link : the link want to redirect
   * @returns : the new link include localization on query params if need attach
   */
  const processLink = (link: RouteLocationRaw) => {
    return typeof link === 'string' ? processUrl(link) : processQuery(link)
  }

  const processUrl = (link: string) => {
    const langQuery = 'lang='
    const lang = router?.query?.lang
    if (!link.includes(`?${langQuery}`) && !link.includes(`&${langQuery}`) && lang) {
      return `${link}${link.includes('?') ? '&' : '?'}${langQuery}${lang}`
    } else {
      return link
    }
  }

  const processQuery = (link: RouteLocationPathRaw | RouteLocationNamedRaw) => {
    const lang = router?.query?.lang
    if (link.query?.lang && lang) {
      link.query.lang = lang
    }
    return link
  }

  return { processLink }
}
