import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { MyPageNotice } from '@/models/views/myPage/MyPageCustomerInfo'
import { myPageCustomer } from '@/services/api/myPage/MyPageCustomerApi'

export const useMyPageNotice = () => {
  const noticeList = ref<MyPageNotice[]>([])
  const page = ref(1) //page
  const rowSize = ref(10) //rowSize
  const isExpanded = ref(false) //10개 더보기 확장
  const route = useRoute()

  // 고객센터에서 내용클릭시 공지사항에서 해당 내용 펼쳐주기
  const getExpandContent = () => {
    if (route.query.key) {
      noticeList.value.filter((v) => v.noticeKey === Number(route.query.key))[0].show = true
    }
  }

  // 더보기
  const getExpanded = async () => {
    if (isExpanded.value) {
      await myPageCustomer.getWelfareNoticeList(page.value, rowSize.value)
    } else {
      await myPageCustomer.getWelfareNoticeList(page.value + 1, rowSize.value)
    }
    isExpanded.value = !isExpanded.value
  }

  const init = async () => {
    const res = await myPageCustomer.getWelfareNoticeList()
    noticeList.value = res.data.map((v) => ({ ...v, show: false }))
    getExpandContent()
  }

  onMounted(() => {
    init()
  })

  return {
    noticeList,
    isExpanded,
    getExpanded
  }
}
