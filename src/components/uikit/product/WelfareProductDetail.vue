<script setup lang="ts">
import { getNumberMoney } from '@/commons'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import IconLineVertical from '@/components/icons/IconLineVertical.vue'
import WelfareScore from '../score/WelfareScore.vue'
import WelfareProductPrice from './WelfareProductPrice.vue'
import { computed } from 'vue'
import { ProductDetailClassificationEnum } from '@/models/views/products/ProductDetailReviewModel'
interface WelfareProductDetailProps {
  name: string
  salePrice: number
  productDiscountAmount?: number
  percent: number
  reviewStarPoint: number
  reviewCount: number
  isApproximately: boolean
  productClassificationCode: string
}

interface WelfareProductDetailEmits {
  (e: 'question-click'): void
  (e: 'link-click'): void
  (e: 'get-coupon'): void
}

const props = defineProps<WelfareProductDetailProps>()
defineEmits<WelfareProductDetailEmits>()
const textCount = computed(() => {
  return props.reviewCount > 9999 ? `9999+` : props.reviewCount
})
</script>

<template>
  <div class="wf-pb-29 wf-pt-30 wf-br-b-1 wf-br--g-e-7">
    <h3 class="line-clamp-2 wf-font_17-bold--lh140 wf-color--g-111">
      {{ name }}
    </h3>
    <div class="wf_flex wf_items-center wf-space-x-9 wf-mt-10 wf-color--g-555 wf-font_13--mid">
      <span v-if="productClassificationCode === ProductDetailClassificationEnum.ticket">원산지</span>
      <span v-if="productClassificationCode === ProductDetailClassificationEnum.ticket">
        <IconLineVertical />
      </span>
      <a href="#welfare-info-product-tab" @click="$emit('link-click')" class="wf_flex wf_items-center wf-space-x-10">
        <span> 상품상세 참조 </span>
        <button>
          <IconArrowRight />
        </button>
      </a>
    </div>
    <div class="wf-mt-20 wf_flex wf_justify-between wf-space-x-5">
      <div class="wf_flex wf_flex-col wf-space-y-10">
        <WelfareProductPrice
          :percent="percent > 0.5 ? percent : 0"
          :price="salePrice"
          :is-approximately="props.isApproximately"
          :price-promotion="getNumberMoney(productDiscountAmount)"
          @question-click="$emit('question-click')"
        />
      </div>
      <div>
        <button
          v-if="percent > 0.5"
          class="btn wf_height-31 wf-font_13--bold wf-btn-download wf-bg-primary wf_width-85 wf-color--g-fff wf-px-15 wf_flex wf-space-x-5"
          @click="$emit('get-coupon')"
        >
          <span>쿠폰받기</span>
          <span><IconDownload /></span>
        </button>
      </div>
    </div>
    <div class="wf-mt-20 wf_flex wf_height-16 wf_items-center">
      <div class="wf_flex wf_items-center wf-space-x-4">
        <WelfareScore class="wf-space-x-4" :value="reviewStarPoint" small /><span class="wf-font_15--reg wf_inline-block wf-mt-7"
          >({{ textCount }})</span
        >
      </div>
    </div>
  </div>
</template>
