import { DummyImage } from '@/assets/images'
import { useHandleResponsePagination } from '@/composables/common/useHandleResponsePagination'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { MyPageOrderProductModel } from '@/models/views/myPage/MyPageMainMemberModel'
import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import { mainMember } from '@/services/api/myPage/MainMemberApi'
import MyPageRefundInformationModalVue from '@/views/myPage/modal/MyPageRefundInformationModal.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useMyPageNonMemberOrderDeliveryInquiry = () => {
  const product = ref<ProductModel>({
    productName: '[폴스미스] 남성 디노 맨투맨 블랙 두줄로 제목이길게 나온다고하면 이렇게 나옵니다람쥐 길면계속가다가나중에말줄임이나오지...',
    productImage: DummyImage,
    pricePromotion: 99999999,
    price: 1213123099,
    quantity: 9999,
    state: ProductDetailSaleStatus.onSale,
    nameOption: '옵션명 옵션명옵션명 옵션명옵션명옵션명 옵션명옵션명 옵션명옵션명 옵션명옵션명 옵션명옵션명 옵션명 옵션...',
    config: {
      name: '추가구성',
      des: '양말세트양말세트양말세트양말세트 양말세트양말세트양말세트양말세트'
    },
    gift: {
      name: '사은품',
      des: ['블랙 비니']
    }
  })

  const router = useRoute()
  const isShowCalendar = ref(false)
  const isMember = router.query?.member === 'yes'
  const isShowCheckBox = router.query?.isShowCheckBox === 'yes'
  const orderKey = router.query?.orderKey as string

  const fetchData = () => {
    return mainMember.getListOrderDelivery({
      pageNum: 1,
      rowSize: 20,
      fromDate: '2023-11-05T00:00:00',
      toDate: '2024-01-20T00:00:00'
    })
  }

  const { data, handleLoadMore, refresh } = useHandleResponsePagination<MyPageOrderProductModel>(fetchData)

  const { showModal, closeModal } = useModalBottomSheet()

  const handleShowRefundInformationModal = () => {
    showModal?.({
      type: ModalBottomSheetType.swipeFitContent,
      component: MyPageRefundInformationModalVue,
      hideHeader: true,
      props: {
        title: 'myPage.refundInformation.title',
        showCheckbox: isShowCheckBox,
        orderKey: Number(orderKey)
      },
      events: {
        close: () => {
          closeModal?.()
        }
      }
    })
  }

  onMounted(() => {
    refresh()
    //show modal when mounted
    handleShowRefundInformationModal()
  })

  return { product, isShowCalendar, isMember, data, handleLoadMore }
}
