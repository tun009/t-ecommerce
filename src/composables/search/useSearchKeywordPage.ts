import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { useStorage } from '../common/useStorage'
import { RECENTLY_SEARCH_FO, SAVE_SEARCH_FO, SEARCH_RECENTLY_SIZE_20, SEARCH_RESULT_ROUTER } from '@/commons'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useBuildLink } from '../common/useBuildLink'
import { searchApi } from '@/services/api/search/SearchResultApi'

export const useSearchKeywordPage = () => {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const { processLink } = useBuildLink()
  const { openModal, closeModalByPop } = useModalNotification()
  const [isSaveSearch, setIsSaveSearch] = useStorage<boolean>(SAVE_SEARCH_FO)

  const currentDate = ref(new Date())
  const deleteItemMode = ref(false)
  const [recentlyItems, setRecentlyItems] = useStorage<string[]>(RECENTLY_SEARCH_FO)
  const popularItems = ref([
    '한우갈비세트',
    '신세계 상품권 10만원',
    '참치캔',
    '크록스',
    '나이키운동화',
    '버번 위스키',
    '이경제 흑염소',
    '문화상품권 5만원',
    '스팸명절선물세트',
    '설화수 에센스'
  ])

  const keyword = ref('')
  const suggestedWords = ref<string[]>([])
  const isLoading = ref<boolean>(true)
  const inputRef = ref()
  onMounted(() => {
    if (!recentlyItems?.value || recentlyItems.value.length === 0) {
      setIsSaveSearch(false)
    }
    if (route.query?.keyword) {
      keyword.value = route.query?.keyword as string
      handleSetRecentlyItems()
    }
  })

  const handleSetRecentlyItems = () => {
    if (!isSaveSearch?.value) {
      const oldItems = (recentlyItems?.value ?? []).filter((i) => i != keyword.value)
      setRecentlyItems([keyword.value, ...oldItems].slice(0, SEARCH_RECENTLY_SIZE_20))
    }
  }

  const handleSearch = () => {
    if (keyword.value.length > 0) {
      handleSetRecentlyItems()
      handleChangeToResultPage(keyword.value)
    }
  }

  const handleDeleteItemSearch = (item: string) => {
    const items = recentlyItems?.value.filter((i) => i !== item)
    setRecentlyItems(items)
    if (items?.length === 0) setIsSaveSearch(false)
  }

  const handleDeleteAllRecentlySearch = () => {
    openModal?.({
      content: t('search.searchPage.deleteAll'),
      onAccept() {
        setRecentlyItems([])
        setIsSaveSearch(false)
        closeModalByPop?.()
      }
    })
  }

  const handleChangeSearchText = (value: any) => {
    keyword.value = value
    isLoading.value = true
    handleSearchSuggestedWords(value)
  }

  const highlightWord = (sentence: string, word: string) => {
    return sentence.replace(new RegExp(word, 'g'), '<span class="wf-color--f-95729--i">' + word + '</span>')
  }

  const handleChangeDeleteItemMode = (mode: boolean) => {
    deleteItemMode.value = mode
  }

  const handleChangeToResultPage = (keyword: string) => {
    router.push(processLink(`${SEARCH_RESULT_ROUTER}?keyword=${keyword}`))
  }

  const handleClickOldItemSearch = (word: string) => {
    keyword.value = word
    setTimeout(() => handleSearch())
  }

  const handleSearchSuggestedWords = (value: string) => {
    const timer = setTimeout(() => {
      getAutocomplete(value)
    }, 300)

    return () => clearTimeout(timer)
  }
  const getAutocomplete = (keyword: string) => {
    if (keyword) {
      searchApi
        .getAutocomplete(keyword)
        .then((res) => {
          const data = res.data.map((it) => it.searchWord)
          suggestedWords.value = data
          // suggestedWords.value = ['틴트', '틴트밤', '틴트립밤', '롭앤 틴트']
        })
        .catch(() => {
          // empty
        })
        .finally(() => {
          isLoading.value = false
        })
    }
  }

  watch(keyword, () => {
    router.replace({
      ...route,
      query: {
        ...route.query,
        keyword: keyword.value
      }
    })
    handleSearchSuggestedWords(keyword.value)
  })

  const setBlur = () => {
    inputRef.value?.setBlur()
  }

  onMounted(() => {
    window.addEventListener('scroll', setBlur)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', setBlur)
  })

  return {
    keyword,
    currentDate,
    recentlyItems,
    popularItems,
    handleSearch,
    handleDeleteAllRecentlySearch,
    isSaveSearch,
    handleChangeStatusSave: setIsSaveSearch,
    deleteItemMode,
    handleDeleteItemSearch,
    handleChangeDeleteItemMode,
    handleChangeSearchText,
    highlightWord,
    suggestedWords,
    handleClickOldItemSearch,
    handleChangeToResultPage,
    isLoading,
    inputRef
  }
}
