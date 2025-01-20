<script setup lang="ts">
import { WelfareRadio } from '@/components/uikit/input'
import {
  CategoryDetailedSearchImageListEmits,
  CategoryDetailedSearchImageListProps
} from '@/models/views/categories/CategorySearchDetailModel'
import { defineEmits, ref } from 'vue'
import { CategoryListProductDisplayType } from '@/models/views/categories/CategoryListProductModel'

const getClass = (value: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}
const displays = ref<CategoryListProductDisplayType[]>([
  CategoryListProductDisplayType.IMAGE,
  CategoryListProductDisplayType.LIST
])
const props = defineProps<CategoryDetailedSearchImageListProps>()
defineEmits<CategoryDetailedSearchImageListEmits>()
const currentDisplay = ref<CategoryListProductDisplayType>(props.currentMethodDisplay)
</script>

<template>
  <div>
    <div
      v-for="(display, index) in displays"
      :key="index"
      class="wf_grid-span-2 wf_flex wf_items-start wf_justify-between wf-space-x-26 wf-pt-17 wf-pb-18 wf-border-width-b-1 wf-br--g-e-6 wf-color--g-333"
    >
      <span :class="getClass(display === currentDisplay)">{{ display + '로 보기' }}</span>
      <WelfareRadio
        name="radio"
        v-model="currentDisplay"
        :value="display"
        @update:model-value="() => $emit('updateDisplayType:methodDisplay', currentDisplay)"
      />
    </div>
  </div>
</template>
