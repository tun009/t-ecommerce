import { createRouter, createWebHistory } from 'vue-router'
import { HTMLListRoutes, UIKitRoutes } from './uikit'
import { authRouter } from './auth'
import { previewRouter } from './preview'
import { privateRouter } from './private'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Preview UI_KIT & pages',
      path: '/html-list',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: HTMLListRoutes
    },
    {
      name: 'Preview UI_KIT',
      path: '/ui-kit',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: UIKitRoutes
    },
    ...authRouter,
    ...previewRouter,
    {
      path: '/',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: privateRouter,
      meta: {
        isRequiresAuth: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'Error',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/ErrorPage.vue')
    },
    {
      path: '/system-check',
      name: 'SystemCheck',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/SystemCheckPage.vue')
    },
    {
      path: '/move-to-app',
      name: 'MoveToApp',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/MoveToAppPage.vue')
    }
  ]
})

export default router
