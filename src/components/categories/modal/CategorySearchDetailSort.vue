<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { WelfareRadio } from '@/components/uikit/input'
import {
  CategoryDetailedSearchSortEmits,
  CategoryDetailedSearchSortProps,
  CategoryListProductSortType
} from '@/models/views/categories/CategorySearchDetailModel'

const getClass = (value: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}
const sorts = ref<CategoryListProductSortType[]>([
  CategoryListProductSortType.POPULARITY_SORT,
  CategoryListProductSortType.PRICE_SORT_DESC,
  CategoryListProductSortType.PRICE_SORT_ASC,
  CategoryListProductSortType.NEWEST_SORT,
  CategoryListProductSortType.RATING_SORT
])
const props = defineProps<CategoryDetailedSearchSortProps>()
defineEmits<CategoryDetailedSearchSortEmits>()
const currentSort = ref<CategoryListProductSortType>(props.currentSort)
</script>

<template>
  <div>
    <div
      v-for="(sort, index) in sorts"
      :key="index"
      class="wf_grid-span-2 wf_flex wf_items-start wf_justify-between wf-space-x-26 wf-pt-16 wf-pb-20 wf-border-width-b-1 wf-br--g-e-6 wf-color--g-333"
    >
      <span :class="getClass(sort === currentSort)">{{ sort }}</span>
      <WelfareRadio name="radio" v-model="currentSort" :value="sort"
                    @update:model-value="() => $emit('updateSort:methodSort', currentSort)" />
    </div>
  </div>
</template>
