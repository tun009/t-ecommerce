import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { myPageCustomer } from '@/services/api/myPage/MyPageCustomerApi'
import { MyPageNotice, MyPageFaqCategory, MyPageCategory, Tab, MyPageSearchInput } from '@/models/views/myPage/MyPageCustomerInfo'
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'

export const useMyPageCustomer = () => {
  const { t } = useI18n()
  const { openModal: openNotification } = useModalNotification()
  const categoryTab = ref<Tab[]>([]) //카테고리 탭
  const noticeList = ref<MyPageNotice[]>([]) //공지사항 리스트
  const faqTypeData = ref<MyPageFaqCategory[]>([]) // 카테고리 탭 변경
  const searchList = ref<MyPageSearchInput[]>([]) //검색결과 보관
  const hashTagList = ref([
    //연관 검색어(하드코딩)
    {
      searchResultTag: t('myPage.customer.searchKeyword1')
    },
    {
      searchResultTag: t('myPage.customer.searchKeyword2')
    },
    {
      searchResultTag: t('myPage.customer.searchKeyword3')
    },
    {
      searchResultTag: t('myPage.customer.searchKeyword4')
    }
  ])
  const searchInput = ref('') //검색
  const searchResult = ref('false') //검색결과 유무
  const withOutSpaces = ref('') //검색에 대한 공백제거
  const page = ref(1) //page
  const rowSize = ref(10) //rowSize
  const totalCount = ref(0)
  const faqType = ref('')

  // 최신 날짜순으로 3개리스트 출력
  const convertDate = (v: any) => {
    noticeList.value = JSON.parse(JSON.stringify(v))
      .sort((a: any, b: any) => new Date(b).getTime() - new Date(a).getTime())
      .slice(0, 3)
  }

  // 카테고리 목록
  const getCategory = (data: MyPageCategory) => {
    //자주 묻는 질문 탭이 맨앞으로 설정
    const categorySort = data.faqFoType.codes.sort((v: any) => {
      if (v.code == 'FAQ') return -1
      return 0
    })
    // WelfareTab에 맞게 변경
    categoryTab.value = categorySort.map((v: any) => ({
      id: v.code,
      label: v.title
    }))
  }

  // 카테고리 목록 변경
  const updateView = async (item: WelfareTabDataType) => {
    const categoryTab = await myPageCustomer.getWelfareFaQ(1, rowSize.value, item.id)
    page.value = 1
    faqTypeData.value = JSON.parse(JSON.stringify(categoryTab)).data.map((v: any) => ({ ...v, show: false }))
    totalCount.value = categoryTab.page?.totalCount || 0
    faqType.value = item.id
  }

  // 고객센터 검색
  const getSearch = async (v: string) => {
    if (v) {
      const searchData = await myPageCustomer.getWelfareFaQ(1, rowSize.value, '', v)
      withOutSpaces.value = v
      page.value = 1
      faqTypeData.value = searchData.data.map((v: any) => ({ ...v, show: false })) //검색결과
      totalCount.value = searchData.page?.totalCount || 0
      searchResult.value = 'true' //검색결과가 있을때
      searchList.value.push({ searchResultTag: v })
    } else {
      openNotification({ content: t('myPage.customer.alert1') })
    }
  }

  //더보기 확장/축소
  const getExpanded = async () => {
    const res = (await myPageCustomer.getWelfareFaQ(page.value + 1, rowSize.value, faqType.value, withOutSpaces.value)).data.map((v: any) => ({
      ...v,
      show: false
    }))
    faqTypeData.value = [...faqTypeData.value, ...res]
    page.value = page.value + 1
  }

  const init = async () => {
    const res = await myPageCustomer.getWelfareNoticeList() //공지사항
    const faqType = await myPageCustomer.getWelfareCategory() // 카테고리 탭
    convertDate(res.data)
    await getCategory(faqType.data)
    updateView(categoryTab.value[0])
  }

  onMounted(() => {
    init()
  })

  return {
    categoryTab,
    faqTypeData,
    searchInput,
    searchResult,
    withOutSpaces,
    noticeList,
    hashTagList,
    totalCount,
    page,
    getExpanded,
    updateView,
    getSearch
  }
}
