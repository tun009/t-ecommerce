<script setup lang="ts">
import { ProductItemImage, ProductRelateImage, ProductDetail2 } from '@/assets/images'
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import WelfareProductItemSmall from '@/components/uikit/unit/WelfareProductItemSmall.vue'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
const productSm: WelfareUnitProductModel = {
  name: '프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP 90ML (파우치 증정)프라다 패러독스 EDP9 ...',
  price: 99999999,
  pricePromotion: 99999999,
  percent: 99,
  thumbnailProduct: ProductDetail2
}
const productLg: WelfareUnitProductModel = {
  ...productSm,
  buyerCount: 9999,
  thumbnailBo: ProductRelateImage,
  thumbnailProduct: ProductItemImage,
  buyers: [
    'https://th.bing.com/th/id/OIP.RELZxvt4gKN2lfN6WRyqPAHaHa?w=512&h=512&rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.RELZxvt4gKN2lfN6WRyqPAHaHa?w=512&h=512&rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.RELZxvt4gKN2lfN6WRyqPAHaHa?w=512&h=512&rs=1&pid=ImgDetMain'
  ],
  benefits: ['무료배송', '무이자'],
  titleDayWarning: '종료 3일전'
}
const productMd: WelfareUnitProductModel = {
  ...productSm,
  name: '[솔트레인] 극세모 칫솔 4개입 2종 (택1)(2줄)...',
  benefits: ['무료배송', '무이자'],
  rateStar: 4,
  rateCountStar: 999
}
const product3: WelfareUnitProductModel = {
  ...productSm,
  name: '[솔트레인] 극세모칫솔</br> 4개입 2종 (택1)',
  benefits: ['무료배송', '무이자'],
  rateStar: 4,
  rateCountStar: 999
}
const product4: WelfareUnitProductModel = {
  ...productSm,
  name: '[솔트레인] 극세모 칫솔 4개입 2종 (택1)'
}
</script>

<template>
  <WelfareContainer>
    <div class="wf-unit-container wf_grid wf_grid-cols-2 wf-space-y-30 wf-space-x-30">
      <div class="wf_flex wf-space-x-30">
        <div>
          <h4 class="wf-font_16--bold">특가상품</h4>
          <div class="wf-mt-14">
            <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; main</p>
            <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; Today's special price</p>
          </div>
        </div>
        <div class="wf_width-343">
          <WelfareProductItem is-heart is-buy :data="productLg" />
        </div>
      </div>
      <div class="wf_flex wf-space-x-30">
        <div>
          <h4 class="wf-font_16--bold">167px</h4>
          <div class="wf-mt-14">
            <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; main</p>
            <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; small /middle category</p>
          </div>
        </div>
        <div class="wf_width-343">
          <WelfareProductItem class="wf_width-167" is-heart is-coupon is-cart type="md" :data="productMd" />
        </div>
      </div>
      <div class="wf_flex wf-space-x-30">
        <div>
          <h4 class="wf-font_16--bold">140px</h4>
          <div class="wf-mt-14">
            <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; Product details</p>
          </div>
        </div>
        <div class="wf_width-343">
          <WelfareProductItem class="wf_width-140" is-heart is-coupon is-cart type="sm" :data="product3" />
        </div>
      </div>
      <div class="wf_flex wf-space-x-30">
        <div>
          <h4 class="wf-font_16--bold">140px_simple</h4>
          <div class="wf-mt-14">
            <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; main</p>
            <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; small /middle category</p>
            <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; order sheet</p>
          </div>
        </div>
        <div class="wf_width-343">
          <WelfareProductItem class="wf_width-140" type="sm" :data="product4" />
        </div>
      </div>
      <div class="wf_flex wf-space-x-30">
        <div>
          <h4 class="wf-font_16--bold">107px</h4>
          <div class="wf-mt-14">
            <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; main</p>
          </div>
        </div>
        <div class="wf_width-343">
          <WelfareProductItemSmall
            :data="{
              percent: 99,
              thumbnailProduct: ProductItemImage
            }"
          />
        </div>
      </div>
    </div>
  </WelfareContainer>
</template>
