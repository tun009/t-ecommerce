<!-- FO_MC_IT012010, FO_MC_IT011041P -->
<script setup lang="ts">
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import { useProductDetailTabPage } from '@/composables/products/detail/productCodeTab/useProductDetailTabPage'
import { SellerCompanyShipmentModel } from '@/models/views/member/SellerCompanyShipment'
import { ProductCountTabModel, ProductDetailModel } from '@/models/views/products/ProductDetailReviewModel'
const props = defineProps<{
  productDetail?: ProductDetailModel
  showImage: () => void
  listSellerShipments?: SellerCompanyShipmentModel
  productCountTab?: ProductCountTabModel
}>()
const { tabs, handleChangeTab, currentActive, refExpander, refTabs } = useProductDetailTabPage(props.productCountTab)
defineExpose({
  openExpander: () => {
    handleChangeTab(tabs.value[0])
    refTabs?.value?.setSelectTab(tabs.value[0])
    requestIdleCallback(() => {
      refExpander?.value?.openExpander()
    })
  }
})
</script>

<template>
  <div>
    <div class="wf-sticky wf_zIndex-2 wf-right-0 wf-br-b-1 wf-br--g-e-7 wf-pt-17 wf-bg--white wf-item-product-tabs">
      <WelfareTab
        ref="refTabs"
        :items="tabs"
        :default="tabs[0]"
        :onOn-change="handleChangeTab"
        name="line-tab"
        class="wf-tab-container--full wf-tab-container--label-111 wf-product-reviews-tab"
      />
    </div>
    <div class="wf-item-product-contents" id="wf-tab-sticky-top">
      <keep-alive>
        <component ref="refExpander" :is="tabs[currentActive].component" v-bind="props" />
      </keep-alive>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-reviews-page.scss');
</style>
