<script setup lang="ts">
import { CATEGORY_TAP_CONTROLS } from '@/commons'
import WelfareButtonTap from '../uikit/button/WelfareButtonTap.vue'
import { CategoryListProductSortType } from '@/models/views/categories/CategorySearchDetailModel'
import { CategoryListProductDisplayType } from '@/models/views/categories/CategoryListProductModel'

interface CategoryTapControlsProps {
  activeTap?: string
  typeDisplay?: CategoryListProductDisplayType
  typeSort?: CategoryListProductSortType
}

type CategoryTapControlsEmits = (e: 'onChangeTap', value: string) => void

const props = withDefaults(defineProps<CategoryTapControlsProps>(), {
  activeTap: CATEGORY_TAP_CONTROLS[0]
})
defineEmits<CategoryTapControlsEmits>()
const textDisplay = (index: number, tap: string) => {
  switch (index) {
    case 0:
      return props.typeSort
    case 1:
      return props.typeDisplay
    case 2:
      return tap
  }
}
</script>

<template>
  <div class="wf_flex wf-space-x-5 wf_overflow-x-auto">
    <WelfareButtonTap
      type="tapCircleArrow"
      :active="tap === $props.activeTap"
      :text="textDisplay(index, tap)"
      @click="$emit('onChangeTap', tap)"
      v-for="(tap, index) in CATEGORY_TAP_CONTROLS"
      v-bind:key="index"
    />
  </div>
</template>
