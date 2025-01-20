import { DEFAULT_RECEIVER_NAME } from '@/commons'
import { listSplitContact } from '@/commons/common'
import { YesNoEnum } from '@/models/common'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import {
  OrderProductMessageAddressDeliveryEnum,
  OrderProductStateAddress,
  orderProductInitialAddressDelivery
} from '@/models/views/order/OrderProductPageModel'
import OrderDeliveryAddressModal from '@/views/order/modal/OrderDeliveryAddressModal.vue'
import { Ref, computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useModal } from '../common/useModal'
import { useModalNotification } from '../widgets/modal/useModalNotification'

export const useOrderChooseDeliveryAddressProduct = (listDeliveryAddress: Ref<DeliveryAddressModel[]>, isHiddenModal?: boolean) => {
  const route = useRoute()
  const multiAddressDeliveryCheckbox = ref(false)
  const { t } = useI18n()

  const inputNameCustomer = ref(DEFAULT_RECEIVER_NAME)
  const currentAddress = ref<DeliveryAddressModel>({
    ...(orderProductInitialAddressDelivery as any)
  })

  const newAddress = ref<DeliveryAddressModel>({
    ...(orderProductInitialAddressDelivery as any)
  })
  const { openModal: openModalConfirm, closeModalByPop } = useModalNotification()
  const { showModal } = useModal()
  const valueMessageAddress = ref<OrderProductMessageAddressDeliveryEnum>()
  const messageAdress = ref()

  const defaultAddressDelivery = computed(() => {
    return listDeliveryAddress.value.find((item) => item.deliveryAddressBaseYn === YesNoEnum.Y)
  })

  const stateAddress = ref<OrderProductStateAddress>('default')

  watch(listDeliveryAddress.value, (newList) => {
    const isNotDefault = newList.find((item) => item.deliveryAddressBaseYn === YesNoEnum.Y)
    stateAddress.value = isNotDefault ? 'default' : 'new'
  })

  const openListAddress = () => {
    showModal?.({
      component: OrderDeliveryAddressModal,
      events: {
        choose: (item: DeliveryAddressModel) => {
          newAddress.value = {
            ...item
          }
          currentAddress.value = item
        },
        changeListAddress: (items: DeliveryAddressModel[]) => {
          listDeliveryAddress.value = items
        },
        close: () => {
          closeModalByPop?.()
        }
      }
    })
  }

  const openModalValidate = (value: string | undefined, message: string) => {
    // console.log({ value })
    if (!value) {
      if (!isHiddenModal) {
        openModalConfirm({
          content: message,
          onAccept: () => {
            closeModalByPop?.()
            moveAddressBox()
          }
        })
      }
      return false
    }
    return true
  }

  const validateAddress = (data: DeliveryAddressModel | undefined) => {
    if (!openModalValidate(data?.deliveryAddressName, t('message.enterNameAndAdress'))) {
      return false
    }
    if (!openModalValidate(data?.address?.zipCode, t('message.enterYourAddress'))) {
      return false
    }

    if (!openModalValidate(data?.address?.detail, t('message.enterYourAddress'))) {
      return false
    }

    if (!openModalValidate(data?.address?.basicRoad, t('message.enterYourAddress'))) {
      return false
    }

    if (
      !openModalValidate(
        listSplitContact(data?.deliveryCellphoneNumber ?? '').length === 3 ? data?.deliveryCellphoneNumber : '',
        t('message.enterPhone')
      )
    ) {
      return false
    }
    return true
  }

  const handleValidateState = () => {
    if (!inputNameCustomer.value.trim()) return openModalValidate(inputNameCustomer.value, t('message.enterNameAddress'))
    if (stateAddress.value === 'default') {
      return validateAddress(defaultAddressDelivery.value)
    }

    if (stateAddress.value === 'new') {
      return validateAddress(newAddress.value)
    }

    if (stateAddress.value === 'list') {
      return validateAddress(currentAddress.value)
    }
  }

  const moveAddressBox = () => {
    const boxAddress = document.getElementById('wf-address-order')
    if (boxAddress) {
      boxAddress.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  onMounted(() => {
    handleShowModalPreviewListAddress()
  })

  const handleShowModalPreviewListAddress = () => {
    const modal = route.query.modal
    if (modal === 'list_delivery_address') {
      openListAddress()
    }
  }

  const getDataAddress = () => {
    if (stateAddress.value === 'default') return defaultAddressDelivery.value
    return stateAddress.value === 'list' ? currentAddress.value : newAddress.value
  }

  const getStateAddress = () => {
    return stateAddress.value
  }

  const getMessageAddress = () => {
    return {
      valueMessageAddress,
      messageAdress
    }
  }

  return {
    currentAddress,
    valueMessageAddress,
    messageAdress,
    stateAddress,
    inputNameCustomer,
    defaultAddressDelivery,
    multiAddressDeliveryCheckbox,
    openListAddress,
    handleValidateState,
    getDataAddress,
    newAddress,
    getStateAddress,
    getMessageAddress
  }
}
