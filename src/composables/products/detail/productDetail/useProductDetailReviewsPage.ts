import { MYPAGE_PRODUCT_REVIEW_NEW, PAGE_SIZE, PAGE_SIZE_20 } from '@/commons'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { useHandleResponsePagination } from '@/composables/common/useHandleResponsePagination'
import { useLoading } from '@/composables/common/useLoading'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { ProductDetailReviewsResponseModel } from '@/models/services/responses/products/detail/ProductDetailReviewsResponse'
import { ProductDetailReviewBaseInfoResponse, ProductDetailReviewPhotoVideoResponse, ProductDetailReviewSearchSortType, SORT_REVIEWS } from '@/models/views/products/detail/ProductDetailViewPhotoVideoProductModel'
import { productDetailReviewsApi } from '@/services/api/products/detail/ProductDetailReviewsApi'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

export const useProductDetailReviewsPage = () => {
  const route = useRoute()
  const router = useRouter()
  const { processLink } = useBuildLink()
  const hideDes = ref(true)
  const productKey = computed(() => route.query.productKey as string)

  const { t } = useI18n()
  const { setLoading } = useLoading()
  const { openModal } = useModalNotification()

  const tabs = [
    {
      id: '1',
      label: '상세'
    },
    {
      id: '2',
      label: '상품평(999+)'
    },
    {
      id: '3',
      label: '문의(999+)'
    }
  ]

  const reviewBaseInfo = ref<ProductDetailReviewBaseInfoResponse>()
  const reviewFiles = ref<ProductDetailReviewPhotoVideoResponse[]>([])
  const activeSortReview = ref(SORT_REVIEWS[0])

  const handleLikeReview = async (orderProductReviewKey: number, like: boolean, index: number) => {
    setLoading?.(true)
    if (like) {
      await productDetailReviewsApi.like(orderProductReviewKey)
    } else {
      await productDetailReviewsApi.disLike(orderProductReviewKey)
    }

    data.value[index] = {
      ...data.value[index],
      productReviewResponse: {
        ...data.value[index].productReviewResponse,
        canModifyLikes: like,
        totalLikes: (data.value[index].productReviewResponse?.totalLikes ?? 0) + (1 * (like ? 1 : -1))
      }
    }
    setLoading?.(false)
  }



  const fetchBaseInfo = () => {
    productDetailReviewsApi.getAverageReviews(+productKey.value)
      .then(res => {
        reviewBaseInfo.value = res.data
      })
      .catch(() => { })
  }

  const fetchFilesReview = () => {
    productDetailReviewsApi.getListFileByProductKey({
      pageNum: 1,
      rowSize: PAGE_SIZE_20,
      productKey: productKey.value,
      reviewSearchSortType: ProductDetailReviewSearchSortType.NEWEST
    })
      .then(res => {
        reviewFiles.value = res.data
      })
      .catch(() => { })
  }

  const fetchData = (pageToken: number = 0, pageSize: number = PAGE_SIZE) => {
    setLoading?.(true)
    return productDetailReviewsApi.getProductReviews(Number(productKey.value), activeSortReview.value, pageToken, pageSize).finally(() => {
      setLoading?.(false)
    })
  }

  const { refresh, handleLoadMore, data, hasMore } = useHandleResponsePagination<ProductDetailReviewsResponseModel>(fetchData, PAGE_SIZE)

  onMounted(() => {
    refresh()
    fetchBaseInfo()
    fetchFilesReview()
  })

  watch(activeSortReview, () => {
    refresh()
  })

  const handleClickNewReview = () => {
    productDetailReviewsApi.validCanWriteReview(+productKey.value)
      .then((res) => {
        if (res.data) {
          router.push(processLink(`${MYPAGE_PRODUCT_REVIEW_NEW}?productKey=${productKey.value}`))
        } else {
          openModal({ content: t('search.notWriteReview') })
        }
      })
      .catch(() => { })
  }

  return { reviewBaseInfo, hideDes, tabs, reviews: data, activeSortReview, handleLikeReview, reviewFiles, handleLoadMore, hasMore, refresh, handleClickNewReview }
}
