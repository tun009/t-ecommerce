import ProductDetailHeartPopup from '@/components/products/detail/ProductDetailHeartPopup.vue'
import { useModal } from '../../common/useModal'
import { ProductDetailHeartPopupType } from '@/models/views/products/ProductDetailHeartPopupModel'

export const useProductDetailPopup = () => {
  const { showModal } = useModal()

  const showHeartPopup = (type: ProductDetailHeartPopupType) => {
    showModal?.({
      component: ProductDetailHeartPopup,
      props: {
        iconType: type
      }
    })
  }

  return {
    showHeartPopup
  }
}
