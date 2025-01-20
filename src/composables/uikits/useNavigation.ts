import { CATEGORY_MENU_ROUTER, MYPAGE_MAIN_PAGE, MYPAGE_PRODUCT_RECENTLY_ROUTER } from '@/commons'
import IconAccount from '@/components/icons/navigation/IconAccount.vue'
import IconClock from '@/components/icons/navigation/IconClock.vue'
import IconHomeNavigation from '@/components/icons/navigation/IconHomeNavigation.vue'
import IconMenuNavigation from '@/components/icons/navigation/IconMenuNavigation.vue'
import { HomeGNBType } from '@/models/views/home/HomeGnbProductModel'
import { useGNBStore } from '@/stores/gnb'
import { computed, ref } from 'vue'

export const useNavigation = () => {
  const { getLinkRedirectTo } = useGNBStore()
  const listNavigation = computed(() => [
    {
      icon: IconMenuNavigation,
      name: '카테고리',
      path: CATEGORY_MENU_ROUTER
    },
    {
      icon: IconClock,
      name: '오늘의 특가',
      path: getLinkRedirectTo(HomeGNBType.TIMEDEAL)
    },
    {
      icon: IconHomeNavigation,
      name: '홈',
      path: '/'
    },
    {
      icon: IconAccount,
      name: '마이페이지',
      path: MYPAGE_MAIN_PAGE
    },
    {
      name: '최근본상품',
      path: MYPAGE_PRODUCT_RECENTLY_ROUTER
    }
  ])

  // watch(() => route.path, () => {
  //   currentIndex.value = listNavigation.findIndex(i => route.path.startsWith(i.path))
  // })

  const currentIndex = ref(2)

  return {
    listNavigation,
    currentIndex
  }
}
