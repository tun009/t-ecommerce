import CartDetailPriceModal from '@/components/cart/modal/CartDetailPriceModal.vue'
import CartChangeOptionProductModal from '@/components/cart/modal/CartChangeOptionProductModal.vue'
import { useModal } from '@/composables/common/useModal'
import { CartProductDetailEmits, CartProductDetailProps } from '@/components/cart/CartProductDetail.vue'
import { cartPageApi } from '@/services/api/cart/CartPageApi'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import { useModalConfirm } from '@/composables/widgets/modal/useModalConfirm'
import { useI18n } from 'vue-i18n'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { YesNoEnum } from '@/models/common'
import { useRouter } from 'vue-router'
import { useBuildLink } from '../common/useBuildLink'
import { ORDER_PRODUCT_ROUTER } from '@/commons'

export const useCartProductDetail = (props: CartProductDetailProps, emits: CartProductDetailEmits) => {
  const { showModal, closeModalByPop } = useModal()
  const { showModal: showModalBottomSheet, closeModal } = useModalBottomSheet()
  const { openModal: openModalConfirm } = useModalConfirm()
  const { openModal: openNotification, closeAllModal } = useModalNotification()
  const { t } = useI18n()
  const router = useRouter()
  const { processLink } = useBuildLink()

  const handleShowModalDetailPrice = () => {
    showModal?.({
      component: CartDetailPriceModal,
      props: {
        closeModalByPop: closeModalByPop,
        detailPrice: {
          productName: props.dataProduct.productName,
          totalPrice: props.dataProduct.price! * props.dataProduct.quantity,
          totalDiscountAmount:
            (props.dataProduct.price! - (props.dataProduct.pricePromotion ?? props.dataProduct.price!)) * props.dataProduct.quantity,
          expectedPurchasePrice: props.dataProduct.pricePromotion! * props.dataProduct.quantity,
          // NOTE: Don't know structure of immediatelyDiscountResponse
          discountPrograms: props.dataProduct.immediatelyDiscountResponse
            ? [
                {
                  promotionName: props.dataProduct.immediatelyDiscountResponse.promotionName,
                  amount: props.dataProduct.immediatelyDiscountResponse.amount
                }
              ]
            : []
        }
      }
    })
  }

  const handleShowModalChangeOptions = () => {
    showModalBottomSheet?.({
      type: ModalBottomSheetType.swipeFitContent,
      component: CartChangeOptionProductModal,
      props: {
        dataProduct: props.dataProduct,
        optionsSelected: props.dataProduct.productOptionResponses
      },
      events: {
        onClose: closeModal,
        save: () => {
          emits('refresh-cart')
        }
      }
    })
  }
  const handleUpdateQuantity = (quantityNew: number) => {
    props.dataProduct.quantity = quantityNew
    // CHECK:  API update bug
    cartPageApi
      .updateProductItem(props.dataProduct.cartProductKey, {
        cartProductKey: props.dataProduct.cartProductKey,
        productQuantity: quantityNew,
        optionKey: props.dataProduct.productOptionResponses ? Number(props.dataProduct.productOptionResponses[0]?.optionKey) : 0
      })
      .catch(() => {})
  }
  const handlePurchaseItemProduct = (cartKey: number, cartProductKeys: number[]) => {
    // NOTE: Check is order the first since register account => Go to screen confirm information (spec out)
    // NOTE: Check If contains a product that cannot purchased by people under 19 year olds
    if (props.dataProduct.adultCertificationProductYn === YesNoEnum.Y) {
      // NOTE: This screen does not done -> open popup coming soon
      openModalComingSoon(t('cart.modalText.ageVerify'))
    } else {
      router.push(processLink(`${ORDER_PRODUCT_ROUTER}?member=yes&cartKey=${cartKey}&cartProductKeys=${cartProductKeys}`))
    }
  }
  const openModalComingSoon = (text: string) => {
    openNotification({
      content: text,
      onAccept() {
        closeAllModal?.()
      },
      onClose() {
        closeAllModal?.()
      }
    })
  }
  const handleDeleteProduct = () => {
    openModalConfirm({
      content: t('cart.modalText.confirmDeleteProductSelected'),
      onConfirm: () => {
        closeModalByPop?.()
        handleCallApiDeleteProduct()
      }
    })
  }
  const handleCallApiDeleteProduct = () => {
    cartPageApi.removeSelectedProduct(props.dataProduct.cartKey, [props.dataProduct.cartProductKey]).then(() => {
      openNotification({
        content: t('cart.modalText.removerSuccess'),
        onAccept() {
          closeAllModal?.()
          emits('refresh-cart')
        },
        onClose() {
          closeAllModal?.()
          emits('refresh-cart')
        }
      })
    })
  }
  return {
    handleShowModalDetailPrice,
    handleShowModalChangeOptions,
    handleUpdateQuantity,
    handlePurchaseItemProduct,
    handleDeleteProduct
  }
}
