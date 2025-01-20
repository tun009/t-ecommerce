import { MYPAGE_NOTICE, convertTextMaxCount, isAndroid, isIos } from "@/commons"
import { HomeListLNBModel } from "@/models/services/responses/home/HomeResponse"
import { HomeGNBType } from "@/models/views/home/HomeGnbProductModel"
import { MyPageDeliveryMyPageCountModel } from "@/models/views/myPage/MyPageMainMemberModel"
import { homeApi } from "@/services/api/home/HomeGnbApi"
import { mainMember } from "@/services/api/myPage/MainMemberApi"
import { useAccountStore } from "@/stores/account"
import { useGNBStore } from "@/stores/gnb"
import { storeToRefs } from "pinia"
import { computed, onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"
import { useLoading } from "../common/useLoading"

export const useHomeCategoryMenu = () => {
  const router = useRouter()
  const isApp = isAndroid || isIos
  const { setLoading } = useLoading()
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)
  const { getLinkRedirectTo } = useGNBStore()

  const listLinkRedirect = computed(() => [
    {
      name: 'categoryMenu.linkPrice',
      path: getLinkRedirectTo(HomeGNBType.TIMEDEAL)
    },
    {
      name: 'categoryMenu.linkRank',
      path: getLinkRedirectTo(HomeGNBType.BEST)
    },
    {
      name: 'categoryMenu.linkNotify',
      path: MYPAGE_NOTICE
    }
  ])

  const dataCategory = ref<HomeListLNBModel[]>([])
  const deliveryCountState = ref<MyPageDeliveryMyPageCountModel>()

  onBeforeMount(() => {
    setLoading?.(true)
    homeApi
      .getListLNB()
      .then((data) => {
        dataCategory.value = data.data
      })
      .catch(() => { })
      .finally(() => setLoading?.(false))

    mainMember
      .getDeliveryCountState()
      .then((data) => {
        deliveryCountState.value = {
          ...data.data,
          couponCount: convertTextMaxCount(data.data.couponCount),
          inTransitCount: data.data.inTransitCount,
          reviewCount: convertTextMaxCount(data.data.reviewCount)
        }
      })
      .catch(() => { })
  })


  return { router, account, listLinkRedirect, logout: accountStore.logout, dataCategory, deliveryCountState, isApp }
}