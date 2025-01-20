import { RouteRecordRaw } from 'vue-router'

export const exhibitionRouter: RouteRecordRaw[] = [
  {
    path: '/exhibition-detail',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/exhibition/ExhibitionDetailGeneral.vue'),
    name: 'exhibition-detail'
  }
]
