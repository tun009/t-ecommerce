<script lang="ts" setup>
import { ProductItemImage, ProductBannerImage, ProductNews1, ProductDetail3 } from '@/assets/images'
import WelfareCarouselBanner from '@/components/uikit/carousel/WelfareCarouselBanner.vue'
import WelfareCarouselProduct from '@/components/uikit/carousel/WelfareCarouselProduct.vue'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import GroupBannerProduct from '@/components/widgets/GroupBannerProduct.vue'
import GroupProductNews from '@/components/widgets/GroupProductNews.vue'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
const productSm: WelfareUnitProductModel = {
  name: '프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP9 ...',
  price: 99999999,
  pricePromotion: 99999999,
  percent: 99,
  thumbnailProduct: ProductItemImage
}
const productLg: WelfareUnitProductModel = {
  ...productSm,
  benefits: ['무료배송', '무이자'],
  thumbnailProduct: ProductDetail3
}
const productNews = [
  {
    name: '에스티로더 2023 홀리데이 컬렉션 리미티드',
    thumbnail: ProductNews1
  },
  {
    name: '에스티로더 2023 홀리데이 컬렉션 리미티드',
    thumbnail: ProductNews1
  },
  {
    name: '에스티로더 2023 홀리데이 컬렉션 리미티드',
    thumbnail: ProductNews1
  },
  {
    name: '에스티로더 2023 홀리데이 컬렉션 리미티드',
    thumbnail: ProductNews1
  },
  {
    name: '에스티로더 2023 홀리데이 컬렉션 리미티드',
    thumbnail: ProductNews1
  }
]
</script>
<template>
  <div>
    <div class="wf-px-16 wf-mt-40">
      <WelfareProductItem :is-heart="false" :is-price="true" :is-cart="false" :is-buy="true" :data="productLg" />
    </div>
    <div class="wf-mt-60">
      <GroupBannerProduct />
    </div>
    <WelfareCarouselProduct
      class="wf-mt-60"
      :banner-image="ProductBannerImage"
      title="빠른 배송! 오늘 주문하면 내일도착"
      path-redirect="#"
      :product-list="[productSm, productSm, productSm]"
    />
    <div class="wf-px-16 wf-mb-20 wf-mt-60">
      <GroupProductNews :data="productNews" />
    </div>

    <div class="wf-mt-60 wf-mb-30">
      <WelfareCarouselBanner />
    </div>
  </div>
</template>
