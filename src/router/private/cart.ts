export const cartRouter = [
    {
        name: 'cart',
        path: '/cart',
        component: () => import(/* webpackChunkName: "cart-chunk" */ '@/views/cart/CartPage.vue'),
        meta: {
          footer: {
            showNavigation: true
          }
        }
      },
]
