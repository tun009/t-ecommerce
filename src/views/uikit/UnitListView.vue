<script setup lang="ts">
import { DummyImage } from '@/assets/images'
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareProductItemVertical from '@/components/uikit/unit/WelfareProductItemVertical.vue'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'

const productSm: WelfareUnitProductModel = {
  name: '[BTS슈가, 황인엽,오연서, 기은세 착용] DORISC1...',
  price: 99999999,
  pricePromotion: 99999999,
  percent: 99,
  thumbnailProduct: DummyImage
}
const productLg: WelfareUnitProductModel = {
  ...productSm,
  buyerCount: 9999,
  thumbnailBo: DummyImage,
  buyers: [
    'https://th.bing.com/th/id/OIP.RELZxvt4gKN2lfN6WRyqPAHaHa?w=512&h=512&rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.RELZxvt4gKN2lfN6WRyqPAHaHa?w=512&h=512&rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.RELZxvt4gKN2lfN6WRyqPAHaHa?w=512&h=512&rs=1&pid=ImgDetMain'
  ]
}
const productMd: WelfareUnitProductModel = {
  ...productSm,
  name: '[지방시] 땡 꾸뛰르 쿠션 포에버 퍼펙트땡 꾸뛰르 쿠션 포에버 퍼펙트',
  benefits: ['무료배송', '무이자'],
  rateStar: 4,
  rateCountStar: 999
}
</script>

<template>
  <WelfareContainer>
    <div class="wf_flex wf-space-x-30">
      <div>
        <h4 class="wf-font_16--bold">120px</h4>
        <div class="wf-mt-14">
          <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; small /middle category</p>
        </div>
      </div>
      <div class="wf_width-343">
        <WelfareProductItemVertical :data="productMd" />
      </div>
    </div>
    <div class="wf_flex wf-space-x-30 wf-mt-50">
      <div>
        <h4 class="wf-font_16--bold">120px</h4>
        <div class="wf-mt-14">
          <p class="wf-font_16-mid--lh140">•&nbsp;&nbsp; customer service center</p>
        </div>
      </div>
      <div class="wf_width-275">
        <WelfareProductItemVertical :is-heart="false" :is-cart="false" :is-coupon="false" :data="productLg" />
      </div>
    </div>
  </WelfareContainer>
</template>
