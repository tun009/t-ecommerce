<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { WelfareRadio } from '@/components/uikit/input'
import {
  SearchDetailedSearchSortEmits,
  SearchDetailedSearchSortProps,
  SearchListProductSortType,
  SearchListProductSortValue
} from '@/models/views/categories/CategorySearchDetailModel'
import WelfareTooltip from '@/components/uikit/tooltip/WelfareTooltip.vue'

const getClass = (value: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}
const sorts = ref<SearchListProductSortType[]>([
  SearchListProductSortType.RECOMMEND_SORT,
  SearchListProductSortType.POPULARITY_SORT,
  // SearchListProductSortType.MOST_VIEW_SORT,
  // SearchListProductSortType.RESGISTER_RECENT_SORT,
  SearchListProductSortType.PRICE_SORT_DESC,
  SearchListProductSortType.PRICE_SORT_ASC,
  SearchListProductSortType.RATING_SORT
])
const props = defineProps<SearchDetailedSearchSortProps>()
defineEmits<SearchDetailedSearchSortEmits>()
const currentSort = ref<SearchListProductSortType>(props.currentSortSearch ?? SearchListProductSortType.RECOMMEND_SORT)
</script>

<template>
  <div>
    <div
      v-for="(sort, index) in sorts"
      :key="index"
      class="wf_grid-span-2 wf_flex wf_items-start wf_justify-between wf-space-x-26 wf-pt-16 wf-pb-20 wf-border-width-b-1 wf-br--g-e-6 wf-color--g-333"
    >
      <div class="wf_flex wf_items-center wf-space-x-6">
        <span :class="getClass(sort === currentSort)">{{ SearchListProductSortValue[sort] }}</span>
        <WelfareTooltip position="left" v-if="sort === currentSort" :text="$t('search.tabControl.toolTipSort')" />
      </div>
      <WelfareRadio name="radio" v-model="currentSort" :value="sort" @update:model-value="() => $emit('updateSort:methodSortSearch', currentSort)" />
    </div>
  </div>
</template>

<style scoped>
:deep(.wf-tooltip) {
  width: 50vw;
  line-height: 120%;
  text-align: start;
}
</style>
