<script setup lang="ts">
import MyPageProductReviewItem from './MyPageProductReviewItem.vue'

import { MyLikeFileResponse } from '@/models/views/myPage/MyPageProductReview'
import { formatNumberDot } from '@/commons'

export interface MyPageActionCard {
  salePrice?: number
  immediatelyProductDiscountAmount?: number
  productDiscountRate?: number
  productKey: number
  foAttachFileList: MyLikeFileResponse[]
}
const { salePrice, productKey, immediatelyProductDiscountAmount, productDiscountRate } = defineProps<MyPageActionCard>()
</script>

<template>
  <div class="prd-card wf-bg--g-fff">
    <div class="prd-card-content">
      <div class="prd-card-content-header">
        <slot name="header"></slot>
      </div>

      <MyPageProductReviewItem
        :product-key="productKey"
        :alt="foAttachFileList?.[0]?.attachfileName"
        :src="foAttachFileList?.[0]?.attachfilePathName"
      >
        <template #item>
          <ul class="prd-card-item-right-price" v-if="productDiscountRate !== undefined">
            <li>
              <div>
                <span v-if="productDiscountRate > 0" class="rate wf-font_15--bold">{{ `${+((1 - productDiscountRate) * 100).toFixed()}%` }}</span>
                <span class="wf-font_15--mid wf-color--g-111">
                  <span class="wf-font_15--bold">{{ formatNumberDot(immediatelyProductDiscountAmount) }}</span>
                  원
                </span>
              </div>
            </li>
            <li class="wf-pt-3" v-if="productDiscountRate">
              <span class="wf-color--g-bbb wf-font_13-reg--lt">{{ formatNumberDot(salePrice) }}</span>
            </li>
          </ul>

          <ul v-else>
            <li>
              <div>
                <span class="wf-font_15--mid wf-color--g-111">
                  <span class="wf-font_15--bold">{{ formatNumberDot(salePrice) }}</span>
                  원
                </span>
              </div>
            </li>
          </ul>
        </template>
      </MyPageProductReviewItem>

      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<style lang="scss">
@import url('@/assets/styles/views/myPage/product/review/_welfare-my-page-product-action.scss');
</style>
