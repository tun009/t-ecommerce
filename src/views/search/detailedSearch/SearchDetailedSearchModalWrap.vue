<!--FO_MC_SE033010P, FO_MC_SE033011P, FO_MC_SE033012P, FO_MC_SE033020P, FO_MC_SE033030P, FO_MC_SE033040P, FO_MC_SE033041P, FO_MC_SE033050P, FO_MC_SE033060P, FO_MC_SE033070P-->
<script setup lang="ts">
import { SEARCH_TAP_CONTROLS, defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import SearchTapControl from '@/components/search/SearchTapControl.vue'
import SearchDetailedBenefits from '@/components/search/modal/SearchDetailedBenefits.vue'
import SearchDetailedBrands from '@/components/search/modal/SearchDetailedBrands.vue'
import SearchDetailedCategory from '@/components/search/modal/SearchDetailedCategory.vue'
import SearchDetailedImage from '@/components/search/modal/SearchDetailedImage.vue'
import SearchDetailedPriceRange from '@/components/search/modal/SearchDetailedPriceRange.vue'
import SearchDetailedSort from '@/components/search/modal/SearchDetailedSort.vue'
import { CategoryDetailedSearchModalProps, CategoryDetailedSearchModalWrapEmits } from '@/models/views/categories/CategorySearchDetailModel'
import { onMounted } from 'vue'

defineEmits<CategoryDetailedSearchModalWrapEmits>()
const props = defineProps<CategoryDetailedSearchModalProps>()
const tabs = [
  {
    label: SEARCH_TAP_CONTROLS[0],
    component: SearchDetailedCategory
  },
  {
    label: SEARCH_TAP_CONTROLS[1],
    component: SearchDetailedPriceRange
  },
  {
    label: SEARCH_TAP_CONTROLS[2],
    component: SearchDetailedImage
  },
  {
    label: SEARCH_TAP_CONTROLS[3],
    component: SearchDetailedBenefits
  },
  {
    label: SEARCH_TAP_CONTROLS[4],
    component: SearchDetailedBrands
  },
  {
    label: SEARCH_TAP_CONTROLS[5],
    component: SearchDetailedSort
  }
]
onMounted(() => {
  document.querySelector('.bottom-sheet__draggable-area')?.classList.add('wf-py-16--i', 'wf_flex', 'wf_items-center')
})
</script>

<template>
  <div class="wf-mx-auto wf_width-full wf-mt-12">
    <div class="relative wf_flex wf_flex-col wf-space-y-12 wf_height-full wf-px-16">
      <div class="wf_flex wf-space-x-5" v-if="props.activated !== SEARCH_TAP_CONTROLS[5]">
        <SearchTapControl :active-tap="$props.activated" :type-sort="props.currentSortSearch" @on-change-tap="(tap) => $emit('onChangeTap', tap)" />
      </div>
      <div v-if="props.activated === SEARCH_TAP_CONTROLS[5]" class="wf_flex wf_flex-center wf-relative wf_width-full wf-pt-26 wf-pb-8">
        <span class="wf-font_16-bold-lh1">정렬</span>
        <div class="wf-absolute wf-right-0">
          <button @click="$emit('close')" class="wf_flex wf_items-start">
            <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
          </button>
        </div>
      </div>
      <component
        :is="tabs[tabs.findIndex((tab) => tab.label === props.activated)].component"
        @updateDisplayType:methodDisplay="(value: any) => $emit('updateDisplayType:methodDisplay', value)"
        @updateSort:methodSortSearch="(value: any) => $emit('updateSort:methodSortSearch', value)"
        @saveBenefits:methodBenefits="(value: any) => $emit('saveBenefits:methodBenefits', value)"
        @saveBrands:methodBrands="(value: any) => $emit('saveBrands:methodBrands', value)"
        @saveRange:methodRange="(value: any) => $emit('saveRange:methodRange', value)"
        @saveCategories:methodCategory="(value: any) => $emit('saveCategories:methodCategory', value)"
        :haveCoupon="true"
        :currentBrands="props.currentBrands"
        :currentSortSearch="props.currentSortSearch"
        :currentMethodDisplay="props.currentMethodDisplay"
        :currentBenefits="props.currentBenefits"
        :currentRange="props.currentRange"
        :currentCategories="props.currentCategories"
        :searchFilterInfo="props.searchFilterInfo"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/categories/_welfare-category-search-detail-benefits.scss');
</style>
