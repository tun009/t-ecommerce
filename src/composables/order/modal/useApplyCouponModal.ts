import { FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS } from '@/commons/constants'
import { OrderCartProductModel, OrderCouponBenefitEnum } from '@/models/views/order/OrderProductPageModel'
import { OrderApplyCouponProps } from '@/models/views/order/modal/OrderApplyCouponModel'
import { BaseApplyCouponConfirmModalEmits } from '@/models/widgets/modal'
import dayjs from 'dayjs'
import { useForm } from 'vee-validate'
import { computed } from 'vue'

type ShowProductType = 'group' | 'address'

export const useApplyCouponModal = (props: OrderApplyCouponProps, emit: BaseApplyCouponConfirmModalEmits) => {
  const { orderCarts } = props

  const showTypeComputed = computed((): ShowProductType => {
    return orderCarts?.length === 1 ? 'group' : 'address'
  })

  const initialValues = { orderCards: orderCarts.map((it) => ({ ...it })) }

  const { values, setFieldValue, handleSubmit, handleReset } = useForm({
    initialValues: initialValues
  })

  const onResetDiscount = () => {
    handleReset()
  }

  const onCancel = () => {
    emit('onClose')
  }

  const onConfirm = handleSubmit((values) => {
    emit('onAccept', { orderCarts: values.orderCards, coupon: calcTotalCoupon() })
    emit('onClose')
  })

  const calcGroupCoupon = (data: OrderCartProductModel) => {
    const couponData = data.listCoupons?.find((item) => item.memberCouponKey === data.coupon)
    const isPix = couponData?.couponBenefitType === OrderCouponBenefitEnum.FIX
    let priceDiscount = isPix
      ? couponData.benefitValue
      : (Number(data.product.pricePromotion ?? 0) - Number(data.product?.immediatelyDiscountResponse?.amount ?? 0)) *
        (Number(couponData?.benefitValue ?? 0) / 100)

    return { discount: priceDiscount ?? 0, total: priceDiscount ?? 0 }
  }

  const calcTotalCoupon = () => {
    const totalDiscount = values.orderCards.reduce((currentMoney, item) => {
      return (
        currentMoney +
        item.products.reduce((currentMoneyProduct, _item) => {
          return currentMoneyProduct + calcGroupCoupon(_item).discount
        }, 0)
      )
    }, 0)
    return { discount: totalDiscount ?? 0, total: totalDiscount ?? 0 }
  }

  const getCouponList = (i: number) => {
    return values?.orderCards?.[0].products[i].listCoupons?.map((item) => {
      return {
        ...item,
        disabled: dayjs(item.validToDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS).isBefore(dayjs(new Date(), FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS))
      }
    })
  }

  return {
    showTypeComputed,
    values,
    setFieldValue,
    onResetDiscount,
    onCancel,
    onConfirm,
    calcGroupCoupon,
    calcTotalCoupon,
    getCouponList
  }
}
