import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ProductDetailInquiriesAnswerStatusType, ProductDetailInquiriesMyQuestionYNType } from '@/models/views/products/ProductDetailProductQAModel'
import { PAGE_SIZE } from '@/commons'
import { ProductDetailProductQAResponse } from '@/models/services/responses/products/detail/ProductDetailProductQAResponse'
import { useHandleResponsePagination } from '@/composables/common/useHandleResponsePagination'
import { productDetailProductQATabApi } from '@/services/api/products/detail/ProductDetailProductQATabApi'

export const useProductDetailQuestionAndAnswerWrap = () => {
  const router = useRoute()
  const isMyQuestion = ref(false)
  const isAnswered = ref(false)
  const isShowFormInquiry = ref(false)

  const fetchData = (pageToken: number = 0, pageSize: number = PAGE_SIZE) => {
    return productDetailProductQATabApi.getListProductInquiries(String(router.query?.productKey), {
      itemKey: String(router.query?.productKey),
      pageNum: pageToken + 1,
      rowSize: pageSize,
      answerStatusCode: isAnswered.value ? ProductDetailInquiriesAnswerStatusType.COMPLETE : '',
      myQuestionYn: isMyQuestion.value ? ProductDetailInquiriesMyQuestionYNType.Y : ProductDetailInquiriesMyQuestionYNType.N
    })
  }

  const handleCheckedIsMyQuestion = () => {
    isMyQuestion.value = !isMyQuestion.value
    refresh()
  }

  const handleCheckedIsAnswered = () => {
    isAnswered.value = !isAnswered.value
    refresh()
  }

  const handleShowFormInquiry = () => {
    isShowFormInquiry.value = !isShowFormInquiry.value
  }

  const { refresh, isLoading, handleLoadMore, data, hasMore } = useHandleResponsePagination<ProductDetailProductQAResponse>(fetchData, PAGE_SIZE)

  onMounted(() => {
    refresh()
  })

  return {
    isLoading,
    handleLoadMore,
    data,
    hasMore,
    isAnswered,
    isMyQuestion,
    handleCheckedIsMyQuestion,
    handleCheckedIsAnswered,
    isShowFormInquiry,
    handleShowFormInquiry,
    refresh
  }
}
