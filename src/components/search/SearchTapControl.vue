<script setup lang="ts">
import WelfareButtonTap from '../uikit/button/WelfareButtonTap.vue'
import { SEARCH_TAP_CONTROLS } from '@/commons'
import { SearchListProductSortType, SearchListProductSortValue } from '@/models/views/categories/CategorySearchDetailModel'

interface SearchTapControlsProps {
  activeTap?: string
  typeSort?: SearchListProductSortType
}

type SearchTapControlsEmits = (e: 'onChangeTap', value: string) => void

const props = withDefaults(defineProps<SearchTapControlsProps>(), {
  activeTap: SEARCH_TAP_CONTROLS[0]
})
defineEmits<SearchTapControlsEmits>()
const textSortDisplay = (tap: string) => {
  switch (tap) {
    case SEARCH_TAP_CONTROLS[5]:
      return SearchListProductSortValue[props.typeSort!]
    default:
      return tap
  }
}
</script>

<template>
  <div class="wf_flex wf-space-x-5 wf_overflow-x-auto">
    <WelfareButtonTap
      type="tapCircleArrow"
      :active="tap === $props.activeTap"
      :text="textSortDisplay(tap)"
      @click="$emit('onChangeTap', tap)"
      v-for="(tap, index) in SEARCH_TAP_CONTROLS"
      v-bind:key="index"
    />
  </div>
</template>
