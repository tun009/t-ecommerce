import { OrderCartGroupDeliveryAddressModel, OrderPriceInfoBillModel } from '@/models/views/order/OrderProductPageModel'
import { orderApi } from '@/services/api/order/OrderApi'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { MyPageOrderDetailInformationModel } from '@/models/views/myPage/MyPageOrderDetailModel'
import { MyPageShoppingInformationInfoRefundProductConvertor } from '@/models/views/myPage/MypageShoppingInformationRefundModel'
import { MyPageOrderRefundResponse } from '@/models/views/myPage/MyPageCancelExchangeReturnModel'

export const useMyPageShoppingInformationRefundDetail = () => {
  const route = useRoute()
  const products = ref<OrderCartGroupDeliveryAddressModel[]>([])
  const priceInfoBill = ref<OrderPriceInfoBillModel>()
  const orderInformation = ref<MyPageOrderDetailInformationModel>()
  const refundBill = ref<OrderPriceInfoBillModel>()
  const orderRefundResponseDetail = ref<MyPageOrderRefundResponse>()

  onMounted(() => {
    orderApi
      .getOrderDetailClaim(Number(route.params.orderKey))
      .then((data) => {
        const { orderProducts, priceInfo, orderInfo,orderRefundBill,orderRefundResponse } = MyPageShoppingInformationInfoRefundProductConvertor(data.data)
        products.value = orderProducts
        orderInformation.value = orderInfo
        priceInfoBill.value = priceInfo
        refundBill.value = orderRefundBill
        orderRefundResponseDetail.value = orderRefundResponse
      })
      .catch(() => {})
  })

  const totalRefund = computed(() => {
    return refundBill.value
      ? refundBill.value?.totalPrice + refundBill.value?.costDelivery + refundBill.value?.priceVoucher + refundBill.value?.priceSavePoint
      : 0
  })

  return {
    products,
    priceInfoBill,
    orderInformation,
    refundBill,
    totalRefund,
    orderRefundResponseDetail
  }
}
