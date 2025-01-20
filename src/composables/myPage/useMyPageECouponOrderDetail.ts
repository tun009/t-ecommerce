import { ProductModel, ProductReturnModel, ProductState } from '@/models/uikits/WelfareUnitCardTypes'
import { MyPageCancelExchangeReturnModel, MyPageOrderProductResponse } from '@/models/views/myPage/MyPageCancelExchangeReturnModel'
import { MyPageStatusDeliveryOrder, myPageListMessageStatusDelivery } from '@/models/views/myPage/MyPageMainMemberModel'
import { orderApi } from '@/services/api/order/OrderApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useMyPageECouponOrderDetail = () => {
  const route = useRoute()
  const product = ref<MyPageCancelExchangeReturnModel>()
  const mapReturnToProductModel = (returnModel: ProductReturnModel, orderProductResponse: MyPageOrderProductResponse): ProductModel => {
    return {
      id: returnModel.receiverProductOrderKey,
      productName: orderProductResponse.productName,
      productImage: returnModel.ticketImageUrl,
      pricePromotion: returnModel.productPrice,
      quantity: returnModel.quantity,
      state: ProductState.normal,
      deliveryName: returnModel.receiverName
    }
  }

  const mapReturnOrderDeliveryStatus = (status: MyPageStatusDeliveryOrder): string => {
    return myPageListMessageStatusDelivery[status]
  }

  onMounted(() => {
    orderApi
      .getOrderDetailCoupon(Number(route.params.orderKey))
      .then((data) => {
        product.value = data.data
      })
      .catch(() => {})
  })

  return {
    product,
    mapReturnToProductModel,
    mapReturnOrderDeliveryStatus
  }
}
