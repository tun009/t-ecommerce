import { EXCLUDE_SCROLL_TO_TOP_PAGE } from '@/commons'
import router from '@/router'

export const useScrollToTopPage = () => {
  router.beforeEach((to, from, next) => {
    if (EXCLUDE_SCROLL_TO_TOP_PAGE.includes(to.path) && to.path === from.path) {
      next()
      return
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
    next()
  })
}
