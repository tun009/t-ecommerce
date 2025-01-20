<!-- FO_MC_TD011000 -->
<script setup lang="ts">
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import { useProductTodaySpecialPricePage } from '@/composables/products/useProductTodaySpecialPrice'
import { YesNoEnum } from '@/models/common'

interface Props {
  id: number
}

const props = defineProps<Props>()

const { productLg } = useProductTodaySpecialPricePage(props)
</script>
<template>
  <div>
    <div class="wf-relative wf_rounded-tl-16 wf-mt--12 wf_rounded-tr-16 wf-pb-40 wf-bg--white wf_zIndex-2">
      <!-- content -->
      <div class="wf-mt-166 wf-relative">
        <!-- <div class="wf_flex wf_justify-center wf_items-center wf_flex-col wf-space-y-4">
          <button class="wf-bg--000 wf_h-50 wf_width-auto wf-px-20 wf-py-4 wf_rounded-16">
            <p class="wf-color--g-fff">오늘의 특가</p>
          </button>
          <div class="wf_flex wf-space-x-4">
            <img class="wf_width-19 wf_height-19" :src="IcTime" alt="arrow-up-icon" />
            <p class="wf-color--000">02시간 41분38초 남았습니다.</p>
          </div>
        </div> -->
        <div v-if="productLg?.length" class="wf_width-full wf-px-16 wf-mt-24">
          <WelfareProductItem
            v-for="(item, index) in productLg"
            :key="index"
            :is-default-heart="item.productLikeYn === YesNoEnum.Y"
            is-heart
            is-buy
            :data="item"
            class="wf-pb-32"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url('@/assets/styles/views/home/_welfare-main-page-layout.scss');
</style>
