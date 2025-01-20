import { reactive, ref } from 'vue'
import { useModalConfirm } from '@/composables/widgets/modal/useModalConfirm'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useProductDetailPopup } from '../products/detail/useProductDetailPopup'
import { myPageProductOrder } from '@/services/api/myPage/MyPageProduct'
import { ProductDetailHeartPopupType } from '@/models/views/products/ProductDetailHeartPopupModel'

export const useMyPagePrd = <T extends { productKey: number }>() => {
  const selectedList = ref<number[]>([])
  const prdList = reactive<{ list: T[] }>({ list: [] })

  const { showHeartPopup } = useProductDetailPopup()
  const { openModal: oepnModalConfirm, closeAllModal } = useModalConfirm()
  const { openModal } = useModalNotification()

  const cartLikePrd = (productKey: number) => {
    myPageProductOrder
      .postWelfareCartPrd(productKey, { optionKey: null, productQuantity: 1 })
      .then(() => {
        closeAllModal?.()
        showHeartPopup(ProductDetailHeartPopupType.cart)
      })
      .catch((e) => console.error(e))
  }

  return {
    selectedList,
    prdList,
    openModal,
    closeAllModal,
    cartLikePrd,
    oepnModalConfirm
  }
}
