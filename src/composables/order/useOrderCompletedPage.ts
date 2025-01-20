import { OrderInfoPaymentModel, OrderReceiverModel, OrderPriceInfoBillModel } from '@/models/views/order/OrderProductPageModel'
import { orderApi } from '@/services/api/order/OrderApi'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useBuildLink } from '../common/useBuildLink'
import { OrderPaymentCouponCompleteModel } from '@/models/services/responses/order/OrderProductCartResponse'
import { formatKoreanPhoneNumber, MYPAGE_ORDER_DELIVERY_INQUIRY, OrderChannel } from '@/commons'
import { dataOrderCouponCompleted } from '@/assets/mockData/orders/mock-data-order-page'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'

export const useOrderCompletedPage = () => {
  const { t } = useI18n()
  const router = useRoute()
  const navigation = useRouter()
  const { processLink } = useBuildLink()

  const paymentInformationList = ref<OrderInfoPaymentModel[]>([])
  const priceInfoBill = ref<OrderPriceInfoBillModel>()
  const orderInfo = ref<OrderPaymentCouponCompleteModel>()

  onMounted(() => {
    orderApi
      .paymentCompleteCoupon({ orderKey: +router.params.id, orderChannel: OrderChannel.WEB_MOBILE })
      .then((data) => {})
      .catch(() => {
        orderInfo.value = dataOrderCouponCompleted
        const payment = dataOrderCouponCompleted.orderPaymentResponse
        priceInfoBill.value = {
          totalPrice: payment.totalProductAmount,
          priceSavePoint: payment.welfarePointPaymentAmount,
          priceVoucher: payment.immediatelyDiscountAmount + payment.couponDiscountAmount,
          costDelivery: payment.orderDeliveryAmount,
          discounts: [
            { title: '즉시할인금액', value: payment.immediatelyDiscountAmount },
            { title: '쿠폰 할인', value: payment.couponDiscountAmount }
          ],
          usePointDiscounts: [{ title: '복지 포인트', value: payment.welfarePointPaymentAmount }]
        }
      })

    orderApi
      .getPaymentCartCompleteInfoCoupon(+router.params.id)
      .then((data) => {
        paymentInformationList.value = data.data.infoPayment
      })
      .catch(() => {})
  })

  const listCardBill = computed(() => {
    const products: ProductModel[] = []
    if (orderInfo.value) {
      for (const order of orderInfo.value.myPageOrderEntryResponses) {
        if (order.ticketOrderReceiverResponse) {
          const product = order.ticketOrderReceiverResponse.receiverProductResponse
          const nameOption = (product.productResponse.productOptionResponses || []).map((option) => {
            return [option.optionSmallName, option.optionLargeName, option.optionMediumName].join(' / ')
          })
          product.productResponse.productOptionResponses?.forEach((option) => {
            products.push({
              productImage: product.productResponse.attachfilePathName || '',
              productName: product.productResponse.productName || '',
              quantity: option.productQuantity ?? product.orderQuantity,
              pricePromotion: option.optionPrice ?? product.productResponse.productPrice,
              nameOption: nameOption.join(', ')
            })
          })
        }
      }
    }
    return products
  })

  const receivers = computed(() => {
    const receive: OrderReceiverModel[] = []
    if (orderInfo.value) {
      for (const [index, order] of orderInfo.value.myPageOrderEntryResponses.entries()) {
        if (order.ticketOrderReceiverResponse) {
          const item = order.ticketOrderReceiverResponse
          receive.push({
            name: item.receiverName,
            describe: '<span>생일을 축하합니다. 행복한 시간보내세요. 화이팅!</span>',
            nameTitle: `받는 분${index + 1}`,
            phone: formatKoreanPhoneNumber(item.receiverPhoneNumber) || ''
          })
        }
      }
    }
    return receive
  })

  const totalPayment = computed(() => {
    return priceInfoBill.value
      ? priceInfoBill.value?.totalPrice + priceInfoBill.value?.costDelivery - priceInfoBill.value?.priceVoucher - priceInfoBill.value?.priceSavePoint
      : 0
  })

  const goToHome = () => {
    navigation.push(processLink('/'))
  }

  const completeOrder = () => {
    navigation.push(processLink(MYPAGE_ORDER_DELIVERY_INQUIRY))
  }

  return {
    t,
    receivers,
    paymentInformationList,
    priceInfoBill,
    totalPayment,
    goToHome,
    completeOrder,
    orderInfo,
    listCardBill
  }
}
