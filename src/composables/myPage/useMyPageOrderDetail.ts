import {
  OrderCartGroupDeliveryAddressModel,
  OrderPriceInfoBillModel
} from '@/models/views/order/OrderProductPageModel'
import { orderApi } from '@/services/api/order/OrderApi'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderBank } from '../order/useOrderBank'
import { useModal } from '../common/useModal'
import PopupChangeDeliveryAddressVue from '@/components/widgets/modal/popup/PopupChangeDeliveryAddress.vue'
import { MyPageOrderDetailInformationModel, MyPageOrderDetailProductConvertor } from '@/models/views/myPage/MyPageOrderDetailModel'
import MyPageListDeliveryModal from '@/views/myPage/modal/MyPageListDeliveryModal.vue'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { OrderChangeAddressRequest } from '@/models/services/requests/order/OrderParamsRequest'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { useI18n } from 'vue-i18n'
import { MyPageStatusDeliveryOrder } from '@/models/views/myPage/MyPageMainMemberModel'

export const useMyPageOrderDetail = () => {
  const { t } = useI18n()
  const route = useRoute()
  const isNonMember = computed(() => route.query.address === 'NON_MEMBER')
  const isRefundOrder = computed(() => refundBill.value?.totalPrice != 0)
  const { showModal, closeModalByPop, closeAllModal } = useModal()
  const { openModal: openModalNotification } = useModalNotification()

  const isSingleAddress = ref(true)
  const products = ref<OrderCartGroupDeliveryAddressModel[]>([])
  const priceInfoBill = ref<OrderPriceInfoBillModel>()
  const refundBill = ref<OrderPriceInfoBillModel>()
  const orderInformation = ref<MyPageOrderDetailInformationModel>()
  const orderDeliveryKey = ref<number>()
  const orderProcessStatus = ref<string[]>([])
  const claimStatus = ref<string[]>([])
  const finalOrderStatus = ref<string[]>([])

  const isShowChangeAddressButton = computed(() => {
    return !orderProcessStatus.value.find(i => i != MyPageStatusDeliveryOrder.PAYMENT_COMPLETE) &&
      !claimStatus.value.find(i => i != MyPageStatusDeliveryOrder.NO_CLAIM) &&
      !finalOrderStatus.value.find(i => i != MyPageStatusDeliveryOrder.PAYMENT_COMPLETE)
  })

  const orderKey = computed(() => Number(route.params.orderKey))

  const {
    paymentMethodUseAgain,
    switchMethodPaymentRadio,
    currentBank,
    methodPaymentSelect,
    installmentMonthSelect,
    optionsPaymentMethod,
    optionsInstallmentMonthSelect,
    dataBanks,
    validateBank
  } = useOrderBank()
  const agreePolicyCheckbox = ref(false)

  onMounted(() => {
    handleShowPreviewModal()
    currentBank.value = 1
    if (route.query.type === 'MULTIPLE_ADDRESS') {
      isSingleAddress.value = false
    }

    orderApi
      .getOrderDetailCoupon(orderKey.value)
      .then((data) => {
        const { orderProducts, priceInfo, orderInfo, orderRefundBill, orderDeliveryKey: odKey, orderProcessStatus: oStatus, claimStatus: cStatus, finalOrderStatus: foStatus } = MyPageOrderDetailProductConvertor(data.data)
        products.value = orderProducts
        orderInformation.value = orderInfo
        priceInfoBill.value = priceInfo
        refundBill.value = orderRefundBill
        orderDeliveryKey.value = odKey
        orderProcessStatus.value = oStatus
        claimStatus.value = cStatus
        finalOrderStatus.value = foStatus
      })
      .catch(() => { })
  })

  const totalPayment = computed(() => {
    return priceInfoBill.value
      ? priceInfoBill.value?.totalPrice + priceInfoBill.value?.costDelivery - priceInfoBill.value?.priceVoucher - priceInfoBill.value?.priceSavePoint
      : 0
  })

  const handleClickOther = (bank: number | undefined, callback: () => void) => {
    callback()
  }

  const showModalChangeDeliveryAddress = (
    index: number,
    oldAddress?: DeliveryAddressModel,
    oldMessageAddress?: string,
    nonMember?: boolean
  ) => {
    showModal?.({
      component: PopupChangeDeliveryAddressVue,
      props: {
        oldAddress: oldAddress,
        oldMessageAddress: oldMessageAddress,
        nonMember: nonMember
      },
      events: {
        onClose: () => closeModalByPop?.(),
        onAccept: (address: OrderCartGroupDeliveryAddressModel) => {
          handleChangeAddress(address, index)
        }
      }
    })
  }

  const handleChangeAddress = (address: OrderCartGroupDeliveryAddressModel, index: number) => {
    const request: OrderChangeAddressRequest = {
      orderKey: orderKey.value ?? 0,
      orderDeliveryKey: orderDeliveryKey.value ?? 0,
      deliveryAddressInfo: {
        deliveryAddressCode: address.deliveryAddress.deliveryAddressCode ?? '',
        receiverName: address.deliveryAddress.deliveryAddressName ?? '',
        deliveryZipCode: address.deliveryAddress.address?.zipCode ?? '',
        deliveryStreetAddress: address.deliveryAddress.address?.basicJibun ?? '',
        deliveryLotAddress: address.deliveryAddress.address?.basicRoad ?? '',
        deliveryDetailAddress: address.deliveryAddress.address?.detail ?? '',
        deliveryCellPhone: address.deliveryAddress.deliveryCellphoneNumber?.replaceAll('-', '') ?? '',
        deliveryTelephone: address.deliveryAddress.deliveryTelNumber?.replaceAll('-', '') ?? '',
        deliveryRequestType: address.messageTypeAddressDelivery ?? '',
        deliveryRequestContent: address.messageAddressDelivery ?? ''
      }
    }
    orderApi
      .changeOrderDeliveryAddress(request)
      .then(() => {
        products.value[index].deliveryAddress = address.deliveryAddress
        products.value[index].messageAddressDelivery = address.messageAddressDelivery
        openModalNotification?.({
          content: t('myPage.changeOrderDeliveryAddress.notificationChangeSuccess'),
          onAccept() {
            closeAllModal?.()
          }
        })
      })
      .catch(() => { })
  }

  const showModalListDelivery = (id: number) => {
    showModal?.({
      component: MyPageListDeliveryModal,
      props: {
        id: id
      },
      events: {
        onClose: () => closeModalByPop?.()
      }
    })
  }

  const handleShowPreviewModal = () => {
    if (route.query.modal === 'CHANGE_DELIVERY_ADDRESS') {
      showModalChangeDeliveryAddress(0)
    } else if (isNonMember.value) {
      showModalChangeDeliveryAddress(0, undefined, undefined, true)
    }
  }

  return {
    isSingleAddress,
    products,
    priceInfoBill,
    totalPayment,
    paymentMethodUseAgain,
    switchMethodPaymentRadio,
    currentBank,
    methodPaymentSelect,
    installmentMonthSelect,
    optionsPaymentMethod,
    optionsInstallmentMonthSelect,
    dataBanks,
    validateBank,
    handleClickOther,
    agreePolicyCheckbox,
    showModalChangeDeliveryAddress,
    showModalListDelivery,
    isNonMember,
    isRefundOrder,
    refundBill,
    orderInformation,
    isShowChangeAddressButton
  }
}
