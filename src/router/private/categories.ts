import { RouteRecordRaw } from 'vue-router'

export const categoriesRouter: RouteRecordRaw[] = [
  {
    path: '/category/example',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/detail/ProductDetailPage.vue'),
    name: 'category'
  },
  {
    path: '/category/product',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/categories/CategoryProductListImagePage.vue'),
    name: 'category-product',
    meta: {
      footer: {
        showNavigation: true
      },
      navigationBar: true
    }

  },
  {
    path: '/category/list-product',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/categories/CategoryListProductSpecificPage.vue'),
    name: 'category list-product'
  }
]
