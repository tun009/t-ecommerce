import { useDeliveryAddress } from '@/composables/widgets/modal/useDeliveryAddress'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { OrderDeliveryAddressModalEmits } from '@/models/views/order/modal/OrderDeliveryAddressModel'
import { watch } from 'vue'

export const useOrderDeliveryAddress = (emits: OrderDeliveryAddressModalEmits) => {
  const chooseAddress = (item: DeliveryAddressModel) => {
    emits('choose', item)
    closeModalByPop?.()
  }

  const {
    items,
    onEditAddress: editAddress,
    onAddAddress: addAddress,
    handleDisplayDeliveryAddressCode,
    closeModalByPop,
    loading
  } = useDeliveryAddress()
  watch(items, (newItems) => {
    emits('changeListAddress', newItems)
  })

  return { items, chooseAddress, editAddress, addAddress, handleDisplayDeliveryAddressCode, loading }
}
