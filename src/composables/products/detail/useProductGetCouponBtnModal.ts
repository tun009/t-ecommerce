import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { ProductDetailCouponModel } from '@/models/views/products/detail/ProductDetailCouponModel'
import { productDetailCouponApi } from '@/services/api/products/detail/ProductDetailCouponApi'
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useProductGetCouponBtnModal = (productKey: string | number) => {
  const dataCoupon = ref<ProductDetailCouponModel[]>([])
  const countSuccess = ref<number>(0)
  const { openModal, closeModalByPop } = useModalNotification()
  const countCalled = ref<number>(0)
  const { t } = useI18n()
  onBeforeMount(async () => {
    fetchData()
  })

  const fetchData = async () => {
    const { data } = await productDetailCouponApi.getCouponBtn(productKey)
    dataCoupon.value = data
  }

  const handleDownloadAll = () => {
    const promises: Promise<void>[] = []
    dataCoupon.value.forEach((item) => {
      const today = new Date()
      const validData = new Date(item.validToDate)
      const isPassValidDate = item.validToDate && today < validData
      if (!item.downloaded && isPassValidDate) {
        const promise = productDetailCouponApi
          .downloadCoupon(item.couponKey)
          .then(() => {
            ++countSuccess.value
          })
          .catch(() => {})
        promises.push(promise)
      }
    })
    try {
      if (promises.length > 0) {
        Promise.all(promises).then(() => {
          // FO_MC_IT011016P
          openModal?.({
            content: `${countSuccess.value}${t('productDetail.coupon.notifyDownloadAll')}`,
            onAccept() {
              fetchData()
              closeModalByPop?.()
            }
          })
        })
      } else {
        // FO_MC_IT011017P
        openModal?.({
          content: `${t('productDetail.coupon.notifyNotCouponCanDownload')}`
        })
      }
    } catch (error) {
      return error
    }
  }

  const handleDownloadCoupon = (coupon: ProductDetailCouponModel) => {
    const today = new Date()
    const validData = new Date(coupon.validToDate)
    if (countCalled.value > 0) {
      // FO_MC_IT011017P
      openModal?.({
        content: t('productDetail.coupon.notifyCouponAlreadyBeen'),
        onAccept: () => {
          countCalled.value = 0
          closeModalByPop?.()
        }
      })
      return
    }

    if (!coupon.validToDate || today > validData) {
      // FO_MC_IT011017P
      openModal?.({
        content: t('productDetail.coupon.notifyValidDate')
      })
      return
    }

    productDetailCouponApi
      .downloadCoupon(coupon.couponKey)
      .then(() => {
        // FO_MC_IT011016P
        openModal?.({
          content: t('productDetail.coupon.notifyDownload'),
          onAccept: () => {
            fetchData()
            closeModalByPop?.()
          }
        })
      })
      .catch(() => {
        countCalled.value = 0
      })

    countCalled.value++
  }

  return { dataCoupon, handleDownloadAll, handleDownloadCoupon }
}
