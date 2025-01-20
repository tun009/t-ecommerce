import { dataOrderPage } from '@/assets/mockData/orders/mock-data-order-page'
import { getSearchParamUrl } from '@/commons'
import { YesNoEnum } from '@/models/common'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
import { categoryListProductApi } from '@/services/api/categories/CategoryListProductApi'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from '../common/useLoading'
import { useBuildLink } from '../common/useBuildLink'
import { categoryDisplayApi } from '@/services/api/categories/CategoryDisplayApi'

export const useCategoryListImagePage = () => {
  const refTabDeep1 = ref()
  const refTabDeep2 = ref()
  const images = ref()
  const route = useRoute()
  const router = useRouter()
  const maximumRecommendProductItem = 12
  const maximumRecommendPersonalProductItem = 15

  const deep1 = route.query?.category1?.toString() ?? ''

  const deep2 = computed(() => {
    return route.query?.category2?.toString() ?? ''
  })

  const deep3 = computed(() => {
    return route.query?.category3?.toString() ?? ''
  })

  const title = ref<string>('')
  const { setLoading } = useLoading()

  const navigate = useRouter()
  const { processLink } = useBuildLink()
  const categoriesDeep2 = ref<WelfareTabDataType[]>([])
  const categoriesDeep3 = ref<WelfareTabDataType[]>([])

  onMounted(() => {
    handleGetDeep2(deep1)
  })

  const handleGetDeep2 = (id: any) => {
    if (!id) return
    setLoading?.(true)
    categoryListProductApi
      .getCategoryDeep(2, id.toString?.())
      .then((data) => {
        title.value = data.data?.[0].upperDisplayCategoryName
        categoriesDeep2.value = data.data.map((item) => ({ id: item.displayCategoryId, label: item.displayCategoryName }))
      })
      .catch(() => {})
      .finally(() => {
        setLoading?.(false)
      })
  }

  const handleGetDeep3 = (id: any) => {
    if (!id) return
    categoryListProductApi
      .getCategoryDeep(3, id.toString?.(), YesNoEnum.Y)
      .then((data) => {
        categoriesDeep3.value = data.data.map((item) => ({ id: item.displayCategoryId, label: item.displayCategoryName }))
      })
      .catch(() => {})
  }
  const handleChangeParentDeep2 = (item: WelfareTabDataType) => {
    const searchParam = getSearchParamUrl({
      category1: deep1,
      category2: item.id
    })
    navigate.push(processLink(`?${searchParam}`))

    const dataDefault = { id: '', label: '전체' }
    refTabDeep2?.value?.setSelectTab?.(dataDefault)
    handleGetDeep3(item.id)
  }

  const handleChangeParentDeep3 = (item: WelfareTabDataType) => {
    const data: any = {
      category1: deep1,
      category2: deep2.value,
      category3: item.id
    }
    if (!item.id) {
      delete data.category3
    }
    const searchParam = getSearchParamUrl(data)
    navigate.push(processLink(`?${searchParam}`))
  }

  const handleDeep1Mounted = () => {
    if (categoriesDeep2.value.length > 0) {
      const dspCatDeep2 = categoriesDeep2.value[0].id ?? ''
      const params = getSearchParamUrl({
        category1: deep1,
        category2: dspCatDeep2
      })
      navigate.replace(processLink(`?${params}`))

      const data = categoriesDeep2.value.find((item) => item.id === deep2.value) ?? categoriesDeep2.value[0]
      refTabDeep1?.value?.setSelectTab({
        id: data?.id,
        label: data?.label
      })
      handleGetDeep3(dspCatDeep2)
      const bannerDspId = deep3.value || deep2.value || deep1
      if (bannerDspId) {
        getCatDisplayBanner(bannerDspId)
      }
    }
  }

  const handleDeep2Mounted = () => {
    const data = categoriesDeep3.value.find((item) => item.id === deep3.value)
    refTabDeep2?.value?.setSelectTab({
      id: data?.id,
      label: data?.label
    })
  }

  const dataProduct1 = Array.from({ length: maximumRecommendProductItem }).fill(dataOrderPage.relateProduct) as WelfareUnitProductModel[]
  const dataProduct2 = Array.from({ length: maximumRecommendPersonalProductItem }).fill(dataOrderPage.relateProduct) as WelfareUnitProductModel[]

  const isShowBanner = computed(() => {
    return deep1 && deep2.value && deep3.value === ''
  })

  const getCatDisplayBanner = async (cat: string) => {
    const { data } = await categoryDisplayApi.getBannerCategoryList(cat)
    images.value = data
  }

  const handleBannerClick = (idx: number) => {
    const url = images.value?.[idx]?.linkUrl
    const urlObject = new URL(url)
    const path = urlObject.pathname + urlObject.search
    if (url) {
      router.push(processLink(path))
    }
  }

  return {
    categoriesDeep2,
    categoriesDeep3,
    dataProduct1,
    dataProduct2,
    handleChangeParentDeep2,
    handleChangeParentDeep3,
    refTabDeep2,
    refTabDeep1,
    handleDeep1Mounted,
    handleDeep2Mounted,
    deep1,
    deep2,
    deep3,
    isShowBanner,
    title,
    images,
    handleBannerClick
  }
}
