import { useOrderChooseDeliveryAddressProduct } from '@/composables/order/useOrderChooseDeliveryAddressProduct'
import {
  OrderProductMessageAddressDeliveryEnum,
  orderProductMessageAddressDeliveryOptions
} from '@/models/views/order/OrderProductPageModel'
import { computed, onMounted, ref } from 'vue'
import { useModalConfirm } from './useModalConfirm'
import { useI18n } from 'vue-i18n'
import { BaseConfirmModalEmits } from '@/models/widgets/modal'
import { useModalNotification } from './useModalNotification'
import { orderModalApi } from '@/services/api/order/OrderModalApi'
import { DEFAULT_REPLACE_TEXT, renderLabelEnum } from '@/commons'
import { PopupChangeDeliveryAddressProps } from '@/components/widgets/modal/popup/PopupChangeDeliveryAddress.vue'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'

export const useChangeOrderDeliveryAddress = (emit: BaseConfirmModalEmits<any>, props: PopupChangeDeliveryAddressProps) => {
  const { t } = useI18n()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openModalNotification } = useModalNotification()

  const listDeliveryAddress = ref<DeliveryAddressModel[]>([])

  onMounted(() => {
    orderModalApi
      .getListAddressData()
      .then((data) => {
        listDeliveryAddress.value = data.data
      })
      .catch(() => { })

    if (props.nonMember && props.oldAddress) {
      newAddress.value = props.oldAddress

      if (orderProductMessageAddressDeliveryOptions.find((v) => v.value == props.oldMessageAddress)) {
        valueMessageAddress.value = props.oldMessageAddress
      } else {
        valueMessageAddress.value = OrderProductMessageAddressDeliveryEnum.other
        messageAdress.value = renderLabelEnum(orderProductMessageAddressDeliveryOptions, props.oldMessageAddress ?? OrderProductMessageAddressDeliveryEnum.other)
      }
    }
  })

  const {
    currentAddress,
    valueMessageAddress,
    messageAdress,
    stateAddress,
    inputNameCustomer,
    multiAddressDeliveryCheckbox,
    openListAddress,
    handleValidateState,
    defaultAddressDelivery,
    newAddress,
    getDataAddress
  } = useOrderChooseDeliveryAddressProduct(listDeliveryAddress, false, !props.nonMember)

  const checkClearAddressDelivery = (value: boolean) => {
    if (!value) {
      openModalConfirm({
        content: t('message.ChooseStateAddressDelivery'),
        onConfirm: () => {
          multiAddressDeliveryCheckbox.value = value
          closeModalByPop?.()
        }
      })
      return
    }

    multiAddressDeliveryCheckbox.value = value
  }

  const isEmptyNewAddress = computed(() => {
    const address = getDataAddress()
    if (stateAddress.value !== 'default') {
      return (

        !address?.address?.zipCode ||
        !address?.address?.basicJibun ||
        !address?.address?.basicRoad ||
        !address?.address?.detail || (!address?.deliveryCellphoneNumber || address?.deliveryCellphoneNumber.startsWith('-')) || (!address?.deliveryTelNumber || address?.deliveryTelNumber.startsWith('-'))
      )
    } else {
      // return props.oldAddress?.deliveryAddressBaseYn === YesNoEnum.Y && inputNameCustomer.value !== DEFAULT_RECEIVER_NAME
      return !inputNameCustomer.value
    }
  })

  const handleChangeAddress = () => {
    if (isEmptyNewAddress.value) {
      let text = ''
      const address = getDataAddress()
      if (!inputNameCustomer.value) {
        text = t('myPage.changeOrderDeliveryAddress.titleCustomer')
      } else if (!address?.deliveryAddressName) {
        text = t('myPage.changeOrderDeliveryAddress.titleReceiver')
      } else if (
        !address?.address?.zipCode ||
        !address?.address?.basicJibun ||
        !address?.address?.basicRoad ||
        !address?.address?.detail) {
        text = t('myPage.changeOrderDeliveryAddress.titleAddress')
      } else if (!address?.deliveryCellphoneNumber || address?.deliveryCellphoneNumber.startsWith('-')) {
        text = t('myPage.changeOrderDeliveryAddress.titlePhone')
      } else if (!address?.deliveryTelNumber || address?.deliveryTelNumber.startsWith('-')) {
        text = t('myPage.changeOrderDeliveryAddress.titleTel')
      }
      openModalNotification?.({
        content: t('myPage.changeOrderDeliveryAddress.notificationNoChange').replace(DEFAULT_REPLACE_TEXT, text)
      })
    } else {
      const address = getDataAddress()
      emit('onAccept', {
        deliveryAddress: address,
        messageAddressDelivery: valueMessageAddress.value !== OrderProductMessageAddressDeliveryEnum.other ? valueMessageAddress.value : messageAdress.value
      })
    }
  }

  return {
    listDeliveryAddress,
    currentAddress,
    valueMessageAddress,
    messageAdress,
    stateAddress,
    inputNameCustomer,
    multiAddressDeliveryCheckbox,
    openListAddress,
    handleValidateState,
    defaultAddressDelivery,
    newAddress,
    getDataAddress,
    checkClearAddressDelivery,
    handleChangeAddress
  }
}
