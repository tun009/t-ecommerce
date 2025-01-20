import { OrderPriceInfoBillModel } from '@/models/views/order/OrderProductPageModel'
import { orderApi } from '@/services/api/order/OrderApi'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { MyPageOrderDetailInformationModel } from '@/models/views/myPage/MyPageOrderDetailModel'
import {
  MyPageClaimDetailModel,
  myPageClaimDetailReasonType,
  MyPageShoppingInformationInfoRefundProductConvertor
} from '@/models/views/myPage/MypageShoppingInformationRefundModel'
import {
  MyPageShoppingInformationExchangeHistoryModel
} from '@/models/views/myPage/MyPageShoppingInformationExchangeHistoryModel'
import { DeliveryAddressCodeEnum, DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { YesNoEnum } from '@/models/common'
import { renderLabelEnum } from '@/commons'
import { myPageListMessageStatusDelivery } from '@/models/views/myPage/MyPageMainMemberModel'

export const useMyPageShoppingInformationExchangeHistory = () => {
  const route = useRoute()
  const products = ref<MyPageShoppingInformationExchangeHistoryModel[]>([])
  const priceInfoBill = ref<OrderPriceInfoBillModel>()
  const orderInformation = ref<MyPageOrderDetailInformationModel>()
  const orderDeliveryAddress = ref<DeliveryAddressModel>()

  onMounted(() => {
    orderApi
      .getOrderDetailClaim(Number(route.params.orderKey))
      .then((res) => {
        const data: MyPageClaimDetailModel = res.data
        const deliveryResponse = data.myPageClaimEntryResponses[0]?.deliveryClaimResponse?.deliveryResponse
        const { priceInfo, orderInfo } = MyPageShoppingInformationInfoRefundProductConvertor(data)
        orderInformation.value = orderInfo
        priceInfoBill.value = priceInfo
        products.value = data.myPageClaimEntryResponses.map((it) => {
          const reasonForExchange = renderLabelEnum(myPageClaimDetailReasonType, it.deliveryClaimResponse.claimDetailReason)
          const exchangeQuantity = it.deliveryClaimResponse.deliveryProductResponses[0].orderQuantity
          const exchangeOption = `${it.deliveryClaimResponse.exchangeProductResponse.optionLargeName ?? ''} ${it.deliveryClaimResponse.exchangeProductResponse.optionMediumName ?? ''} ${it.deliveryClaimResponse.exchangeProductResponse.optionSmallName ?? ''}`
          const product = it.deliveryClaimResponse.deliveryProductResponses[0].productResponse
          const claimProcessStatus = myPageListMessageStatusDelivery[it.deliveryClaimResponse.claimProcessStatus]
          return {
            product: {
              productName: product.productName,
              productImage: product.attachfilePathName,
              pricePromotion: product.productPrice,
              quantity: it.deliveryClaimResponse.deliveryProductResponses[0].orderQuantity
            },
            exchangeOption,
            exchangeQuantity,
            reasonForExchange,
            claimProcessStatus
          }
        })
        orderDeliveryAddress.value = {
          deliveryAddressCode: deliveryResponse?.deliveryAddressCode ?? DeliveryAddressCodeEnum.HOME,
          deliveryAddressBaseYn: YesNoEnum.Y,
          deliveryAddressName: deliveryResponse?.receiverName ?? '',
          deliveryTelNumber: deliveryResponse?.deliveryTelephone ?? '',
          deliveryCellphoneNumber: deliveryResponse?.deliveryCellPhone ?? '',
          address: {
            basicJibun: deliveryResponse?.deliveryLotAddress ?? '',
            basicRoad: deliveryResponse?.deliveryStreetAddress ?? '',
            detail: `(${deliveryResponse?.deliveryDetailAddress ?? ''})`,
            zipCode: deliveryResponse?.deliveryZipCode ?? ''
          }
        }
      })
      .catch(() => {
      })
  })

  const totalPayment = computed(() => {
    return priceInfoBill.value ? priceInfoBill.value?.costDelivery : 0
  })

  return {
    products,
    totalPayment,
    orderInformation,
    orderDeliveryAddress
  }
}
