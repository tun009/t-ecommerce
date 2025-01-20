<!-- FO_MC_CA022000, FO_MC_CA022001, FO_MC_CA022012 -->
<script setup lang="ts">
import { dataTabCategoryPage, listLineTabCategoryPage } from '@/commons'
import CategoryListProduct from '@/components/categories/CategoryListProduct.vue'
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const catgoryIdDepth1 = route.query.catgoryIdDepth1 as string
const catgoryIdDepth2 = route.query.catgoryIdDepth2 as string
const catgoryIdDepth3 = route.query.catgoryIdDepth3 as string
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop hide-border display-back-icon display-search-icon display-cart-icon title="식품" />
    <div class="wf-category-tab-dep1 wf-relative">
      <WelfareTab :items="dataTabCategoryPage" :default="dataTabCategoryPage[0]" type="line" name="main-header-navigation" class="wf-pt-8 wf-px-16" />
    </div>
    <WelfareTab
      :items="listLineTabCategoryPage"
      :default="listLineTabCategoryPage[1]"
      type="round"
      name="main-header-around"
      class="wf-pt-16 wf-pb-13 wf-px-16 wf-br-b-1 wf-br--g-e-7"
    />

    <div class="wf-px-16 wf-py-30">
      <CategoryListProduct :category-id-depth1="catgoryIdDepth1" :category-id-depth2="catgoryIdDepth2" :category-id-depth3="catgoryIdDepth3" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/categories/_welfare-category-product-list.scss');
</style>
