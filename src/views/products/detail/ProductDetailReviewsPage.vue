<!-- FO_MC_IT012012, FO_MC_IT011012P, FO_MC_IT011013P, FO_MC_IT011023P -->
<script setup lang="ts">
import ProductDetailReviews from '@/components/products/detail/ProductDetailReviews.vue'
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useProductDetailReviewsPage } from '@/composables/products/detail/productDetail/useProductDetailReviewsPage'

const { tabs } = useProductDetailReviewsPage()
</script>

<template>
  <div class="wf_height-screen wf_overflow-y-auto">
    <WelfareTitleTextStickyTop display-back-icon display-menu-icon display-home-right-icon display-search-icon display-cart-icon hideBorder>
      <div class="wf-br-b-1 wf-br--g-e-7 wf-pt-17">
        <WelfareTab
          :items="tabs"
          :default="tabs[1]"
          name="line-tab"
          class="wf-tab-container--full wf-tab-container--label-111 wf-product-reviews-tab"
        />
      </div>
    </WelfareTitleTextStickyTop>
    <ProductDetailReviews />
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-reviews-page.scss');
</style>
