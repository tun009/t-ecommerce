<script setup lang="ts">
import WelfareViewPercent from '@/components/uikit/product/WelfareViewPercent.vue'
import WelfareViewPrice from '@/components/uikit/product/WelfareViewPrice.vue'
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'
import { WelfareModalProductCodeContent } from '@/models/views/myPage/MyPageCustomerInfo'
import { formatNumberDot } from '@/commons'

const props = defineProps<WelfareModalProductCodeContent>()
</script>

<template>
  <div class="">
    <div class="wf_flex wf-space-x-15 wf-pb-10">
      <router-link :to="'#'">
        <WelfareImage :data-src="props.data.thumbnailProduct" :src="props.data.thumbnailProduct" :class-group="'wf-unit_product-vertical--image'" />
      </router-link>
      <div class="wf_width-full wf_flex wf_flex-col">
        <div>
          <div class="wf_flex wf-space-x-8">
            <WelfareViewPercent v-if="props.data.percent" type="sm" :percent="props.data.percent ?? 0" />
            <WelfareViewPrice type="sm" :price="props.data.immediatelyProductDiscountAmount ?? 0" />
          </div>
          <p v-if="props.data.price" class="wf-border-top-absolute-10 wf_width-fit wf wf-text wf-color--g-bbb wf-mt-10">
            {{ formatNumberDot(props.data.pricePromotion) }}원
          </p>
        </div>
        <div class="wf-mt-10 wf_flex-1 wf_flex wf_flex-col wf_width-full">
          <p class="wf-font_15-mid--lh140 wf-color--g-333 line-clamp-2">{{ props.data.productName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wf-border-top-absolute-10 {
  position: relative;
}
.wf-border-top-absolute-10::after {
  position: absolute;
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: #bbbbbb;
  top: 10px;
  left: 0;
}
</style>
