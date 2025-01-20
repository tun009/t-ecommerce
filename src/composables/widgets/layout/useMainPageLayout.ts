import { useScrollNavigation } from '@/composables/uikits/useScrollNavigation'
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
import { HomeBannerTop, HomeGNBModel, HomeGNBType } from '@/models/views/home/HomeGnbProductModel'
import { useGNBStore } from '@/stores/gnb'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useMainPageLayout = () => {
  const listBannerTop = ref<HomeBannerTop[]>([])
  const isDart = ref(true)
  const refDivTarget = ref<HTMLDivElement>()
  const { listGNBData } = storeToRefs(useGNBStore())

  const route = useRoute()
  const navigate = useRouter()

  const onScroll = () => {
    if (refDivTarget.value) {
      const { y } = refDivTarget.value.getBoundingClientRect()
      if (y < 0 && isDart.value) {
        isDart.value = false
      } else if (y >= 0 && !isDart.value) {
        isDart.value = true
      }
    }
  }
  useScrollNavigation(onScroll)

  const listConvertGNB = computed(() => {
    return listGNBData.value.map((item) => {
      return {
        id: getId(item),
        label: item.mainTitleName
      }
    })
  })

  const currentActiveTab = computed(() => {
    const index = route.query?.idx
    const isMain = !index || listGNBData.value?.[+index]?.gnbGroupType === HomeGNBType.MAIN
    if (isMain) {
      return listGNBData.value?.find((item) => item.gnbGroupType === HomeGNBType.MAIN)
    }
    return listGNBData.value?.[+index]
  })

  const handleChangeTab = (data: WelfareTabDataType) => {
    navigate?.push({
      path: '/',
      query: {
        idx: listGNBData.value.findIndex((item) => getId(item) == data.id)
      }
    })
  }

  const defaultTab = computed(() => {
    return currentActiveTab.value ? { id: getId(currentActiveTab.value), label: currentActiveTab.value.mainTitleName } : undefined
  })

  const getId = (item: HomeGNBModel) => {
    return `${item.gnbGroupKey}-${item.gnbDisplayKey}`
  }

  return { isDart, refDivTarget, listBannerTop, listConvertGNB, currentActiveTab, handleChangeTab, defaultTab }
}
