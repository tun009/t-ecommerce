export const myPageRouter = [
  {
    name: 'My Page Member',
    path: '/my-page/main',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/MyPageMainMemberPage.vue'),
    meta: {
      title: 'Non member order delivery inquiry',
      footer: {
        showNavigation: true
      }, 
      navigationBar: true
    }
  },
  {
    name: 'My Page Notifications',
    path: '/my-page/notifications',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/notifications/MyPageNotifications.vue'),
    meta: {
      title: 'Setting'
    }
  },
  {
    name: 'My Page Setting',
    path: '/my-page/setting',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/setting/MyPageSetting.vue'),
    meta: {
      title: 'Setting'
    }
  },
  {
    name: 'My Page Edit Member Info',
    path: '/my-page/edit-member-info',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/editMemberInfo/MyPageEditMemberInfo.vue'),
    meta: {
      title: 'My Page Edit Member Info'
    }
  },
  {
    name: 'My Page Order Detail',
    path: '/my-page/order-detail/:orderKey',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/MyPageOrderDetailPage.vue'),
    meta: {
      title: 'My Page Order Detail'
    }
  },
  {
    name: 'order delivery inquiry',
    path: '/my-page/delivery-inquiry',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/nonMemberShoppingInfo/MyPageNonMemberOrderDeliveryInquiryPage.vue'),
    meta: {
      title: 'Non member order delivery inquiry',
    }
  },
  {
    name: 'Order History Delivery Locations',
    path: '/order-history-delivery-locations',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/orderHistory/MyPageOrderHistoryPage.vue'),
    meta: {
      title: 'Order history delivery locations'
    }
  },
  {
    name: 'Cancellation/Exchange/Return Inquiry List',
    path: '/my-page/cancel-exchange-return-inquiry',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/cerInquiryList/MyPageCancelExchangeReturnInquiryListPage.vue'),
    meta: {
      title: 'Inquiry about cancellation/exchange/return',
      footer: {
        showNavigation: true
      }, 
      navigationBar: true
    }
  },
  {
    name: 'e-Coupon Order Detail',
    path: '/my-page/e-coupon-order-detail/:orderKey',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/eCouponOrderDetail/MyPageECouponOrderDetailPage.vue'),
    meta: {
      title: 'e-Coupon Order Detail'
    }
  },
  {
    name: 'Bank Welfare Points',
    path: '/my-page/bank/welfare-points',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/bank/MyPageShoppingAccountWelfarePointPage.vue'),
    meta: {
      title: 'Bank Welfare Points',
      footer: {
        showNavigation: true
      }, 
      navigationBar: true
    }
  },
  {
    name: 'Delivery Address Management',
    path: '/my-page/delivery-address',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/deliveryAddress/MyPageDeliveryAddressManagementPage.vue'),
    meta: {
      title: 'Delivery Address Management'
    }
  },
  {
    name: 'Product Review',
    path: '/my-page/products/review',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/products/review/MyPageProductReviewPage.vue'),
    meta: {
      title: 'Product Review'
    }
  },
  {
    name: 'Product Review Write',
    path: '/my-page/products/review/write',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/products/review/MyPageProductReviewWritePage.vue'),
    meta: {
      title: 'Product Review Write'
    }
  },
  {
    name: 'Product Review Edit',
    path: '/my-page/products/review/edit',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/products/review/MyPageProductReviewEditPage.vue'),
    meta: {
      title: 'Product Review Edit'
    }
  },
  {
    name: 'Product Like',
    path: '/my-page/products/like',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/products/like/MyPageProductLikePage.vue'),
    meta: {
      title: 'Product Like'
    }
  },
  {
    name: 'Product Recently',
    path: '/my-page/products/recently',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/products/recently/MyPageProductRecentlyPage.vue'),
    meta: {
      title: 'Product Recently'
    }
  },
  {
    name: 'Customer Service',
    path: '/my-page/customer',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/customer/MyPageCustomerPage.vue'),
    meta: {
      title: 'Customer Service'
    }
  },
  {
    name: 'Inquiry Write',
    path: '/my-page/inquiry/write',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/inquiry/MyPageInquiryWritePage.vue'),
    meta: {
      title: 'Inquiry Write'
    }
  },
  {
    name: 'Inquiry details',
    path: '/my-page/inquiry/details',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/inquiry/MyPageInquiryListPage.vue'),
    meta: {
      title: 'Inquiry details'
    }
  },
  {
    name: 'Notice',
    path: '/my-page/notice',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/notice/MyPageNoticeListPage.vue'),
    meta: {
      title: 'Notice'
    }
  },
  {
    name: 'Order Delivery',
    path: '/my-page/order/delivery-inquiry',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/order/MyPageOrderDeliveryInquiry.vue'),
    meta: {
      title: 'Order delivery inquiry',
      footer: {
        showNavigation: true
      }, 
      navigationBar: true
    }
  },
  {
    name: 'Exchange Request',
    path: '/my-page/inquiry/exchange-request',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/inquiry/MyPageInquiryExchangeRequest.vue'),
    meta: {
      title: 'Exchange Request'
    }
  },
  {
    name: 'My Page Apply Order Cancel',
    path: '/my-page/order-cancel',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/order/MyPageOrderCancelApply.vue'),
    meta: {
      title: 'My Page Apply Order Cancel'
    }
  },
  {
    name: 'My Page Shopping Information Refund Detail',
    path: '/my-page/shopping-information/refund/:orderKey',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/shoppingInformation/MyPageShoppingInformationRefundDetailPage.vue'),
    meta: {
      title: 'My Page Shopping Information Refund Detail',
      footer: {
        showNavigation: true
      }, 
      navigationBar: true
    }
  },
  {
    name: 'My Page Shopping Information Exchange History',
    path: '/my-page/shopping-information/exchange-history/:orderKey',
    component: () =>
      import(/* webpackChunkName: "user-chunk" */ '@/views/myPage/shoppingInformation/MyPageShoppingInformationExchangeHistoryPage.vue'),
    meta: {
      title: 'My Page Shopping Information Exchange History',
      footer: {
        showNavigation: true
      }, 
      navigationBar: true
    }
  }
]
