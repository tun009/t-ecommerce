import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductOrderPage } from '@/composables/order/useOrderProductPage'
import { orderApi } from '@/services/api/order/OrderApi'
import { MyPageOrderDetailProductConvertor } from '@/models/views/myPage/MyPageOrderDetailModel'
import { OrderCartGroupDeliveryAddressModel } from '@/models/views/order/OrderProductPageModel'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import MyPageRefundInformationModalVue from '@/views/myPage/modal/MyPageRefundInformationModal.vue'

export const useMyPageInquiryExchangeRequest = () => {
  const orderData = ref<OrderCartGroupDeliveryAddressModel[]>()
  const router = useRoute()
  const { showModal, closeModal } = useModalBottomSheet()
  const orderKey = computed(() => Number(router.query.orderKey))

  const {
    listDeliveryAddress,
    currentAddress,
    valueMessageAddress,
    messageAdress,
    stateAddress,
    inputNameCustomer,
    multiAddressDeliveryCheckbox,
    openListAddress,
    defaultAddressDelivery,
    newAddress,
    checkClearAddressDelivery,
    showModalChooseMultiAddress,
    cartProductDelivery
  } = useProductOrderPage()

  onMounted(() => {
    if (orderKey.value) {
      orderApi
        .getOrderDetailCoupon(orderKey.value)
        .then((data) => {
          const { orderProducts } = MyPageOrderDetailProductConvertor(data.data)
          orderData.value = orderProducts
        })
        .catch(() => { })
    }
  })



  const handleShowExchangeFeeInformationModal = () => {
    showModal?.({
      type: ModalBottomSheetType.swipeFitContent,
      component: MyPageRefundInformationModalVue,
      hideHeader: true,
      props: {
        title: 'myPage.refundInformation.titleExchange',
        showCheckbox: true,
        orderKey: orderKey.value
      },
      events: {
        close: () => {
          closeModal?.()
        }
      }
    })
  }

  return {
    orderData,
    currentAddress,
    valueMessageAddress,
    messageAdress,
    stateAddress,
    inputNameCustomer,
    multiAddressDeliveryCheckbox,
    openListAddress,
    defaultAddressDelivery,
    newAddress,
    listDeliveryAddress,
    checkClearAddressDelivery,
    showModalChooseMultiAddress,
    cartProductDelivery,
    handleShowExchangeFeeInformationModal
  }
}
