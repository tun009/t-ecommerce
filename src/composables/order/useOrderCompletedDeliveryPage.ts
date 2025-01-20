import { dataOrderPage } from '@/assets/mockData/orders/mock-data-order-page'
import { MYPAGE_ORDER_DELIVERY_INQUIRY, OrderChannel, getImageProduct } from '@/commons'
import {
  OrderEntryResponse,
  OrderPaymentCompleteModel,
  OrderPaymentResponse,
  orderPaymentMethodData
} from '@/models/services/responses/order/OrderProductCartResponse'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { OrderInfoPaymentModel, OrderPriceInfoBillModel } from '@/models/views/order/OrderProductPageModel'
import { orderApi } from '@/services/api/order/OrderApi'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBuildLink } from '../common/useBuildLink'
import { useLoading } from '../common/useLoading'
import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'

export const useOrderCompletedDeliveryPage = () => {
  const billData = ref<OrderEntryResponse[]>([])

  const router = useRoute()
  const navigation = useRouter()
  const { processLink } = useBuildLink()
  const { setLoading } = useLoading()

  const paymentInformationList = ref<OrderInfoPaymentModel[]>([])
  const priceInfoBill = ref<OrderPriceInfoBillModel>()
  const orderInfo = ref<OrderPaymentCompleteModel>()
  // const listCardBill = ref<ProductModel[]>([])

  const isNoMember = router.query.member === 'no'

  onMounted(() => {
    const paymentKey = router.query?.impUid
    const cashReceiptIssueTargetType = router.query?.cashReceiptIssueTargetType ?? null
    const cashReceiptRequestNumber = router.query?.cashReceiptRequestNumber ?? null
    setLoading?.(true)
    orderApi
      .paymentComplete({
        orderKey: +router.params.id,
        orderChannel: OrderChannel.WEB_MOBILE,
        impUid: Number(paymentKey) ?? null,
        orderCashReceipt: {
          cashReceipt: !!cashReceiptIssueTargetType,
          cashReceiptIssueTargetType,
          cashReceiptRequestNumber: cashReceiptRequestNumber?.toString().replaceAll('-', '')
        }
      })
      .then((res) => {
        if (res.data) {
          orderInfo.value = res.data
          const payment = res.data.orderPaymentResponse
          priceInfoBill.value = {
            totalPrice: payment.totalProductAmount,
            costDelivery: payment.orderDeliveryAmount,
            priceVoucher: payment.couponDiscountAmount + payment.immediatelyDiscountAmount,
            priceSavePoint: payment.welfarePointPaymentAmount,
            discounts: [
              { title: '즉시할인금액', value: payment.immediatelyDiscountAmount },
              { title: '쿠폰 할인', value: payment.couponDiscountAmount }
            ],
            usePointDiscounts: [{ title: '복지 포인트', value: payment.welfarePointPaymentAmount }]
          }
          billData.value = res.data.myPageOrderEntryResponses ?? []
          // if(installment)

          type Payment = keyof OrderPaymentResponse

          const listKeyPayment: Payment[] = Object.keys(orderPaymentMethodData) as Payment[]

          const paymentMethodString = listKeyPayment.find((item) => Number(payment?.[item]) > 0) as 'creditCardPaymentAmount'

          paymentInformationList.value = [
            {
              method: orderPaymentMethodData?.[paymentMethodString ?? 'creditCardPaymentAmount'] ?? '',
              cardCompany: `${payment.cardName} (${payment.installment > 0 ? `할부 ${payment.installment}개월` : '일시불'})`
            }
          ]
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading?.(false)
      })

    //Payment method info
  })

  const totalPayment = computed(() => {
    return priceInfoBill.value
      ? orderInfo?.value?.orderPaymentResponse?.creditCardPaymentAmount || orderInfo?.value?.orderPaymentResponse?.pgPaymentAmount
      : 0
  })

  const listCardBill = computed(() => {
    let products: ProductModel[] = []
    for (let order of billData.value) {
      if (order.deliveryOrderResponse) {
        for (let product of order.deliveryOrderResponse.deliveryProductResponses) {
          const nameOption = (product.productResponse.productOptionResponses || []).map((option) => {
            return [option.optionSmallName, option.optionLargeName, option.optionMediumName].join(' / ')
          })
          products.push({
            productImage: getImageProduct(product.productResponse.attachfilePathName ?? '', product.productResponse.attachfileName ?? ''),
            productName: product.productResponse.productName || '',
            quantity: product.orderQuantity || 1,
            pricePromotion: product.productResponse.productPrice || 1,
            nameOption: nameOption.join(', '),
            state: product.productResponse?.saleStatus ?? ProductDetailSaleStatus.onSale
          })
        }
      }
    }
    return products
  })

  const goToHome = () => {
    navigation.replace(processLink('/'))
  }

  const completeOrder = () => {
    navigation.replace(processLink(MYPAGE_ORDER_DELIVERY_INQUIRY))
  }

  return {
    billData,
    paymentInformationList,
    priceInfoBill,
    totalPayment,
    goToHome,
    listCardBill,
    isNoMember,
    completeOrder,
    orderInfo
  }
}
