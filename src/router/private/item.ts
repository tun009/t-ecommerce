import { RouteRecordRaw } from 'vue-router'

export const itemRouter: RouteRecordRaw[] = [
  {
    path: '/product-detail',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/detail/ProductDetailPage.vue'),
    name: 'product',
    meta: {
      footer: {
        showNavigation: true
      }
    }
  }
]
