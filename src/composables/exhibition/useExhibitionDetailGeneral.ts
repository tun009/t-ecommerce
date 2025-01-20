import { EXHIBITION_DETAIL_GROUP, getSearchParamUrl } from '@/commons'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
import {
  ExhibitionCategoryItemModel,
  ExhibitionCouponModel,
  ExhibitionInformationModel,
  ExhibitionMarketingInformationModel
} from '@/models/views/exhibition/ExhibitionDetailGroupModel'
import { exhibitionDetailGroupApi } from '@/services/api/exhibition/ExhibitionDetailGroupApi'
import { orderApi } from '@/services/api/order/OrderApi'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from '../common/useLoading'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { onBeforeUnmount } from 'vue'

export interface ExhibitionDetailGroupParamsModel {
  exhibitionKey: string
  exhibitionCornerKey?: string
}

export function useScrollPosition() {
  const scrollPosition = ref(0)

  const handleScroll = () => {
    scrollPosition.value = window.scrollY
  }
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return scrollPosition
}

export const useExhibitionDetailGeneral = () => {
  const route = useRoute()
  const router = useRouter()
  const { setLoading } = useLoading()
  const { processLink } = useBuildLink()
  const { openModal } = useModalNotification()
  const { t } = useI18n()
  const position = useScrollPosition()
  const defaultSelect = ref<WelfareSelectDataModel>({} as WelfareSelectDataModel)
  const defaultTab = ref<WelfareTabDataType>({} as WelfareTabDataType)
  const query = route.query as unknown as ExhibitionDetailGroupParamsModel
  const categoryList = ref<ExhibitionCategoryItemModel[]>([])
  const productList = ref<WelfareUnitProductModel[]>([])
  const couponList = ref<ExhibitionCouponModel[]>([])
  const exhibitionInformation = ref<ExhibitionInformationModel>({} as ExhibitionInformationModel)
  const exhibitionMarketingInformation = ref<ExhibitionMarketingInformationModel>({} as ExhibitionMarketingInformationModel)
  const { exhibitionKey } = query
  const exhibitionCornerKey = ref<number>(0)
  const productRef = ref()
  const productPostionTop = ref<number>(0)
  const positonCategory = ref<{ [k: string | number]: number }>()

  const categoryType = computed(() => {
    return categoryList.value?.[0]?.exhibitionFormType
  })

  const handleGetItemListByCategory = async (exhibitionCornerKey: number | string) => {
    try {
      const { data } = await exhibitionDetailGroupApi.getItemListByCategory(exhibitionCornerKey)
      const dataMapping = data.map((item) => {
        return {
          id: item.productKey,
          thumbnailProduct: item.imageUrl,
          name: item.productName,
          percent: item.discountAmount != 0 ? item.discountPrice / item.salePrice : undefined,
          price: item.salePrice,
          pricePromotion: item.discountPrice,
          rateCountStar: item.reviewCount,
          rateStar: item.reviewPoint,
          thumbnailBo: undefined,
          inventoryQuantity: item.orderCount,
          titleDayWarning: undefined
        } as WelfareUnitProductModel
      })
      productList.value = dataMapping
    } catch (error) {
      /* empty */
    }
  }

  const handleGetCategoryList = async () => {
    try {
      const { data } = await exhibitionDetailGroupApi.getCategoryList(exhibitionKey)
      categoryList.value = data
      const positionConvert = Object.fromEntries(data.map((item) => [item.exhibitionCornerKey, 0]))
      positonCategory.value = positionConvert
      const tabDefault = data.find((item) => item.exhibitionCornerKey.toString() === query.exhibitionCornerKey) ?? data?.[0]
      exhibitionCornerKey.value = tabDefault.exhibitionCornerKey
      if (!tabDefault) return
      defaultTab.value = {
        id: tabDefault?.exhibitionCornerKey?.toString() ?? '',
        label: tabDefault?.cornerName ?? ''
      }
      defaultSelect.value = {
        value: tabDefault?.exhibitionCornerKey,
        label: tabDefault?.cornerName ?? ''
      }
      handleChangeTab(defaultTab.value.id)
    } catch (error) {
      /* empty */
    }
  }

  const handleGetExhibitionInformation = async () => {
    try {
      const { data } = await exhibitionDetailGroupApi.getExhibitionInfo(exhibitionKey)
      exhibitionInformation.value = data
    } catch (error) {
      /* empty */
    }
  }

  const handleGetExhibitionMarketingInformation = async () => {
    try {
      const { data } = await exhibitionDetailGroupApi.getExhibitionMarketingInfo(exhibitionKey)
      exhibitionMarketingInformation.value = data
    } catch (error) {
      /* empty */
    }
  }

  onMounted(async () => {
    try {
      setLoading?.(true)
      await handleGetCategoryList()
      await handleGetExhibitionInformation()
      await handleGetCoupon()
      await handleGetExhibitionMarketingInformation()
      if (productRef.value) {
        const { top } = productRef.value.getBoundingClientRect()
        productPostionTop.value = top
      }
    } catch (error) {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  })

  const categorySelectOptions = computed((): WelfareSelectDataModel[] => {
    return categoryList.value.map((category) => {
      return {
        label: category.cornerName,
        value: category.exhibitionCornerKey
      } as WelfareSelectDataModel
    })
  })

  const categoryTabOptions = computed(() => {
    return categoryList.value.map((category) => {
      return {
        label: category.cornerName,
        id: category.exhibitionCornerKey.toString()
      } as WelfareTabDataType
    })
  })

  const handleChangeTab = async (id: string | number) => {
    const searchParam = getSearchParamUrl({
      ...query,
      exhibitionCornerKey: id
    })
    positonCategory.value = {
      ...positonCategory.value,
      [exhibitionCornerKey.value]: position.value
    }
    router.replace(processLink(EXHIBITION_DETAIL_GROUP + '?' + `${searchParam}`))
    try {
      setLoading?.(true)
      await handleGetItemListByCategory(id)
      exhibitionCornerKey.value = id as number
      if (Math.floor(position.value) < Math.floor(productPostionTop.value)) return
      handleScrollProduct(
        positonCategory.value[exhibitionCornerKey.value] > 0 ? positonCategory.value[exhibitionCornerKey.value] : productPostionTop.value
      )
    } catch (error) {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  }

  const handleScrollProduct = (top: number) => {
    window.scrollTo({
      top,
      left: 0,
      behavior: 'smooth'
    })
  }

  const handleShareSnsLink = () => {
    navigator.share({
      url: window.location.href
    })
  }

  const handleGetCoupon = async () => {
    try {
      const { data } = await exhibitionDetailGroupApi.getCouponInfo(exhibitionKey)
      if (!data.coupons.length) return
      couponList.value = data.coupons
    } catch (error) {
      /* empty */
    }
  }

  const handleDownloadCoupon = async (couponKey: number) => {
    try {
      await orderApi.downloadCoupon(couponKey)
      openModal?.({
        content: t('exhibition.bannerGroupInfo.getCouponSuccess')
      })
    } catch (error) {
      openModal?.({
        content: t('exhibition.bannerGroupInfo.getCouponFail')
      })
    }
  }

  return {
    categorySelectOptions,
    categoryTabOptions,
    categoryType,
    productList,
    handleChangeTab,
    defaultTab,
    exhibitionInformation,
    exhibitionMarketingInformation,
    handleShareSnsLink,
    handleDownloadCoupon,
    couponList,
    defaultSelect,
    productRef
  }
}
