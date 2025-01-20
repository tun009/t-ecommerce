import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { myPageOrderHistoryApi } from '@/services/api/myPage/MyPageOrderHistoryApi'
import { onBeforeMount, ref } from 'vue'

export const useMyPageOrderHistory = () => {
  const orderHProducts = ref<ProductModel>()

  onBeforeMount(() => {
    myPageOrderHistoryApi
      .getListOrderHistory()
      .then((data) => {
        orderHProducts.value = data.data
      })
      .catch(() => {})
  })

  return {
    orderHProducts
  }
}
