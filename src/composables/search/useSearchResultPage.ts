import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { computed, onMounted, ref, watch } from 'vue'
import { dataSearchPage } from '@/assets/mockData/search/mock-data-search-page'
import { useRoute, useRouter } from 'vue-router'
import { searchApi } from '@/services/api/search/SearchResultApi'
import { PAGE_SIZE_20, SEARCH_ROUTER, getImageProduct } from '@/commons'
import { useBuildLink } from '../common/useBuildLink'
import { SearchExhibitionModel, SearchProductBannerModel } from '@/models/services/responses/search/SearchResponse'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { SearchOptionsModel } from '@/models/views/cart/SearchResultModel'
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
import { useHandleResponsePagination } from '../common/useHandleResponsePagination'
import { useLoading } from '../common/useLoading'
import { CategoryListProductBenefitType, SearchListProductSortType } from '@/models/views/categories/CategorySearchDetailModel'
import { YesNoEnum } from '@/models/common'

export const useSearchResultPage = () => {
  const route = useRoute()
  const router = useRouter()
  const { setLoading } = useLoading()
  const { processLink } = useBuildLink()
  const bannerResult = ref<SearchProductBannerModel[]>([])
  // TODO: mock data and fake size to display looks like figma
  const recommendProducts = ref<WelfareUnitProductModel[]>([])
  const mostPurchasedProducts = ref<WelfareUnitProductModel[]>([])
  const productsSimilar = ref<WelfareUnitProductModel[]>([])
  const productsPurchased = ref<WelfareUnitProductModel[]>([])
  const searchRelatedProducts = ref<WelfareUnitProductModel[]>([])
  const relatedTerms = ref<WelfareTabDataType[]>([])
  const specialExhibitionEventImages = ref<SearchExhibitionModel[]>([])

  const keyword = computed(() => {
    const word = route.query?.keyword?.toString() ?? ''
    if (word.length === 0) handleChangeToSearchPage('')
    return word
  })

  const size = 3
  const isExpanded = ref(false)
  const displayType = ref('')
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)

  const firstLoadedItems = ref()

  const currentSortSearch = ref<SearchListProductSortType>(SearchListProductSortType.RECOMMEND_SORT)
  const currentBenefits = ref<CategoryListProductBenefitType[]>([])
  const currentBrands = ref<string[]>([])
  const currentRange = ref([0, 0])
  const currentCategories = ref<string[]>([])

  onMounted(async () => {
    const response = await refresh()
    firstLoadedItems.value = response.data
    await handleGetExhibitionEventImages(account.value?.memberKey ?? 0)
    handleGetRelatedProducts()
    handleGetRelatedTerms()
    handleGetRecommendProducts()
    handleGetProductsPurchased()
    handleGetMostPurchasedProducts()
    handleGetProductsSimilar()
    handleGetBannerResult()
  })

  const handleChangeToSearchPage = (keyword: string) => {
    router.push(processLink(`${SEARCH_ROUTER}?keyword=${keyword}`))
  }

  const handleGetProductsResult = async (page: number, size: number) => {
    const request: SearchOptionsModel = {
      pageNum: page + 1,
      rowSize: size,
      customerKey: account.value?.memberKey ?? 0,
      searchWord: keyword.value,
      sortType: currentSortSearch.value,
      discountCouponYn: currentBenefits.value.includes(CategoryListProductBenefitType.COUPON) ? YesNoEnum.Y : YesNoEnum.N,
      freeDeliveryYn: currentBenefits.value.includes(CategoryListProductBenefitType.FREE_DELIVERY) ? YesNoEnum.Y : YesNoEnum.N,
      freeInterestYn: currentBenefits.value.includes(CategoryListProductBenefitType.FREE_INTEREST) ? YesNoEnum.Y : YesNoEnum.N
    }

    if (currentRange.value[0]) {
      request.minPrice = currentRange.value[0]
    }

    if (currentRange.value[1]) {
      request.maxPrice = currentRange.value[1]
    }

    if (currentBrands.value.length > 0) {
      request.brandIds = currentBrands.value.join()
    }

    if (currentCategories.value.length > 0) {
      request.displayCategoryIds = currentCategories.value.join()
    }

    return searchApi.getListSearchProduct(request).then((res) => {
      const data = res.data.map((item) => {
        return {
          // TODO: 3 fields does not know which field to map
          titleDayWarning: undefined,
          thumbnailBo: undefined,
          buyers: [],
          rateStar: item.reviewPoint ?? 0,
          rateCountStar: item.reviewCount ?? 0,
          buyerCount: item.orderCount ?? 0,
          id: item.productKey,
          thumbnailProduct: item.imageUrl ?? getImageProduct(item.filePathName, item.fileName),
          pricePromotion: item.discountAmount != 0 ? item.discountPrice : undefined,
          inventoryQuantity: item.orderCount ?? 0,
          price: item.salePrice,
          percent: item.discountAmount != 0 ? item.discountPrice / item.salePrice : undefined,
          name: item.productName,
          productLikeYn: item.productLikeYn
        }
      })
      return {
        ...res,
        data
      }
    })
  }

  const handleGetExhibitionEventImages = async (customerKey: number) => {
    const data = await searchApi.getExhibitionEventImages(customerKey, keyword.value)
    if (data.data.length) {
      specialExhibitionEventImages.value = data.data
    } else {
      specialExhibitionEventImages.value = []
    }
  }

  const changeMethodDisplay = (type: string) => {
    displayType.value = type
  }

  const handleGetRelatedTerms = () => {
    // mock data
    relatedTerms.value = dataSearchPage.tabSearch
  }
  const handleGetRecommendProducts = () => {
    // mock data
    recommendProducts.value = mockDataProduct()
  }
  const handleGetMostPurchasedProducts = () => {
    // mock data
    mostPurchasedProducts.value = mockDataProduct()
  }
  const handleGetProductsSimilar = () => {
    // mock data
    productsSimilar.value = mockDataProduct()
  }
  const handleGetProductsPurchased = () => {
    // mock data
    productsPurchased.value = mockDataProduct()
  }

  const handleGetBannerResult = () => {
    searchApi.getListSearchProductBanner(keyword.value).then((res) => {
      bannerResult.value = res.data
    })
  }

  const toggleExpandImg = () => {
    isExpanded.value = !isExpanded.value
  }

  const handleGetRelatedProducts = () => {
    // mock data
    searchRelatedProducts.value = mockDataProduct()
  }

  const mockDataProduct = () => {
    return Array.from({ length: 10 }).fill(dataSearchPage.relateProduct) as WelfareUnitProductModel[]
  }

  const { data, isLoading, isLoadMore, hasMore, handleLoadMore, refresh, pullToRefresh } = useHandleResponsePagination<WelfareUnitProductModel>(
    handleGetProductsResult,
    PAGE_SIZE_20
  )

  watch([currentBenefits, currentSortSearch, currentBrands, currentRange, currentCategories], () => {
    pullToRefresh()
  })

  watch(isLoading, () => setLoading?.(isLoading.value))

  return {
    firstLoadedItems,
    bannerResult,
    recommendProducts,
    productsResult: data,
    mostPurchasedProducts,
    productsSimilar,
    productsPurchased,
    searchRelatedProducts,
    specialExhibitionEventImages,
    isExpanded,
    keyword,
    relatedTerms,
    size,
    handleChangeToSearchPage,
    changeMethodDisplay,
    displayType,
    toggleExpandImg,
    isLoading,
    isLoadMore,
    loadInfinite: handleLoadMore,
    hasMore,
    currentBenefits,
    currentSortSearch,
    currentBrands,
    currentRange,
    currentCategories
  }
}
