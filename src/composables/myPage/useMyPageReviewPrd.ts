import { ref, reactive, watch, computed } from 'vue'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useFileUploader } from '@/composables/myPage/useMypageFileUpload'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { myPageProductOrder } from '@/services/api/myPage/MyPageProduct'

interface MyPageReviewPrdForm {
  review?: string
  reviewStarPoint?: number
}
export const useMyPageReviewPrd = ({ review, reviewStarPoint }: MyPageReviewPrdForm = {}) => {
  const { files, previewFiles, uploadReviewFile, removeFile, getFilesFormData } = useFileUploader()
  const { t } = useI18n()
  const { openModal } = useModalNotification()
  const route = useRoute()
  const router = useRouter()
  const textLength = ref(review?.length || 0)
  const orderProductReviewKey = ref(route.query.orderProductReviewKey || 0)
  const orderProductKey = ref(route.query.orderProductKey || 0)
  const productKey = ref(route.query.productKey || 0)
  const fileList = ref<FileList[]>([])
  const isEdit = !!orderProductReviewKey.value
  const productReviewRequest = reactive({
    reviewStarPoint: reviewStarPoint || 0.5,
    review: review || ''
  })
  const saveValidate = () => {
    if (textLength.value < 10) {
      openModal({
        content: t('myPage.reviewForm.modalText')
      })
      return true
    }
  }

  const putPrdRevie = async () => {
    try {
      await myPageProductOrder.putWelfareReviewPrdWrite(+orderProductReviewKey.value, {
        ...productReviewRequest,
        orderProductReviewKey: +orderProductReviewKey.value,
        orderProductKey: +orderProductKey.value
      })
      router.push('/my-page/products/review')
    } catch (error) {
      console.error(error)
    }
  }

  const savePrdReview = async () => {
    const uploadFile = getFilesFormData()
    const formData = new FormData()

    formData.append(
      'productReviewRequest',
      new Blob([JSON.stringify({ ...productReviewRequest, orderProductKey: orderProductKey.value })], { type: 'application/json' })
    )

    if (files.value && files.value.length > 0) {
      for (const [key, value] of uploadFile.entries()) {
        formData.append(key, value)
      }
    }
    try {
      await myPageProductOrder.postWelfareReviewPrdWrite(formData)
      router.push('/my-page/products/review')
    } catch (error) {
      console.error(error)
    }
  }

  const saveProcess = async () => {
    if (saveValidate()) {
      return
    }

    isEdit ? putPrdRevie() : savePrdReview()
  }

  const handleClickRating = (reviewStarPoint: string) => {
    productReviewRequest.reviewStarPoint = +reviewStarPoint
  }

  watch(productReviewRequest, (val) => {
    textLength.value = val.review.length
  })

  return {
    isEdit,
    productKey,
    orderProductReviewKey,
    productReviewRequest,
    textLength,
    fileList,
    saveProcess,
    handleClickRating,
    uploadReviewFile,
    removeFile,
    previewFiles,
    files
  }
}
