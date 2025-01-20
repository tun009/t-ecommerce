import { CATEGORY_TAP_CONTROLS, PAGE_SIZE_20 } from '@/commons'
import { CategoryListProductProps } from '@/components/categories/CategoryListProduct.vue'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { CategoryProductSearchListRequest } from '@/models/services/requests/categories/CategoryListProductRequest'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { CategoryListProductDisplayType } from '@/models/views/categories/CategoryListProductModel'
import {
  CategoryListProductBenefitType,
  CategoryListProductSortType,
  CategorySearchProductSortOptions
} from '@/models/views/categories/CategorySearchDetailModel'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import { searchApi } from '@/services/api/search/SearchResultApi'
import { useAccountStore } from '@/stores/account'
import CategoryDetailedSearchModal from '@/views/categories/modal/CategoryDetailedSearchModalWrap.vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useHandleResponsePagination } from '../common/useHandleResponsePagination'
import { useLoading } from '../common/useLoading'
import { YesNoEnum } from '@/models/common'

export const useCategoryListProduct = (props: CategoryListProductProps) => {
  const { setLoading } = useLoading()
  const { showModal, closeModal } = useModalBottomSheet()
  const tapActive = ref(CATEGORY_TAP_CONTROLS[0])
  const typeDisplay = ref<CategoryListProductDisplayType>(CategoryListProductDisplayType.IMAGE)
  const currentSort = ref<CategoryListProductSortType>(CategoryListProductSortType.POPULARITY_SORT)
  const currentBenefits = ref<CategoryListProductBenefitType[]>([])
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)
  const handleGetProduct = (page: number, size: number) => {
    const request: CategoryProductSearchListRequest = {
      pageNum: page + 1,
      rowSize: size,
      displayCategoryId: props.categoryIdDepth3 || props.categoryIdDepth2 || props.categoryIdDepth1 || '',
      sortType: CategorySearchProductSortOptions.find((it) => it.label === currentSort.value)?.value,
      customerKey: account.value?.memberKey?.toString() || ''
    }
    return searchApi.searchCategoryProduct(request).then((res) => {
      const data = res.data.map((data) => {
        const percent = data.discountAmount / data.salePrice
        return {
          // TODO: 3 field exits in figma but not exits in SB, MZ said need confirm, so hard code to display looks like figma
          benefits: ['무료배송', '무이자'],
          rateStar: data?.reviewPoint,
          rateCountStar: data?.reviewCount,
          productLikeYn: data?.productLikeYn,
          freeDeliveryYn: data?.freeDeliveryYn,
          freeInterestYn: data?.freeInterestYn,
          // integrate api
          id: data?.productKey,
          name: data.productName,
          price: data.salePrice,
          pricePromotion: data.discountAmount !== 0 ? data.discountPrice : undefined,
          percent: percent,
          thumbnailProduct: data.imageUrl,
          productType: data.productType,
          productClassification: data.productClassification
        }
      })
      return {
        ...res,
        data
      }
    })
  }

  const { data, isLoading, hasMore, handleLoadMore, refresh, pullToRefresh, setData } = useHandleResponsePagination<WelfareUnitProductModel>(
    handleGetProduct,
    PAGE_SIZE_20
  )

  watch(isLoading, () => setLoading?.(isLoading.value))

  onMounted(() => {
    refresh()
  })

  watch(
    () => [props.categoryIdDepth1, props.categoryIdDepth2, props.categoryIdDepth3],
    () => {
      pullToRefresh()
    }
  )
  watch(currentSort, () => {
    refresh()
  })

  const handleChangeTab = (tap: string) => {
    tapActive.value = tap
    showModal?.({
      type: ModalBottomSheetType.swipeFitContent,
      component: CategoryDetailedSearchModal,
      hideHeader: tapActive.value === CATEGORY_TAP_CONTROLS[0],
      props: {
        activated: tapActive.value,
        currentMethodDisplay: typeDisplay.value,
        currentSort: currentSort.value,
        currentBenefits: currentBenefits.value
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
        'updateSort:methodSort': (sort: CategoryListProductSortType) => {
          currentSort.value = sort
          closeModal?.()
        }
      }
    })
  }

  const toggleLike = (id: string | number) => {
    setData?.(
      data.value.map((it) => {
        if (it.id === id) {
          return {
            ...it,
            productLikeYn: it.productLikeYn === YesNoEnum.Y ? YesNoEnum.N : YesNoEnum.Y
          }
        }
        return it
      })
    )
  }

  return {
    tapActive,
    typeDisplay,
    currentSort,
    products: data,
    handleChangeTab,
    loadInfinite: handleLoadMore,
    hasMore,
    toggleLike
  }
}
