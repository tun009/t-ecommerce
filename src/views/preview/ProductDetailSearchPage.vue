<script setup lang="ts">
import { SEARCH_TAP_CONTROLS } from '@/commons'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { CategoryListProductDisplayType } from '@/models/views/categories/CategoryListProductModel'
import { CategoryListProductBenefitType, SearchListProductSortType } from '@/models/views/categories/CategorySearchDetailModel'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import { ref } from 'vue'
import SearchDetailedSearchModalWrap from '../search/detailedSearch/SearchDetailedSearchModalWrap.vue'
import SearchTapControl from '@/components/search/SearchTapControl.vue'

const { showModal, closeModal } = useModalBottomSheet()
const tapActive = ref(SEARCH_TAP_CONTROLS[0])
const typeDisplay = ref<CategoryListProductDisplayType>(CategoryListProductDisplayType.IMAGE)
const currentSortSearch = ref<SearchListProductSortType>(SearchListProductSortType.RECOMMEND_SORT)
const currentBenefits = ref<CategoryListProductBenefitType[]>([])
const currentBrands = ref<number[]>([])
const currentRange = ref([0, 1000])
const currentCategories = ref<string[]>(['0', '1'])

const handleChangeTab = (tap: string) => {
  tapActive.value = tap
  showModal?.({
    type: ModalBottomSheetType.swipeFitContent,
    component: SearchDetailedSearchModalWrap,
    hideHeader: tap === SEARCH_TAP_CONTROLS[5],
    disableDraggingContent: true,
    props: {
      activated: tap,
      currentMethodDisplay: typeDisplay.value,
      currentSortSearch: currentSortSearch.value,
      currentBenefits: currentBenefits.value,
      currentBrands: currentBrands.value,
      currentRange: currentRange.value,
      currentCategories: currentCategories.value
    },
    events: {
      onChangeTap: handleChangeTab,
      close: () => {
        closeModal?.()
      },
      'updateDisplayType:methodDisplay': (type: CategoryListProductDisplayType) => {
        typeDisplay.value = type
        closeModal?.()
      },
      'saveBenefits:methodBenefits': (benefits: CategoryListProductBenefitType[]) => {
        currentBenefits.value = benefits
        closeModal?.()
      },
      'updateSort:methodSortSearch': (sort: SearchListProductSortType) => {
        currentSortSearch.value = sort
        closeModal?.()
      },
      'saveBrands:methodBrands': (brands: number[]) => {
        currentBrands.value = brands
        closeModal?.()
      },
      'saveRange:methodRange': (range: number[]) => {
        currentRange.value = range
        closeModal?.()
      },
      'saveCategories:methodCategory': (categories: string[]) => {
        currentCategories.value = categories
        closeModal?.()
      }
    }
  })
}
</script>
<template>
  <SearchTapControl :active-tap="tapActive" :type-sort="currentSortSearch" @on-change-tap="handleChangeTab" />
</template>
