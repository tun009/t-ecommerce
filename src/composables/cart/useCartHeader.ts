import { cartPageApi } from '@/services/api/cart/CartPageApi'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useModalConfirm } from '@/composables/widgets/modal/useModalConfirm'
import { useI18n } from 'vue-i18n'
import { CartHeaderEmits, CartHeaderProps } from '@/components/cart/CartHeader.vue'
import { CartProductModel } from '@/models/views/cart/CartProductModel'
import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'

export const useCartHeader = (props: CartHeaderProps, emits: CartHeaderEmits) => {
  const { t } = useI18n()
  const { openModal: openNotification, closeAllModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const openSuccessNotification = (content: string) => {
    openNotification({
      content: content,
      onAccept() {
        closeAllModal?.()
        props.handleGetOrderCart()
      },
      onClose() {
        closeAllModal?.()
        props.handleGetOrderCart()
      }
    })
  }
  const handleRemoveSelectedProduct = () => {
    if (props.selectedProducts.length > 0) {
      openModalConfirm({
        content: t('cart.modalText.confirmDeleteProductSelected'),
        onConfirm: () => {
          closeModalByPop?.()
          const cartKey = props.selectedProducts[0].cartKey
          const cartProductKeys = props.selectedProducts.map((product: CartProductModel) => product.cartProductKey)
          cartPageApi.removeSelectedProduct(cartKey, cartProductKeys).then(() => {
            openSuccessNotification(t('cart.modalText.removerSuccess'))
          })
        }
      })
    } else {
      openNotification({
        content: t('cart.modalText.noHaveAnyProduct')
      })
    }
  }
  const handleRemoveAllProductExpired = () => {
    let isHasAnyProductOutOfStock = false
    props.allProducts.forEach((product: CartProductModel) => {
      if (product.state !== ProductDetailSaleStatus.onSale) {
        isHasAnyProductOutOfStock = true
      }
    })
    if (isHasAnyProductOutOfStock) {
      // in case have product expired
      openModalConfirm({
        content: t('cart.modalText.confirmDeleteProductExpired'),
        onConfirm: () => {
          closeModalByPop?.()
          cartPageApi.deleteAllOutOfStockProducts().then(() => {
            emits('refresh-cart')
            openSuccessNotification(t('cart.modalText.removerSuccess'))
          })
        }
      })
    } else {
      // in case don't have any product expired
      openNotification({
        content: t('cart.modalText.noHaveAnyProductExpired')
      })
    }
  }
  return {
    handleRemoveSelectedProduct,
    handleRemoveAllProductExpired
  }
}
