import { ProductDetail2 } from '@/assets/images'
import Banner342_85_1 from '@/assets/images/product-banner-1-343x85.png'
import Banner342_85_2 from '@/assets/images/product-banner-2-343x85.png'
import Banner342_85_3 from '@/assets/images/product-banner-3-343x85.png'
import { getNumberMoney } from '@/commons'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import {
  ProductCountTabModel,
  ProductDetailModel,
  ProductDetailSaleStatus,
  getTextButtonBuyData
} from '@/models/views/products/ProductDetailReviewModel'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import { productDetailApi } from '@/services/api/products/detail/ProductDetailApi'
import ProductDetailChooseOptionModal from '@/views/products/detail/modal/ProductDetailChooseOptionModal.vue'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from '../../common/useLoading'
import { useModalBottomSheet } from '../../common/useModalBottomSheet'
import { useScrollNavigation } from '../../uikits/useScrollNavigation'
import { useProductDetailHeart } from './useProductDetailHeart'
import { SellerCompanyShipmentModel } from '@/models/views/member/SellerCompanyShipment'
import { memberApi } from '@/services/api/member/memberApi'
import { orderApi } from '@/services/api/order/OrderApi'
import { OrderProductBaseInfoModel, PointInfoModel } from '@/models/views/order/OrderProductPageModel'
import { YesNoEnum } from '@/models/common'
import ProductDetailDiscountPriceInformationModal from '@/views/products/detail/modal/ProductDetailDiscountPriceInformationModal.vue'
import { useModal } from '../../common/useModal'
import { useProductDetailAddToCart } from './useProductDetailAddToCart'
import { useRecentlyItemStore } from '@/stores/recentlyPrd'
import { useBuildLink } from '@/composables/common/useBuildLink'
import ProductDetailGetCouponBtnModal from '@/views/products/detail/modal/ProductDetailGetCouponBtnModal.vue'
import { productDetailProductCodeTabApi } from '@/services/api/products/detail/ProductDetailProductCodeTabApi'
import { productDetailProductQATabApi } from '@/services/api/products/detail/ProductDetailProductQATabApi'
import { ProductDetailInquiriesMyQuestionYNType } from '@/models/views/products/ProductDetailProductQAModel'
import { productDetailReviewsApi } from '@/services/api/products/detail/ProductDetailReviewsApi'
import { ProductDetailReviewSearchSortType } from '@/models/views/products/detail/ProductDetailViewPhotoVideoProductModel'

export const useProductDetailPage = () => {
  const { updatePrdInfo } = useRecentlyItemStore()
  const { showModal, closeModal } = useModalBottomSheet()

  const dataRelated = ref<WelfareUnitProductModel[]>([
    {
      name: '[솔트레인] 극세모 칫솔 <br/> 4개입 2종 (택1)',
      price: 99999999,
      pricePromotion: 99999999,
      percent: 99,
      thumbnailProduct: ProductDetail2,
      benefits: ['무료배송', '무이자'],
      rateStar: 4,
      rateCountStar: 999
    },
    {
      name: '[솔트레인] 극세모 칫솔',
      price: 99999999,
      pricePromotion: 99999999,
      percent: 99,
      thumbnailProduct: ProductDetail2,
      benefits: ['무료배송', '무이자'],
      rateStar: 4,
      rateCountStar: 999
    },
    {
      name: '[솔트레인] 극세모 칫솔 <br/>  4개입 2종 (택1)',
      price: 99999999,
      pricePromotion: 99999999,
      percent: 99,
      thumbnailProduct: ProductDetail2,
      benefits: ['무료배송', '무이자'],
      rateStar: 4,
      rateCountStar: 999
    },
    {
      name: '[솔트레인] 극세모 칫솔 <br/> 4개입 2종 (택1)',
      price: 99999999,
      pricePromotion: 99999999,
      percent: 99,
      thumbnailProduct: ProductDetail2,
      benefits: ['무료배송', '무이자'],
      rateStar: 4,
      rateCountStar: 999
    }
  ])
  const remainingTime = ref('')
  const productDetail = ref<ProductDetailModel>()
  const { isHeart, handleChangeActiveHeart } = useProductDetailHeart()
  useScrollNavigation()

  const dataRouter = useRoute()
  const productKey = dataRouter.query?.productKey
  const { setLoading } = useLoading()
  // const listDiscount = ref<ItemProductDiscountModel[]>([])

  const listSellerShipments = ref<SellerCompanyShipmentModel>()
  // const listBenefitProduct = ref()
  const productBaseInfoCount = ref<OrderProductBaseInfoModel>()
  const productQATabInfo = ref<ProductCountTabModel>({ countTabReview: '', countTabQuestion: '' })
  const pointInfo = ref<PointInfoModel>()
  const refExpander = ref()

  const listBannerProduct = ref([
    {
      image: Banner342_85_1,
      title: '쫀득 말랑, 과즙이 팡 터지는',
      description: '복숭아 마니아를 위한 샘플러'
    },
    {
      image: Banner342_85_2,
      title: '무농약 마틸다 토마토',
      description: '탄탄한 과육 속 진한 맛'
    },
    {
      image: Banner342_85_3,
      title: '제철 먹거리 기획전',
      description: '탄탄한 과육 속 진한 맛'
    }
  ])
  const { showModal: showModalNormal, closeModalByPop } = useModal()
  const router = useRouter()
  const { processLink } = useBuildLink()

  const goToHome = () => {
    router.push(processLink('/'))
  }
  onBeforeMount(() => {
    if (!productKey || typeof +productKey !== 'number') return
    setLoading?.(true)
    productDetailApi
      .getItemProductDetail(+productKey)
      .then((data) => {
        productDetail.value = data.data
        updatePrdInfo({ ...data.data, productKey: +productKey })
      })
      .catch(() => {})
      .finally(() => {
        setLoading?.(false)
      })

    orderApi
      .getOrderBaseInfo(+productKey)
      .then((data) => {
        productBaseInfoCount.value = data.data
      })
      .catch(() => {})

    orderApi
      .getPointInfo(String(productKey))
      .then((data) => {
        pointInfo.value = data.data
      })
      .catch(() => {})

    memberApi
      .getKeySellerCompanyShipment(+productKey)
      .then((data) => {
        const keys = []
        if (data.data.productIssueDeliveryFeeKey) keys.push(data.data.productIssueDeliveryFeeKey)
        if (data.data.productReturnDeliveryFeeKey) keys.push(data.data.productReturnDeliveryFeeKey)
        if (data.data.productExchangeDeliveryFeeKey) keys.push(data.data.productExchangeDeliveryFeeKey)
        if (keys.length > 0) {
          memberApi
            .getSellerCompanyShipment(keys)
            .then((data) => {
              listSellerShipments.value = data.data
            })
            .catch(() => {})
        }
      })
      .catch(() => {})

    productDetailApi
      .getItemLike(+productKey)
      .then((data) => {
        isHeart.value = data.data.productLikeYn === YesNoEnum.Y
      })
      .catch(() => {})

    productDetailProductCodeTabApi
      .getGNBMenu()
      .then((data) => {
        const gnbGroupKey = data.data[0].gnbGroupKey
        productDetailProductCodeTabApi
          .getListTodaySpecialProducts(gnbGroupKey)
          .then((data) => {
            const cornerSpecialPriceKey = data?.data[0]?.foCornerSpecialPriceResponseList[0]?.cornerSpecialPriceKey
            if (cornerSpecialPriceKey) {
              productDetailProductCodeTabApi
                .getSpecialPriceRemainTime(cornerSpecialPriceKey)
                .then((data) => {
                  remainingTime.value = data.data
                })
                .catch(() => {})
            }
          })
          .catch(() => {})
      })
      .catch(() => {})
    productDetailReviewsApi
      .getListFileByProductKey({
        pageNum: 1,
        rowSize: 20,
        productKey: String(productKey),
        reviewSearchSortType: ProductDetailReviewSearchSortType.NEWEST
      })
      .then((data) => {
        productQATabInfo.value.countTabReview = formatLargeNumber(data?.page?.totalCount as number)
      })
      .catch(() => {})
    productDetailProductQATabApi
      .getListProductInquiries(String(productKey), {
        itemKey: String(productKey),
        pageNum: 0,
        rowSize: 10,
        answerStatusCode: '',
        myQuestionYn: ProductDetailInquiriesMyQuestionYNType.N
      })
      .then((data) => {
        productQATabInfo.value.countTabQuestion = formatLargeNumber(data?.page?.totalCount as number)
      })
      .catch(() => {})
  })
  const formatLargeNumber = (number: number) => {
    return number < 10000 ? number.toString() : '9999+'
  }
  const { handleAddToCart } = useProductDetailAddToCart()

  const handleClickAddToCart = () => {
    if (productDetail?.value?.optionUseYn === YesNoEnum.Y) {
      handleShowModalChooseOption()
    } else {
      handleAddToCart(+(productKey ?? 0), { productQuantity: 1 })
    }
  }

  const handleShowModalChooseOption = () => {
    showModal?.({
      component: ProductDetailChooseOptionModal,
      type: ModalBottomSheetType.swipeFitContent,
      props: {
        useOptionType: productDetail?.value?.sclassOptionUseYn,
        optionUseYn: productDetail?.value?.optionUseYn,
        optionType: productDetail?.value?.optionType,
        productKey,
        isHeart,
        name: productDetail?.value?.productName,
        price: getNumberMoney(productDetail.value?.salePrice) - getNumberMoney(productDetail.value?.productDiscountAmount),
        productClassificationCode: productDetail.value?.productClassificationCode,
        totalQuantity: productDetail?.value?.inventoryQuantity,
        textButtonBuy,
        isDisabledButtonBuy,
        isEditInputQuantity: false
      },
      events: {
        onClose: closeModal,
        onHeart: () => handleChangeActiveHeart(productKey)
      }
    })
  }

  const handleModalInfoDiscount = () => {
    showModalNormal?.({
      component: ProductDetailDiscountPriceInformationModal,
      props: {
        onCancel: closeModalByPop,
        productDetail: productDetail.value
      }
    })
  }
  const handleGetCouponClicked = () => {
    showModal?.({
      component: ProductDetailGetCouponBtnModal,
      type: ModalBottomSheetType.swipeFitContent,
      props: {
        onCancel: () => closeModal?.(),
        productKey: productKey
      }
    })
  }

  const percentDiscount = computed(() => {
    return getNumberMoney(productDetail.value?.productDiscountRate) * 100
    // return productDetail.value?.productDiscountRate && productDetail.value?.productDiscountRate > 0
    //   ? 100 - getNumberMoney(productDetail.value?.productDiscountRate) * 100
    //   : 0
  })

  const totalPriceSell = computed(() => {
    return getNumberMoney(productDetail.value?.salePrice) - getNumberMoney(productDetail.value?.productDiscountAmount)
  })

  const isDisabledButtonBuy = computed(() => {
    return productDetail.value?.lastProductSalesStatusCode !== ProductDetailSaleStatus.onSale
  })
  const textButtonBuy = computed<string>(() => {
    if (!productDetail.value?.lastProductSalesStatusCode) return '....'
    return getTextButtonBuyData(productDetail.value.optionType)?.[productDetail.value.lastProductSalesStatusCode]
  })

  const showImage = ref(false)

  const openImage = () => {
    showImage.value = !showImage.value
  }

  const handleLinkProductInformation = () => {
    refExpander?.value?.openExpander?.()

    // document.getElementById('welfare-info-product-tab')?.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    dataRelated,
    productDetail,
    handleShowModalChooseOption,
    isHeart,
    handleChangeActiveHeart,
    productKey,
    percentDiscount,
    totalPriceSell,
    isDisabledButtonBuy,
    textButtonBuy,
    handleClickAddToCart,
    listSellerShipments,
    productBaseInfoCount,
    handleModalInfoDiscount,
    handleGetCouponClicked,
    goToHome,
    showImage,
    openImage,
    listBannerProduct,
    handleLinkProductInformation,
    refExpander,
    pointInfo,
    remainingTime,
    productQATabInfo
  }
}
