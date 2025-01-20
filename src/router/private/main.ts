export const mainRouter = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/home/HomeWrapperPage.vue'),
    meta: {
      requiresAuth: true,
      headerTitle: 'HomePage',
      footer: {
        showNavigation: true
      },
      navigationBar: true
    }
  },
  {
    path: '/main/category-menu',
    name: 'Category menu',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/home/HomeCategoryMenuPage.vue'),
    meta: {
      isRequiresAuth: true,
      headerTitle: 'Category menu'
    }
  },
  {
    path: '/main/term-of-use',
    name: 'TermOfUse',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/home/HomeTermOfUsePage.vue'),
    meta: {
      isRequiresAuth: false,
      headerTitle: 'TermOfUse',
      footer: {
        showNavigation: false
      }
    }
  },
  {
    path: '/main/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/home/HomePrivacyPolicyPage.vue'),
    meta: {
      isRequiresAuth: false,
      headerTitle: 'PrivacyPolicy',
      footer: {
        showNavigation: false
      }
    }
  }
]
