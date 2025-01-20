<!-- FO_MC_CA022000/FO_MC_CA022001/FO_MC_CA022012 -->
<script setup lang="ts">
import CategoryTapControls from './CategoryTapControls.vue'
import { useCategoryListProduct } from '@/composables/categories/useCategoryListProduct'
import { CategoryListProductDisplayType } from '@/models/views/categories/CategoryListProductModel'
import WelfareProductItem from '../uikit/unit/WelfareProductItem.vue'
import WelfareProductItemVertical from '../uikit/unit/WelfareProductItemVertical.vue'
import InfiniteLoadingData from '../widgets/InfiniteLoadingData.vue'
import { YesNoEnum } from '@/models/common'

export interface CategoryListProductProps {
  categoryIdDepth1?: string
  categoryIdDepth2?: string
  categoryIdDepth3?: string
}

const props = defineProps<CategoryListProductProps>()

const { tapActive, typeDisplay, currentSort, products, handleChangeTab, loadInfinite, hasMore, toggleLike } = useCategoryListProduct(props)
</script>

<template>
  <div class="wf_flex wf_flex-col wf-space-y-21 wf-pb-32">
    <CategoryTapControls :active-tap="tapActive" :type-display="typeDisplay" :type-sort="currentSort" @on-change-tap="handleChangeTab" />
    <!-- List product display -->
    <InfiniteLoadingData v-if="products.length > 0" @infinite="loadInfinite" :stop-scroll="!hasMore">
      <div class="wf_grid wf-space-y-20" :class="typeDisplay === CategoryListProductDisplayType.IMAGE ? 'wf-space-x-9 wf_grid-cols-2' : ''">
        <template v-if="typeDisplay === CategoryListProductDisplayType.IMAGE">
          <WelfareProductItem
            class="wf_width-full"
            is-heart
            is-coupon
            is-cart
            type="md"
            :data="product"
            is-line-through
            :isDefaultHeart="product.productLikeYn === YesNoEnum.Y"
            v-for="(product, index) in products"
            v-bind:key="index"
            @is-heart="toggleLike"
          />
        </template>
        <template v-else>
          <WelfareProductItemVertical
            :isDefaultHeart="product.productLikeYn === YesNoEnum.Y"
            is-line-through
            :data="product"
            v-for="(product, index) in products"
            v-bind:key="index"
            @is-heart="toggleLike"
          />
        </template>
      </div>
    </InfiniteLoadingData>
    <div class="wf_flex wf_justify-center wf-pt-75 wf-mt-34" v-else>
      <span class="wf-font_15--reg wf-color--g-333">{{ $t('search.searchPage.noProductInCategory') }}</span>
    </div>
  </div>
</template>
