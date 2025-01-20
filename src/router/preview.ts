export const previewRouter = [
  {
    name: 'Preview product detail Delivery/Exchange/Return/Refund',
    path: '/preview/product-detail/test-delivery-exchange-return-refund',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/preview/ProductDetailDeliveryExchangeReturnRefundInfoPage.vue'),
    meta: {
      title: 'Preview Product detail Delivery/Exchange/Return/Refund'
    }
  },
  {
    name: 'Preview product detail product code tab',
    path: '/preview/product-detail/test-product-code-tab',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/preview/ProductDetailProductCodeTabPage.vue'),
    meta: {
      title: 'Preview product detail product code tab'
    }
  },
  {
    name: 'Preview product detail discount price information modal',
    path: '/preview/product-detail/test-discount-price-information-modal',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/preview/ProductDetailDiscountPriceInformationPage.vue'),
    meta: {
      title: 'Preview product detail discount price information modal'
    }
  },
  {
    name: 'Search detailed',
    path: '/preview/search-detailed',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/preview/ProductDetailSearchPage.vue'),
    meta: {
      title: 'Search detailed'
    }
  },
  {
    name: 'Preview product detail enlarge image',
    path: '/preview/product-detail/enlarge-image',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/components/products/detail/common/ProductDetailGroupEnlargeImage.vue'),
    meta: {
      title: 'Preview product detail enlarge image'
    }
  },
  {
    name: 'Preview product detail popup',
    path: '/preview/product-detail/popup',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/preview/ProductDetailPopupPage.vue'),
    meta: {
      title: 'Preview product detail popup'
    }
  },
  {
    name: 'Preview Product Today Special Price',
    path: '/preview/product-detail/special-price',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/preview/ProductTodaySpecialPricePage.vue'),
    meta: {
      title: 'Preview Product Today Special Price'
    }
  },
  {
    name: 'Preview Ranked list of best products',
    path: '/preview/product-detail/ranked-of-list-product',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/preview/ProductRankedListOfBestPage.vue'),
    meta: {
      title: 'Preview Ranked list of best products'
    }
  },
  {
    name: 'Preview my page return shipping fee payment popup',
    path: '/preview/my-page/return-shipping-fee',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/preview/MyPageRefundModalPreview.vue'),
    meta: {
      title: 'Preview my page return shipping fee payment popup'
    }
  }
]
