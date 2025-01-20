import {
  HomeBannerTop,
  HomeDataTabModel,
  HomeProductMdModel,
  HomeProductNewsModel,
  HomeProductOrderModel
} from '@/models/views/home/HomeGnbProductModel'
import { HomeOrderToDayModel } from '@/models/views/home/HomeOrderToDayModel'
import { HomeProductSpecialPriceModel, HomeProductSpecialPriceProductLgLastModel } from '@/models/views/home/HomeProductSpecialPriceModel'

import { Banner_323_81 } from '@/assets/images'
import { useHandleResponsePagination } from '@/composables/common/useHandleResponsePagination'
import { homeApi } from '@/services/api/home/HomeGnbApi'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useModalBottomSheet } from '../common/useModalBottomSheet'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import HomeBottomBannerPopupVue from '@/components/home/HomeBottomBannerPopup.vue'
import { useStorage } from '../common/useStorage'
import { FO_SHOW_MAIN_POPUP_TIME, POPUP_NAME_TYPE_MAIN } from '@/commons'
import { HomeBottomBannerStorage } from '@/models/services/responses/home/HomeBottomBannerResponse'
import { useLoading } from '../common/useLoading'
import { homePageBottomBannerApi } from '@/services/api/home/HomePageBottomBannerApi'
import { HomeListLNBModel } from '@/models/services/responses/home/HomeResponse'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { OtherCornerSettingModel } from '@/models/views/other/OtherSpecialPriceModel'

export const useHomePage = (idGNB: number) => {
  const productNews = ref<HomeProductNewsModel[]>([])
  const productOrder = ref<HomeProductOrderModel[]>([])
  const productLg = ref<HomeProductSpecialPriceModel>()
  const productOrderToday = ref<HomeOrderToDayModel>()
  const productSm = ref<WelfareUnitProductModel>()
  const listBannerTop = ref<HomeBannerTop[]>([])

  const productMd = ref<HomeProductMdModel>()
  const productLgLast = ref<HomeProductSpecialPriceProductLgLastModel>()
  const dataTab = ref<HomeDataTabModel[]>([])
  const imgBanner = ref<any>([])

  const { setLoading } = useLoading()
  const { showModal, closeModal: closeModalBottomSheet } = useModalBottomSheet()
  const [disappearMainPopup, setDisappearMainPopup] = useStorage<HomeBottomBannerStorage[]>(FO_SHOW_MAIN_POPUP_TIME)

  // mapping data
  const dataCategory = ref<HomeListLNBModel[]>([])
  const gnbDetail = ref<OtherCornerSettingModel[]>([])

  const handleGetDataGNBDetail = (id: number) => {
    setLoading?.(true)
    homeApi.getDisplayConnerGNBDetail(id)
      .then((response) => {
        gnbDetail.value = response.data
      })
      .catch(() => { })
  }


  onBeforeMount(() => {

    homeApi
      .getListLNB()
      .then((data) => {
        dataCategory.value = data.data
      })
      .catch(() => { })

    handleGetDataGNBDetail(idGNB)

    // FAKE DATA
    homeApi
      .getListProductNews()
      .then((data) => {
        productNews.value = data.data
      })
      .catch(() => { })
    homeApi
      .getListProductOrder()
      .then((data) => {
        productOrder.value = data.data
      })
      .catch(() => { })

    homeApi
      .getListProductLg()
      .then((data) => {
        productLg.value = data.data
      })
      .catch(() => { })
    homeApi
      .getListProductLgLast()
      .then((data) => {
        productLgLast.value = data.data
      })
      .catch(() => { })
    homeApi
      .getListDataTab()
      .then((data) => {
        dataTab.value = data.data
      })
      .catch(() => { })
    homeApi
      .getListProductMd()
      .then((data) => {
        productMd.value = data.data
      })
      .catch(() => { })
    homeApi
      .getListProductOrderToday()
      .then((data) => {
        productOrderToday.value = data.data
      })
      .catch(() => { })
    homeApi
      .getListProductSm()
      .then((data) => {
        productSm.value = data.data
      })
      .catch(() => { })
    homeApi
      .getListBannerTop()
      .then((data) => {
        listBannerTop.value = data.data
      })
      .catch(() => { })
  })

  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: Array.from({ length: 10 })
        })
      }, 300)
    })
  }

  const { data, handleLoadMore, refresh } = useHandleResponsePagination(fetchData)

  onMounted(() => {
    refresh()
    showBannerBottom()
  })
  const load = () => {
    try {
      handleLoadMore()
    } catch (err) {
      console.log(err)
    }
  }

  const fetchImg = () => {
    imgBanner.value = Array.from({ length: 10 }).fill(Banner_323_81)
  }
  fetchImg()

  const showBannerBottom = () => {
    setDisappearMainPopup(disappearMainPopup?.value?.filter?.((i) => !i.time || new Date(i.time).getTime() > new Date().getTime()) ?? '')
    setLoading?.(true)
    homePageBottomBannerApi
      .getBanner()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const items = res.data.filter(i => i.popupName?.startsWith(POPUP_NAME_TYPE_MAIN))
          const disappearKeys = disappearMainPopup?.value?.map?.((iStorage) => iStorage.popupKey) ?? []
          if (items.filter((i) => !disappearKeys.includes(i.popupKey ?? 0)).length > 0) {           
            showModal?.({
              type: ModalBottomSheetType.swipeFitContent,
              component: HomeBottomBannerPopupVue,
              hideHeader: true,
              disableDraggingContent: true,
              props: {
                items: items
              },
              events: {
                onClose: closeModalBottomSheet
              }
            })
          }
        }
      })
      .catch(() => { })
      .finally(() => {
        setLoading?.(false)
      })
  }

  return {
    dataTab,
    productMd,
    productNews,
    productOrder,
    load,
    data,
    imgBanner,
    dataCategory,
    productLg,
    productOrderToday,
    productLgLast,
    productSm,
    listBannerTop
  }
}
