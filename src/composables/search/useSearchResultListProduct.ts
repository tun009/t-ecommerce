import { onMounted, ref } from 'vue'
import { CategoryListProductDisplayType } from '@/models/views/categories/CategoryListProductModel'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { PROFILE_WELFARE_FO, SEARCH_TAP_CONTROLS, storage } from '@/commons'
import { CategoryListProductBenefitType, SearchListProductSortType, CategoryDetailedSearchModalWrapEmits } from '@/models/views/categories/CategorySearchDetailModel'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import SearchDetailedSearchModalWrap from '@/views/search/detailedSearch/SearchDetailedSearchModalWrap.vue'
import { SearchFilterInfoModel } from '@/models/services/responses/search/SearchResponse'
import { useRoute } from 'vue-router'
import { searchApi } from '@/services/api/search/SearchResultApi'

export const useSearchResultListProduct = (emits: CategoryDetailedSearchModalWrapEmits, isHaveFilterControl: boolean) => {
  const route = useRoute()
  const { showModal, closeModal } = useModalBottomSheet()
  const tapActive = ref(SEARCH_TAP_CONTROLS[0])
  const typeDisplay = ref<CategoryListProductDisplayType>(CategoryListProductDisplayType.IMAGE)
  const currentSortSearch = ref<SearchListProductSortType>(SearchListProductSortType.RECOMMEND_SORT)
  const currentBenefits = ref<CategoryListProductBenefitType[]>([])
  const currentBrands = ref<string[]>([])
  const searchFilterInfo = ref<SearchFilterInfoModel>()
  const currentRange = ref([0, 0])
  const currentCategories = ref<string[]>([])

  onMounted(() => {
    if (isHaveFilterControl) {
      const userProfile = storage.get(PROFILE_WELFARE_FO)
      searchApi
        .getSearchFilterInfo(userProfile.memberKey, route.query.keyword?.toString() ?? '')
        .then((response) => {
          if (response.data) {
            searchFilterInfo.value = response.data
            currentRange.value = [response.data.minPrice, response.data.maxPrice]
          }
        })
        .catch(() => { })
    }
  })

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
        currentCategories: currentCategories.value,
        searchFilterInfo: searchFilterInfo.value
      },
      events: {
        onChangeTap: handleChangeTab,
        close: () => {
          closeModal?.()
        },
        'updateDisplayType:methodDisplay': (type: CategoryListProductDisplayType) => {
          typeDisplay.value = type
          emits('updateDisplayType:methodDisplay', type)
          closeModal?.()
        },
        'saveBenefits:methodBenefits': (benefits: CategoryListProductBenefitType[]) => {
          currentBenefits.value = benefits
          emits('saveBenefits:methodBenefits', benefits)
          closeModal?.()
        },
        'updateSort:methodSortSearch': (sort: SearchListProductSortType) => {
          currentSortSearch.value = sort
          emits('updateSort:methodSortSearch', sort)
          closeModal?.()
        },
        'saveBrands:methodBrands': (brands: string[]) => {
          currentBrands.value = brands
          emits('saveBrands:methodBrands', brands)
          closeModal?.()
        },
        'saveRange:methodRange': (range: number[]) => {
          currentRange.value = range
          emits('saveRange:methodRange', range)
          closeModal?.()
        },
        'saveCategories:methodCategory': (categories: string[]) => {
          currentCategories.value = categories
          emits('saveCategories:methodCategory', categories)
          closeModal?.()
        }
      }
    })
  }
  return {
    typeDisplay,
    tapActive,
    currentSortSearch,
    handleChangeTab
  }
}
