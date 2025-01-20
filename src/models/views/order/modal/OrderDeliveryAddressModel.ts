import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'

export interface OrderDeliveryAddressModalProps {
  deliveryAddressKey: number
}

export interface OrderDeliveryAddressModalEmits {
  (e: 'choose', value: DeliveryAddressModel): void
  (e: 'changeListAddress', value: DeliveryAddressModel[]): void
  (e: 'close'): void
}
