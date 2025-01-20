<!-- FO_MC_CA011000/FO_MC_CA011001/FO_MC_CA011002 -->

<script lang="ts" setup>
import CategoryGroupProduct from '@/components/categories/CategoryGroupProduct.vue'
import WelfareBannerImage from '@/components/uikit/banner/WelfareBannerImage.vue'
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useCategoryListImagePage } from '@/composables/categories/useCategoryListImagePage'
import CategoryListProduct from '@/components/categories/CategoryListProduct.vue'
import { CategoryBannerImageModel } from '@/models/views/categories/CategoryListProductModel'
import { computed } from 'vue'

const {
  dataProduct1,
  dataProduct2,
  categoriesDeep2,
  categoriesDeep3,
  handleChangeParentDeep2,
  handleChangeParentDeep3,
  refTabDeep2,
  refTabDeep1,
  handleDeep1Mounted,
  handleDeep2Mounted,
  deep1,
  deep2,
  deep3,
  isShowBanner,
  title,
  images,
  handleBannerClick
} = useCategoryListImagePage()

const imagesUrl = computed(() => images.value?.map((item: CategoryBannerImageModel) => item.imageUrl))
</script>
<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop class="wf-space-x-2--i" hide-border display-back-icon display-search-icon display-cart-icon :title="title" />
    <div v-if="categoriesDeep2?.length" class="wf-category-tab-dep1 wf-relative">
      <WelfareTab
        @on-mounted="handleDeep1Mounted"
        ref="refTabDeep1"
        :items="categoriesDeep2"
        @on-change="handleChangeParentDeep2"
        type="line"
        name="main-header-navigation"
        class="wf-pt-8 wf-px-16"
      />
    </div>
    <WelfareTab
      ref="refTabDeep2"
      @on-mounted="handleDeep2Mounted"
      v-if="categoriesDeep3.length"
      :items="categoriesDeep3"
      @on-change="handleChangeParentDeep3"
      type="round"
      name="main-header-around"
      class="wf-category-tab-dep2 wf-pt-16 wf-px-16"
      :class="!isShowBanner && 'wf-pb-13 wf-br-b-1 wf-br--g-e-7'"
    />
    <template v-if="isShowBanner">
      <div class="wf-mt-15">
        <WelfareBannerImage
          v-if="imagesUrl?.length"
          :allowSlideNext="true"
          :allowSlidePrev="true"
          :images="imagesUrl"
          :hideControlMedia="false"
          :loop="true"
          @click-image="handleBannerClick"
        />
      </div>
      <div class="wf-pb-29">
        <CategoryGroupProduct class="wf-mt-30" title="추천 상품" :data="dataProduct1" />
        <CategoryGroupProduct class="wf-mt-21" title="개인화 추천 상품" :data="dataProduct2" />
      </div>
      <WelfareLineHorizontal />
    </template>
    <div v-if="categoriesDeep2.length && deep1 && deep2" class="wf-py-30">
      <CategoryListProduct class="wf-px-16 wf-space-y-29" :category-id-depth1="deep1" :category-id-depth2="deep2" :category-id-depth3="deep3" />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/categories/_welfare-category-product-list.scss');
</style>
