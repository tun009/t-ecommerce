<script setup lang="ts">
import { computed } from 'vue'
import MyPageProductReviewItem from './MyPageProductReviewItem.vue'
import { MyProductOptionResponses } from '@/models/views/myPage/MyPageProductReview'

export interface MyPageProductReviewCardInterface {
  productName: string
  orderKey: number
  orderQuantity: number
  productOptionResponses: MyProductOptionResponses[] | null
  attachfilePathName: string
  attachfileName: string
}

const { productName, orderKey, productOptionResponses, attachfileName } = defineProps<MyPageProductReviewCardInterface>()

const optionName = computed(() => {
  if (productOptionResponses && productOptionResponses.length > 0) {
    const productOptionResponse = productOptionResponses[0]
    if (productOptionResponse) {
      const { optionLargeName, optionMediumName, optionSmallName } = productOptionResponse
      return `${optionLargeName || ''} ${optionMediumName || ''} ${optionSmallName || ''}`
    }
  }
  return ''
})
</script>
<template>
  <div class="prd-card wf-bg--g-fff">
    <div class="prd-box">
      <div class="prd-number">
        <span>{{ $t('myPage.reviewCard.orderTitle') }}&nbsp;{{ orderKey }} </span>
      </div>
      <div class="wf_container-col wf-py-20 wf-px-16">
        <div class="prd-content-header">
          <span class="wf-unit-title line-clamp-2 wf_flex-1 wf-color--g-333 wf-font_15-mid--lh140">
            {{ productName }}
          </span>
        </div>

        <MyPageProductReviewItem :src="attachfilePathName" :alt="attachfileName">
          <template #item>
            <ul class="prd-item-right-default">
              <li>
                <span>{{ optionName ? `${optionName} / ` : '' }} {{ orderQuantity }}개</span>
              </li>
            </ul>
          </template>
        </MyPageProductReviewItem>
      </div>

      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('@/assets/styles/views/myPage/product/review/_welfare-my-page-product-card.scss');
</style>
