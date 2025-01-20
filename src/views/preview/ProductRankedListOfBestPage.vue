<!-- FO_MC_BE011000 , FO_MC_BE011001-->
<script setup lang="ts">
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import InfiniteLoadingData from '@/components/widgets/InfiniteLoadingData.vue'
import { useProductRankedListOfBest } from '@/composables/products/useProductRankedListOfBest'

const { listBox2Tab, data, load, productMd } = useProductRankedListOfBest()
</script>
<template>
  <div>
    <div ref="refDivTarget" class="wf-relative wf_rounded-tl-16 wf-mt--12 wf_rounded-tr-16 wf-pb-40 wf-bg--white wf_zIndex-2">
      <div class="wf-mt-140 wf-relative">
        <div class="wf-pb-15 wf-pt-18 wf-px-16 wf-br--g-e-7 wf-br-b-1 wf-sticky-top">
          <WelfareTab :items="listBox2Tab" :default="listBox2Tab[0]" name="round-tab-1" type="round" />
        </div>
        <InfiniteLoadingData v-if="!productMd?.productMd" @infinite="load" :stop-scroll="data.length >= 8">
          <div class="wf_grid wf-px-16 wf-pt-4 wf_grid-cols-2 wf-space-y-21 wf-space-x-9">
            <div v-for="(item, index) in data" :key="index">
              <p class="wf-underline wf-pb-10 wf-font_15--bold wf-color--000">{{ `0${index + 1}` }}</p>
              <WelfareProductItem is-heart is-coupon is-cart type="md" :data="productMd?.productMd" />
            </div>
          </div>
        </InfiniteLoadingData>
        <div v-else class="wf_flex wf_flex-1 wf_justify-center wf_items-center wf_height-371">
          <p class="">상품리스트가 없습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url('@/assets/styles/views/home/_welfare-main-page-layout.scss');
</style>
