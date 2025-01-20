import { listSplitContact } from '@/commons'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { orderApi } from '@/services/api/order/OrderApi'
import { computed, onBeforeMount, ref } from 'vue'

export const useProductOrderDeliveryNew = (
  props: {
    currentAddress: DeliveryAddressModel
    gapWrapForm?: number
    isHiddenTypeDelivery?: boolean
    isHiddenAddressCheckboxDefault?: boolean
  },
  emits: (e: 'update:currentAddress', data: DeliveryAddressModel) => void
) => {
  const typeAddressDelivery = ref()
  const listAddressDelivery = ref<WelfareSelectDataModel[]>([])
  const recipient = ref('')

  const phone = computed(() => {
    const contacts = listSplitContact(props.currentAddress.deliveryTelNumber ?? '')
    return {
      code: contacts?.[0] ? contacts?.[0] : '',
      phone: contacts.length === 3 ? contacts.slice(-2).join('-') : ''
    }
  })

  const contact = computed(() => {
    const contacts = listSplitContact(props.currentAddress.deliveryCellphoneNumber ?? '')
    return {
      code: contacts?.[0] ? contacts?.[0] : '',
      phone: contacts.length === 3 ? contacts.slice(-2).join('-') : ''
    }
  })

  const refSearchAddress = ref()

  onBeforeMount(() => {
    orderApi
      .getTypeDelivery()
      .then((data) => {
        listAddressDelivery.value = data.data
        typeAddressDelivery.value = data.data?.[0].value
      })
      .catch(() => {})
  })

  const handleSetCurrentAddress = (field: keyof DeliveryAddressModel, value: string) => {
    if (field === 'address') {
      emits('update:currentAddress', {
        ...props.currentAddress,
        address: {
          ...props.currentAddress?.address,
          detail: value
        }
      })
      return
    }
    emits('update:currentAddress', {
      ...props.currentAddress,
      [field]: value
    })
  }

  return {
    recipient,
    phone,
    contact,
    typeAddressDelivery,
    listAddressDelivery,
    refSearchAddress,
    handleSetCurrentAddress
  }
}
