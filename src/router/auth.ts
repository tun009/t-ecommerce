export const authRouter = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
    children: [
      {
        name: 'login',
        path: '',
        component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/auth/login/AuthLoginPage.vue'),
        meta: {
          headerTitle: 'Login'
        }
      },
      {
        name: 'search company',
        path: 'search-company',
        component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/auth/login/AuthSearchCompanyPage.vue'),
        meta: {
          headerTitle: 'Search company'
        }
      }
    ],
    meta: {
      footer: {
        showNavigation: true
      }
    }
  },
  {
    name: 'auth wrap',
    path: '/auth',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
    children: [
      {
        name: 'find id',
        path: 'find-id',
        component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/auth/findId/AuthLoginFindIdPage.vue'),
        meta: {
          headerTitle: 'Find id'
        }
      },
      {
        name: 'result find id',
        path: 'result-find-id',
        component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/auth/login/AuthResultFindIdPage.vue'),
        meta: {
          headerTitle: 'Result find id'
        }
      },
      {
        name: 'resetPassword',
        path: 'reset-password',
        component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/auth/resetPassword/AuthResetPasswordPage.vue'),
        meta: {
          headerTitle: 'Reset Password',
          navigationBar: true
        }
      }
    ],
    meta: {
      footer: {
        showNavigation: false
      }
    }
  }
]
