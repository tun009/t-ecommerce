import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { OrderProductCustomerDeliveryAddressModel } from '@/models/views/order/OrderProductPageModel'

export interface FormAddressProps {
  modelValue: OrderProductCustomerDeliveryAddressModel
}

export type FormAddressEmits = (e: 'update:modelValue', value: DeliveryAddressModel) => void
