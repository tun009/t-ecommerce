<script setup lang="ts">
import { CategoryListProductDisplayType } from '@/models/views/categories/CategoryListProductModel'
import { useSearchResultListProduct } from '@/composables/search/useSearchResultListProduct'
import WelfareProductItemVertical from '../uikit/unit/WelfareProductItemVertical.vue'
import WelfareProductItem from '../uikit/unit/WelfareProductItem.vue'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import SearchTapControl from '@/components/search/SearchTapControl.vue'
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import InfiniteLoadingDataVue from '../widgets/InfiniteLoadingData.vue'

import { CategoryDetailedSearchModalWrapEmits } from '@/models/views/categories/CategorySearchDetailModel'
import WelfareLoaderVue from '../uikit/loader/WelfareLoader.vue'
import { YesNoEnum } from '@/models/common'

const emits = defineEmits<CategoryDetailedSearchModalWrapEmits>()

interface SearchResultListProps {
  classImage?: string
  classTitle?: string
  displayType?: string
  title?: string
  name?: string
  showTap?: boolean
  listBoxTab?: {
    id: string
    label: string
  }[]
  keyword?: string
  data: WelfareUnitProductModel[]
  loadInfinite?: any
  hasMore?: boolean
  isLoadMore?: boolean
}
const props = defineProps<SearchResultListProps>()
const { typeDisplay, tapActive, currentSortSearch, handleChangeTab } = useSearchResultListProduct(emits, props.showTap)
</script>

<template>
  <div class="wf-mx-16">
    <div class="wf_flex wf_flex-col wf-pb-32">
      <SearchTapControl
        class="wf-pt-30"
        v-if="props.showTap"
        :active-tap="tapActive"
        :type-display="typeDisplay"
        :type-sort="currentSortSearch"
        @on-change-tap="handleChangeTab"
      />
      <!-- List product display -->
      <h3 class="wf-font_19--bold wf-color--g-111" :class="`${props.classTitle}`">
        <span v-if="props.name" class="wf-color--f-95729--i">"{{ props.name }}" &nbsp;</span>{{ props.title }}
        <WelfareTab :items="props.listBoxTab ?? []" class="wf-pt-20" name="search-tab-2" type="round" />
      </h3>
      <InfiniteLoadingDataVue v-if="props.data.length > 0" @infinite="props.loadInfinite" :stop-scroll="!props.hasMore">
        <div
          class="wf_grid"
          :class="`${
            displayType !== CategoryListProductDisplayType.LIST ? 'wf-space-x-9 wf_grid-cols-2 wf-pt-21 wf-space-y-20' : 'wf-pt-20 wf-space-y-20'
          } ${props.classImage}`"
        >
          <template v-if="displayType !== CategoryListProductDisplayType.LIST">
            <WelfareProductItem
              class="wf_width-full"
              is-heart
              is-coupon
              is-cart
              type="md"
              :data="product"
              is-line-through
              :isDefaultHeart="product.productLikeYn === YesNoEnum.Y"
              v-for="(product, index) in props.data"
              v-bind:key="index"
            />
          </template>
          <template v-else>
            <WelfareProductItemVertical
              is-line-through
              :isDefaultHeart="product.productLikeYn === YesNoEnum.Y"
              :rate-star-class="'wf-mt-12'"
              :data="product"
              v-for="(product, index) in props.data"
              v-bind:key="index"
            />
          </template>
        </div>
      </InfiniteLoadingDataVue>
      <div class="wf_flex wf_justify-center wf-pt-75 wf-mt-34" v-else>
        <span class="wf-font_15--reg wf-color--g-333">{{ $t('search.searchPage.noProductInCategory') }}</span>
      </div>
      <div class="wf_flex wf_justify-center wf-py-20">
        <WelfareLoaderVue small v-if="props.isLoadMore" />
      </div>
    </div>
  </div>
</template>
