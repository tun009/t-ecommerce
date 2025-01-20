import { onMounted, ref } from 'vue'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { dataCartPage } from '@/assets/mockData/cart/mock-data-cart-page'

export const useCartSuggestionProducts = () => {
  const suggestionProducts = ref<WelfareUnitProductModel[]>()
  onMounted(() => {
    handleGetSuggestionProducts()
  })
  const handleGetSuggestionProducts = () => {
    // TODO: mock data to show to screen
    suggestionProducts.value = Array.from({ length: 10 }).fill(dataCartPage.suggestionProduct) as WelfareUnitProductModel[]
  }
  return {
    suggestionProducts
  }
}
