import { OrderCartGroupDeliveryAddressModel, OrderProductCustomerDeliveryAddressModel } from "@/models/views/order/OrderProductPageModel";

export interface OrderApplyCouponProps {
  deliveryAddress: OrderProductCustomerDeliveryAddressModel[]
  orderCarts: OrderCartGroupDeliveryAddressModel[]
}

