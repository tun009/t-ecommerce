import { onMounted, ref } from 'vue'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { orderApi } from '@/services/api/order/OrderApi'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('order-cart', () => {
  const cartProducts = ref<ProductModel[]>([])

  onMounted(() => {
    orderApi
      .getListProductCustomerCart()
      .then((data) => {
        cartProducts.value = data.data
      })
      .catch(() => {})
  })

  return {
    cartProducts
  }
})
