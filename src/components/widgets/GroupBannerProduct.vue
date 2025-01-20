<script setup lang="ts">
import TitleRedirect from './TitleRedirect.vue'
import { ProductBannerImage1, ProductItemImage } from '@/assets/images'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import WelfareTab from '../uikit/tabs/WelfareTab.vue'
import WelfareImage from './images/WelfareImage.vue'
import WelfareProductItemSmall from '../uikit/unit/WelfareProductItemSmall.vue'
import IconArrowRight from '../icons/IconArrowRight.vue'

const productSm: WelfareUnitProductModel = {
  name: '다이슨 에어랩 멀티...',
  price: 99999999,
  pricePromotion: 999999,
  percent: 99,
  thumbnailProduct: ProductItemImage
}
const dataTab = [
  {
    id: '1',
    label: '다이슨'
  },
  {
    id: '2',
    label: '삼성전자'
  },
  {
    id: '3',
    label: '루이비통'
  },
  {
    id: '4',
    label: '조말론'
  },
  {
    id: '5',
    label: '솔트레인'
  }
]
</script>
<template>
  <div>
    <TitleRedirect title="다양한 브랜드를 즐겨보세요." path="#" />
    <div class="wf-mt-20 wf-px-16">
      <WelfareTab
        class="wf-tab-container-active-font-600"
        classWrapSpace="wf-round-tab-space-7"
        :items="dataTab"
        type="round"
        :default="dataTab[0]"
        name="2"
      />
    </div>
    <div class="wf-mt-15 wf-relative">
      <div class="wf-banner-text">
        <router-link :to="'#'" class="wf_flex wf_items-center wf-link-hover wf-space-x-10">
          <span class="wf-font_24--bold wf-color--g-111">다이슨</span> <span class="wf-link-icon"><IconArrowRight :width="8" :height="12" /></span>
        </router-link>
        <p class="wf-font_15-mid--lh140 wf-mt-7 wf_width-94 wf-color--g-111">신제품 런칭 기념. ~50% 세일</p>
      </div>
      <WelfareImage class-group="wf-image-link-banner" :data-src="ProductBannerImage1" />
    </div>
    <div class="wf-bg--4747 wf_flex wf-space-x-10 wf-pb-38 wf-pt-40 wf-px-16">
      <WelfareProductItemSmall is-dark :data="productSm" />
      <WelfareProductItemSmall is-dark :data="{ ...productSm, name: '다이슨 슈퍼소닉 헤어...', pricePromotion: 99999999 }" />
      <WelfareProductItemSmall is-dark :data="{ ...productSm, name: '다이슨 컴플리트 롱...', pricePromotion: 99999999 }" />
    </div>
  </div>
</template>
