import { productDetailApi } from '@/services/api/products/detail/ProductDetailApi'
import { ref } from 'vue'
import { useProductDetailPopup } from './useProductDetailPopup'
import { ProductDetailHeartPopupType } from '@/models/views/products/ProductDetailHeartPopupModel'
import { useLoading } from '../../common/useLoading'

export const useProductDetailHeart = (defaultHeart = false) => {
  const isHeart = ref(defaultHeart)
  const { setLoading } = useLoading()
  const { showHeartPopup } = useProductDetailPopup()

  const handleChangeActiveHeart = (id: any) => {
    setLoading?.(true)
    if (!isHeart.value) {
      productDetailApi
        . postItemLike(id)
        .then(() => {
          showHeartPopup(ProductDetailHeartPopupType.active)
          isHeart.value = !isHeart.value
        })
        .catch((e) => {
          throw new Error(e)
        })
        .finally(() => {
          setLoading?.(false)
        })
    } else {
      productDetailApi
        .deleteItemLike(id)
        .then(() => {
          showHeartPopup(ProductDetailHeartPopupType.inactive)
          isHeart.value = !isHeart.value
        })
        .catch((e) => {
          throw new Error(e)    
        })
        .finally(() => {
          setLoading?.(false)
        })
    }
  }

  return {
    isHeart,
    handleChangeActiveHeart
  }
}
