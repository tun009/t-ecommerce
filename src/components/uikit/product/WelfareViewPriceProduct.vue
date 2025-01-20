<script setup lang="ts">
import WelfareViewPercent from './WelfareViewPercent.vue'
import WelfareViewPrice from './WelfareViewPrice.vue'
import WelfareViewPriceBorderTop from './WelfareViewPriceBorderTop.vue'

interface WelfareViewPriceProductProps {
  percent?: number
  pricePromotion?: number
  price?: number
  type?: 'sm' | 'lg'
  classPercent?: string
  classPrice?: string
  classPricePromotion?: string
  class?: string
}

const props = withDefaults(defineProps<WelfareViewPriceProductProps>(), {
  type: 'lg'
})
</script>

<template>
  <div :class="`wf-mt-10 wf_flex wf_items-center wf_flex-wrap wf-space-y-6 wf-space-x-5 ${props.class}`">
    <WelfareViewPercent v-if="props.percent" :class="props.classPercent" :type="props.type === 'lg' ? 'lg' : 'sm'" :percent="props.percent" />
    <WelfareViewPrice
      v-if="props.pricePromotion"
      :class="props.classPricePromotion"
      :type="props.type === 'lg' ? 'lg' : 'sm'"
      :price="props.pricePromotion"
    />
    <WelfareViewPriceBorderTop :class="props.classPrice" v-if="props.price" :price="props.price ?? 0" />
  </div>
</template>
