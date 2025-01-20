<script setup lang="ts">
import { WelfareRadio } from '@/components/uikit/input'
import { CategoryListProductDisplayType } from '@/models/views/categories/CategoryListProductModel'
import { CategoryDetailedSearchImageListEmits, CategoryDetailedSearchImageListProps } from '@/models/views/categories/CategorySearchDetailModel'
import { defineEmits, ref, watch } from 'vue'
import SearchDetailedGroupButton from '../common/SearchDetailedGroupButton.vue'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'

const getClass = (value: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}
const displays = ref<CategoryListProductDisplayType[]>([CategoryListProductDisplayType.IMAGE, CategoryListProductDisplayType.LIST])
const props = defineProps<CategoryDetailedSearchImageListProps>()
defineEmits<CategoryDetailedSearchImageListEmits>()
const initValue = () => {
  return props.currentMethodDisplay!
}
const currentDisplay = ref<CategoryListProductDisplayType>(initValue())
const handleReset = () => {
  currentDisplay.value = CategoryListProductDisplayType.IMAGE
}
const { isShow } = useModalBottomSheet()
watch(
  () => props.currentMethodDisplay,
  () => {
    currentDisplay.value = initValue()
  }
)

watch([isShow], ([newValue]) => {
  if (!newValue) currentDisplay.value = initValue()
})
</script>

<template>
  <div class="wf_flex wf_justify-center">
    <div class="wf_width-full wf_height-410">
      <div
        v-for="(display, index) in displays"
        :key="index"
        class="wf_width-full wf_grid-span-2 wf_flex wf_items-start wf_justify-between wf-space-x-26 wf-pt-17 wf-pb-18 wf-border-width-b-1 wf-br--g-e-6 wf-color--g-333"
      >
        <span :class="getClass(display === currentDisplay)">{{ `${display}${$t('search.searchDisplayType.displayType')}` }}</span>
        <WelfareRadio name="radio" v-model="currentDisplay" :value="display" />
      </div>
    </div>
    <div class="wf_width-full wf-py-22 wf-px-16 wf_absolute wf-bottom-0">
      <SearchDetailedGroupButton
        :button-title="$t('search.searchCommon.buttonView')"
        :on-click-reset="handleReset"
        :on-click-button="() => $emit('updateDisplayType:methodDisplay', currentDisplay)"
      />
    </div>
  </div>
</template>
