import { useProductDetailPopup } from './useProductDetailPopup'
import { ProductDetailHeartPopupType } from '@/models/views/products/ProductDetailHeartPopupModel'
import { ProductDetailAddToCartRequest } from '@/models/services/requests/products/detail/ProductDetailAddToCartRequest'
import { productDetailOrderApi } from '@/services/api/products/detail/ProductDetailOrderApi'
import { useLoading } from '../../common/useLoading'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { ProductDetailModel, ProductDetailSaleStatus, getTextButtonBuyData } from '@/models/views/products/ProductDetailReviewModel'
import { Ref, computed, ref } from 'vue'
import ProductDetailChooseOptionModalVue from '@/views/products/detail/modal/ProductDetailChooseOptionModal.vue'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import { ORDER_PRODUCT_ROUTER, WELFARE_LIST_CART_KEY, getNumberMoney } from '@/commons'
import { productDetailApi } from '@/services/api/products/detail/ProductDetailApi'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { useRouter } from 'vue-router'
import { useStorage } from '@/composables/common/useStorage'

export const useProductDetailAddToCart = () => {
  const router = useRouter()
  const { processLink } = useBuildLink()
  const { setLoading } = useLoading()
  const { showModal, closeModal } = useModalBottomSheet()
  const { showHeartPopup } = useProductDetailPopup()
  const productDetail = ref<ProductDetailModel>()
  const [cartProductKeys, setCartProductKeys] = useStorage<number[]>(WELFARE_LIST_CART_KEY)

  const textButtonBuy = computed<string>(() => {
    if (!productDetail.value?.lastProductSalesStatusCode) return '....'
    return getTextButtonBuyData(productDetail.value.optionType)?.[productDetail.value.lastProductSalesStatusCode]
  })

  const handleAddToCart = (productKey?: number, data?: ProductDetailAddToCartRequest, toOrder = false) => {
    if (productKey && data) {
      if (data.productOptionKey) {
        data.optionKey = data.productOptionKey
      }
      setLoading?.(true)
      productDetailOrderApi
        .addToCart(productKey, data)
        .then((res) => {
          if (toOrder) {
            router.push(
              processLink(
                `${ORDER_PRODUCT_ROUTER}?member=yes&cartKey=${res.data?.cartProductResponses?.[0]?.cartKey ?? 0}&cartProductKeys=${
                  res.data?.cartProductResponses?.[0]?.cartProductKey ?? 0
                }`
              )
            )
          } else {
            showHeartPopup(ProductDetailHeartPopupType.cart)
          }
          const listOld = cartProductKeys?.value ?? []
          const listNew = res.data?.cartProductResponses?.map((item) => item.cartProductKey!) ?? []
          setCartProductKeys([...listOld, ...listNew])
        })
        .catch(() => {})
        .finally(() => {
          setLoading?.(false)
        })
    } else if (!toOrder) {
      showHeartPopup(ProductDetailHeartPopupType.cart)
    }
  }

  const handleClickAddToCart = (productKey: number, isHeart: any, handleChangeActiveHeart: any) => {
    setLoading?.(true)
    productDetailApi
      .getItemProductDetail(+productKey)
      .then((data) => {
        productDetail.value = data.data
        handleShowModalChooseOption(productKey, isHeart, handleChangeActiveHeart)
      })
      .catch(() => {})
      .finally(() => {
        setLoading?.(false)
      })
  }

  const handleShowModalChooseOption = (productKey: number, isHeart: Ref, handleChangeActiveHeart: any) => {
    showModal?.({
      component: ProductDetailChooseOptionModalVue,
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
        isDisabledButtonBuy: productDetail.value?.lastProductSalesStatusCode !== ProductDetailSaleStatus.onSale,
        isEditInputQuantity: false
      },
      events: {
        onClose: closeModal,
        onHeart: () => handleChangeActiveHeart(productKey)
      }
    })
  }

  return {
    handleAddToCart,
    handleClickAddToCart
  }
}
