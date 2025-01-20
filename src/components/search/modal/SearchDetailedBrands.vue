<script setup lang="ts">
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { defineEmits, ref, watch } from 'vue'
import SearchDetailedGroupButton from '../common/SearchDetailedGroupButton.vue'
import { WelfareCheckbox } from '@/components/uikit/input'
import { SearchDetailBrand, SearchDetailBrandsEmits, SearchDetailBrandsProps } from '@/models/views/search/SearchDetailModel'

const { isShow } = useModalBottomSheet()

const getClass = (value?: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}

const props = defineProps<SearchDetailBrandsProps>()
defineEmits<SearchDetailBrandsEmits>()

const initValue = () => {
  const listBrands = props.searchFilterInfo!.brandList ?? []

  return listBrands.map((brand) => {
    return {
      id: brand.brandId,
      title: brand.brandName,
      count: brand.count,
      checked: props.currentBrands?.includes(brand.brandId)
    }
  })
}
const brands = ref<SearchDetailBrand[]>(initValue())

const handleRemoveChecked = () => {
  brands.value.forEach((b) => (b.checked = false))
}

watch(
  () => props.currentBrands,
  () => {
    brands.value = initValue()
  }
)

watch([isShow], ([newValue]) => {
  if (!newValue) brands.value = initValue()
})
</script>

<template>
  <div class="wf_flex wf_justify-center">
    <div class="wf_width-full wf_height-410 wf_overflow-y-auto">
      <div
        v-for="(brand, index) in brands"
        :key="index"
        class="wf_width-full wf_grid-span-2 wf_flex wf_items-center wf_justify-between wf-space-x-26 wf-pt-16 wf-pb-20 wf-border-width-b-1 wf-br--g-e-6 wf-color--g-333"
      >
        <span class="wf_letter-spacing--1-4 wf_text-wrap" :class="getClass(brand.checked)">{{ brand.title }} ({{ brand.count }})</span>
        <WelfareCheckbox v-model="brand.checked" :value="brand.checked" />
      </div>
    </div>
    <div class="wf_width-full wf-py-22 wf-px-16 wf_absolute wf-bottom-0">
      <SearchDetailedGroupButton
        :button-title="$t('search.searchCommon.buttonView')"
        :on-click-reset="handleRemoveChecked"
        :on-click-button="
          () =>
            $emit(
              'saveBrands:methodBrands',
              brands.filter((b) => b.checked === true).map((b) => b.id)
            )
        "
      />
    </div>
  </div>
</template>
