import { RouteRecordRaw } from 'vue-router'

export const searchRouter: RouteRecordRaw[] = [
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/search/SearchKeywordPage.vue'),
    name: 'search'
  },
  {
    path: '/search/result',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/search/SearchResultPage.vue'),
    name: 'search result',
    meta: {
      footer: {
        showNavigation: true
      }, 
      navigationBar: true
    }
  }
]
