import { useScrollNavigation } from '@/composables/uikits/useScrollNavigation'
import { watch, onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { HomeBottomBannerModal } from '@/models/services/responses/home/HomeBottomBannerResponse'
import { homePageBottomBannerApi } from '@/services/api/home/HomePageBottomBannerApi'
import { HOMEPAGE_ROUTER, POPUP_NAME_TYPE_FLOAT } from '@/commons'

export const useWelfareFooterWrapper = () => {
  const bannerFloat = ref<HomeBottomBannerModal[]>([])
  const route = useRoute()
  const showFooter = ref()
  const showFooterNavigation = ref()
  const showNavigationBar = ref()

  onMounted(() => {
    getBannerFloat()
    handleChangeLayout()
  })

  const isHomePage = computed(() => route.path == HOMEPAGE_ROUTER)

  watch(
    () => route.path,
    () => {
      handleChangeLayout()
    }
  )

  const getBannerFloat = () => {
    homePageBottomBannerApi.getBanner().then((res) => {
      if (res.data && res.data.length > 0) {
        bannerFloat.value = res.data.filter((i) => i.popupName?.startsWith(POPUP_NAME_TYPE_FLOAT))
      }
    })
  }

  const handleChangeLayout = () => {
    showFooter.value = route?.meta?.footer !== undefined
    // @ts-ignore
    showFooterNavigation.value = !!route?.meta?.footer?.showNavigation
    showNavigationBar.value = route?.meta?.navigationBar
  }
  useScrollNavigation()

  return {
    showNavigationBar,
    isHomePage,
    bannerFloat,
    showFooterNavigation,
    showFooter,
  }
}