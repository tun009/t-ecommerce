<script lang="ts" setup>
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useProductDetailPopup } from '@/composables/products/detail/productDetail/useProductDetailPopup'
const { openPointInfoPopup, openAdditionalShippingCostInfoPopup, openInterestFreeInstallmentMonthInfoPopup, openExchangeReturnByCategoryPopup } =
  useProductDetailPopup()
</script>
<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :displayBackIcon="true" :displayHomeLeftIcon="true" title="Popup" />
    <div class="wf-mt-30 wf-px-10 wf_flex wf_flex-col wf-space-y-20">
      <WelfareButtonLine lg-state="black-line" type="md" class="wf_flex-1 wf_min-width-initial" text="FO_MC_IT011004P" @click="openPointInfoPopup" />
      <WelfareButtonLine
        lg-state="black-line"
        type="md"
        class="wf_flex-1 wf_min-width-initial"
        text="FO_MC_IT011005P"
        @click="() => openAdditionalShippingCostInfoPopup(true)"
      />

      <WelfareButtonLine
        lg-state="black-line"
        type="md"
        class="wf_flex-1 wf_min-width-initial"
        text="FO_MC_IT011005P NoData"
        @click="() => openAdditionalShippingCostInfoPopup()"
      />
      <!-- <WelfareButtonLine lg-state="black-line" type="md" class="wf_flex-1 wf_min-width-initial" text="FO_MC_IT011006P" @click="openPointInfoPopup" /> -->
      <WelfareButtonLine
        lg-state="black-line"
        type="md"
        class="wf_flex-1 wf_min-width-initial"
        text="FO_MC_IT011007P"
        @click="openInterestFreeInstallmentMonthInfoPopup"
      />
      <WelfareButtonLine
        lg-state="black-line"
        type="md"
        class="wf_flex-1 wf_min-width-initial"
        text="FO_MC_IT011019P"
        @click="openExchangeReturnByCategoryPopup"
      />
    </div>
  </div>
</template>
