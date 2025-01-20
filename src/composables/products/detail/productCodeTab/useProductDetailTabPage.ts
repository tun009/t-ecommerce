import ProductDetailProductCodeTabWrap from '@/components/products/detail/productCode/ProductDetailProductCodeTabWrap.vue'
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
import { computed, ref } from 'vue'
import ProductDetailProductQuestionAndAnswer from '@/components/products/detail/productQuestionAndAnswer/ProductDetailProductQuestionAndAnswerWrap.vue'
import ProductDetailReviews from '@/components/products/detail/ProductDetailReviews.vue'
import { ProductCountTabModel } from '@/models/views/products/ProductDetailReviewModel'

export const useProductDetailTabPage = (props?: ProductCountTabModel) => {
  const refExpander = ref()
  const refTabs = ref()
  const tabs = computed(() => {
    return [
      {
        id: 'wf-detail-tab',
        label: '상세',
        component: ProductDetailProductCodeTabWrap
      },
      {
        id: 'wf-review-tab',
        label: `상품평(${props?.countTabReview ?? 0})`,
        component: ProductDetailReviews
      },
      {
        id: 'wf-qa-tab',
        label: `문의(${props?.countTabQuestion ?? 0})`,
        component: ProductDetailProductQuestionAndAnswer
      }
    ]
  })

  const currentActive = ref<number>(0)

  const handleChangeTab = (item: WelfareTabDataType) => {
    currentActive.value = tabs.value.findIndex((i) => i.id === item.id)
    // requestIdleCallback(() => {
    document.getElementById('wf-tab-sticky-top')?.scrollIntoView({ behavior: 'smooth' })
    // })
  }

  return { tabs, handleChangeTab, currentActive, refExpander, refTabs }
}
