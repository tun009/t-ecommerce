import { HomeBottomBannerModal, HomeBottomBannerStorage, HomeNonDisplayPeriodType } from "@/models/services/responses/home/HomeBottomBannerResponse"
import { computed, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useStorage } from "../common/useStorage"
import { FO_SHOW_MAIN_POPUP_TIME, MAXIMUM_MAIN_BOTTOM_POPUP, getForwardDate } from "@/commons"
import { BaseModalEmits } from "@/models/widgets/modal"
import { useRoute } from "vue-router"

export const useHomeBottomBannerPopup = (items: HomeBottomBannerModal[], emits: BaseModalEmits) => {

  const { t } = useI18n()
  const router = useRoute()
  const closeClick = ref(0)
  const hideClick = ref(0)
  const sameKeyItems = computed(() => {
    return items?.filter(i => i.popupKey === showKey.value) ?? []
  })
  const nonDisplayPeriod = computed(() => {
    return sameKeyItems.value?.[0]?.nonDisplayPeriodType ?? HomeNonDisplayPeriodType.UNUSED
  })
  const [disappearMainPopup, setDisappearMainPopup] = useStorage<HomeBottomBannerStorage[]>(FO_SHOW_MAIN_POPUP_TIME)
  const hideKeys = computed(() => {
    return disappearMainPopup?.value?.map?.(i => i.popupKey) ?? []
  })

  const showKeys = computed(() => {
    return Array.from(new Set(items?.filter(i => !hideKeys.value.includes(i.popupKey ?? 0)).map(i => i.popupKey) ?? []))
  })
  const showKey = ref(showKeys.value[showKeys.value.length - 1])

  const btnTextNonDisplayPeriod = computed(() => {
    switch (nonDisplayPeriod.value) {
      case HomeNonDisplayPeriodType.DAY:
        return t('homeBannerBottom.btnStopWatch')
      case HomeNonDisplayPeriodType.WEEK:
        return t('homeBannerBottom.btnStopWatchForWeek')
      case HomeNonDisplayPeriodType.CONTINUE:
        return t('homeBannerBottom.btnNoLook')
      default:
        return ''
    }
  })


  const handleClickDisappear = (hide = true) => {
    if (hide) hideClick.value += 1
    else closeClick.value += 1

    if (hide) {
      let time: any = ''
      switch (nonDisplayPeriod.value) {
        case HomeNonDisplayPeriodType.DAY:
          time = getForwardDate()
          break
        case HomeNonDisplayPeriodType.WEEK:
          time = getForwardDate(7) // 7: a week
      }

      setDisappearMainPopup([...(disappearMainPopup?.value ?? []), {
        popupKey: showKey.value,
        time: time
      }])
    }

    if (hideClick.value + closeClick.value < MAXIMUM_MAIN_BOTTOM_POPUP && showKeys.value && showKeys.value.length - 1 - closeClick.value >= 0) {
      showKey.value = showKeys.value[showKeys.value.length - 1 - closeClick.value]
    } else {
      emits('onClose')
    }
  }

  watch(() => router.fullPath, () => {
    emits('onClose')
  })

  return { items, nonDisplayPeriod, btnTextNonDisplayPeriod, handleClickDisappear, sameKeyItems, showKey, showKeys }
}