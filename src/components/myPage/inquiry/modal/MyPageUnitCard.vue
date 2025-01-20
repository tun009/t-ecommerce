<script setup lang="ts">
import { formatNumberDot } from '@/commons'
import { SearchProductCode } from '@/models/views/myPage/MyPageCustomerInfo'
interface WelfareOrderModal {
  product: SearchProductCode
}
const props = defineProps<WelfareOrderModal>()
</script>

<template>
  <div class="wf-unit-card wf-mb-20">
    <div class="wf_flex wf-space-x-6">
      <div class="wf_flex wf_flex-1 wf-space-x-6">
        <p class="wf-unit-title line-clamp-2 wf_flex-1 wf-color--g-333 wf-font_15-mid--lh140" v-text="props?.product?.productName"></p>
      </div>
    </div>

    <div class="wf_flex wf-mt-16 wf-space-x-15">
      <router-link :to="'#'" class="wf-unit-image">
        <img :src="props.product.thumbnailProduct" alt="#" />
      </router-link>
      <div class="wf_flex-1 wf_flex wf_flex-col wf-space-y-12">
        <div class="wf_flex wf_flex-col">
          <div>
            <slot name="money">
              <div class="wf_flex wf_items-center wf-space-x-2 wf-pt-10">
                <p class="wf-font_13--reg wf-color--g-111 wf_flex wf_items-center">
                  <span
                    v-if="props.product.pricePromotion"
                    class="wf-font_15--bold wf-color--g-111"
                    v-text="formatNumberDot(props.product.pricePromotion * props.product.price)"
                  ></span
                  >&nbsp;{{ $t('myPage.welfarePoints.won') }}&nbsp;<span v-if="props?.product.price">/</span>
                </p>
                <p class="wf-font_13--reg wf-color--g-111" v-if="props.product.price">
                  <span class="wf-font_13--reg wf-color--g-111" v-text="formatNumberDot(props.product.price)"></span
                  >{{ $t('myPage.welfarePoints.num') }}
                </p>
              </div>
              <div class="wf_flex wf_items-center wf-space-x-2 wf-pt-10">
                <p class="wf-font_13--reg wf-color--g-111 wf_flex wf_items-center">
                  <span v-if="props.product.optionName" class="wf-font_13--reg wf-color--g-111">
                    {{ props.product.optionName }}
                  </span>
                </p>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
