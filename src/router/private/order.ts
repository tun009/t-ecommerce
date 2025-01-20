export const orderRouter = [
  {
    name: 'Product Order',
    path: '/order-product',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/order/OrderProductPage.vue'),
    meta: {
      title: 'Order',
      footer: {
        showNavigation: true
      }, 
    }
  },
  {
    name: 'Order coupon completed',
    path: '/order-coupon-completed/:id',
    component: () => import(/* webpackChunkName: "order" */ '@/views/order/OrderCouponCompletedPage.vue'),
    meta: {
      headerTitle: 'Order coupon completed',
      footer: {
        showNavigation: true
      }, 
      navigationBar: true
    }
  },
  {
    name: 'orderCompletedDelivery',
    path: '/order-completed-delivery/:id',
    component: () => import(/* webpackChunkName: "order" */ '@/views/order/OrderCompletedDeliveryPage.vue'),
    meta: {
      headerTitle: 'Order completed delivery',
      footer: {
        showNavigation: true
      }, 
      navigationBar: true
    }
  },
  {
    name: 'Product Order Coupon',
    path: '/order-product-coupon-e/:id',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/order/OrderProductCouponElectronicPage.vue'),
    meta: {
      title: 'Order',
      footer: {
        showNavigation: true
      }, 
    }
  },
  {
    name: 'Product Order Not Member',
    path: '/order-product/:id',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/order/OrderProductNotMemberPage.vue'),
    meta: {
      title: 'Order'
    }
  },
  {
    name: 'Product Order Certification',
    path: '/order/certification',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/order/OrderCertificationCellMobilePage.vue'),
    meta: {
      title: 'Order Certification'
    }
  }
]
