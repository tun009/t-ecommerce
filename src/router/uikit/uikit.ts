export const UIKitRoutes = [
  // add route for uikit there
  {
    name: 'font',
    path: 'font',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TextView.vue'),
    meta: { title: 'UIKit - Font' }
  },
  {
    name: 'color',
    path: 'color',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/ColorView.vue'),
    meta: { title: 'UIKit - Color' }
  },
  {
    name: 'unit',
    path: 'unit',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/UnitView.vue'),
    meta: { title: 'UIKit - Unit' }
  },
  {
    name: 'tab',
    path: 'tab',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TabView.vue'),
    meta: { title: 'UIKit - Tab' }
  },
  {
    name: 'icons',
    path: 'icons',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/IconView.vue'),
    meta: { title: 'UIKit - Icons' }
  },
  {
    name: 'tooltip',
    path: 'tooltip',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TooltipView.vue'),
    meta: { title: 'UIKit - Tooltip' }
  },
  {
    name: 'score',
    path: 'score',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/ScoreView.vue'),
    meta: { title: 'UIKit - Score' }
  },
  {
    name: 'radio',
    path: 'radio',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/RadioView.vue'),
    meta: { title: 'UIKit - Radio' }
  },
  {
    name: 'checkbox',
    path: 'checkbox',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/CheckboxView.vue'),
    meta: { title: 'UIKit - Checkbox' }
  },
  {
    name: 'dropdown',
    path: 'dropdown',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/DropdownView.vue'),
    meta: { title: 'UIKit - Dropdown' }
  },
  {
    name: 'button',
    path: 'button',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/ButtonView.vue'),
    meta: { title: 'UIKit - Button' }
  },
  {
    name: 'title-text',
    path: 'title-text',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TitleTextView.vue'),
    meta: { title: 'UIKit - Title Text' }
  },
  {
    name: 'loader',
    path: 'loader',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/LoaderView.vue'),
    meta: { title: 'UIKit - Loader' }
  },
  {
    name: 'toggle',
    path: 'toggle',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TooltipView.vue'),
    meta: { title: 'UIKit - Toggle' }
  },
  {
    name: 'input',
    path: 'input',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/InputView.vue'),
    meta: { title: 'UIKit - Input' }
  },
  {
    name: 'popup',
    path: 'popup',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/PopupView.vue'),
    meta: { title: 'UIKit - Popup' }
  },
  {
    name: 'modal popup',
    path: 'modal-popup',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/ModalPopupView.vue'),
    meta: { title: 'UIKit - Modal Popup' }
  },
  {
    name: 'alert',
    path: 'alert',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/AlertView.vue'),
    meta: { title: 'UIKit - Alert' }
  },
  {
    name: 'form',
    path: 'form',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/FormView.vue'),
    meta: { title: 'UIKit - Form' }
  },
  {
    name: 'media control',
    path: 'media-control',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/MediaControlView.vue'),
    meta: { title: 'UIKit - Media Control' }
  },
  {
    name: 'navigation',
    path: 'navigation',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/NavigationView.vue'),
    meta: { title: 'UIKit - Navigation' }
  },
  {
    name: 'product detail',
    path: 'product-detail',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/ProductDetailView.vue'),
    meta: { title: 'UIKit - ProductDetail' }
  },
  {
    name: 'unit 2',
    path: 'unit-2',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/UnitSecondView.vue'),
    meta: { title: 'UIKit - UnitSecond' }
  },
  {
    name: 'unit list',
    path: 'unit-list',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/UnitListView.vue'),
    meta: { title: 'UIKit - UnitList' }
  },
  {
    name: 'carousel',
    path: 'carousel',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/CarouselView.vue'),
    meta: { title: 'UIKit - Carousel' }
  },
  {
    name: 'localization',
    path: 'localization',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/ReviewLocalizationView.vue'),
    meta: { title: 'UIKit - ReviewLocalization' }
  },
  {
    name: 'main-unit',
    path: 'main-unit',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/MainUnitView.vue'),
    meta: { title: 'UIKit - Main Unit' }
  },
  {
    name: 'banner',
    path: 'banner',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/BannerView.vue'),
    meta: { title: 'UIKit - Banner' }
  },
  {
    name: 'banner-carousel',
    path: 'banner-carousel',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/BannerCarouselView.vue'),
    meta: { title: 'UIKit - Main Unit' }
  },
  {
    name: 'UI Kit For Test',
    path: 'test',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TestView.vue'),
    meta: {
      headerTitle: 'UI Kit Test'
    }
  }
]
