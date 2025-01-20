<script lang="ts" setup>
import { ProductItemImage, ProductBannerImage, ProductNews1, ProductDetail3 } from '@/assets/images'
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareCarouselBanner from '@/components/uikit/carousel/WelfareCarouselBanner.vue'
import WelfareCarouselProduct from '@/components/uikit/carousel/WelfareCarouselProduct.vue'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import GroupBannerProduct from '@/components/widgets/GroupBannerProduct.vue'
import GroupProductNews from '@/components/widgets/GroupProductNews.vue'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
const productSm: WelfareUnitProductModel = {
  name: '[솔트레인] 극세모 칫솔  4개입 2종 (택1)',
  price: 99999999,
  pricePromotion: 99999999,
  percent: 99,
  thumbnailProduct: ProductItemImage
}
const productLg: WelfareUnitProductModel = {
  ...productSm,
  name: '프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP9 ...',
  thumbnailProduct: ProductDetail3,
  benefits: ['무료배송', '무이자']
}
const productNews = [
  {
    name: '디올 new 2023 홀리데이 컬렉션',
    thumbnail: ProductNews1
  },
  {
    name: '에스티로더 2023 홀리데이 컬렉션 리미티드',
    thumbnail: ProductNews1
  },
  {
    name: '디올 new 2023 홀리데이 컬렉션',
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
  <WelfareContainer>
    <div class="wf_grid wf_grid-cols-1 wf-space-y-30">
      <div class="wf_width-343">
        <WelfareProductItem :is-heart="false" :is-price="true" :is-cart="false" :is-buy="true" :data="productLg" />
      </div>
      <div class="wf_width-375">
        <WelfareCarouselProduct
          :banner-image="ProductBannerImage"
          title="빠른 배송! 오늘 주문하면 내일도착"
          path-redirect="#"
          :product-list="[productSm, productSm, productSm]"
        />
      </div>
      <div class="wf_width-375">
        <GroupBannerProduct />
      </div>

      <div class="wf_width-375">
        <WelfareCarouselBanner />
      </div>
      <div class="wf_width-343">
        <GroupProductNews :data="productNews" />
      </div>
    </div>
  </WelfareContainer>
</template>
