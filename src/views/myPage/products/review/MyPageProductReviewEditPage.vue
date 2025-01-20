<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import MyPageProductReviewItem from '@/components/myPage/products/common/MyPageProductReviewItem.vue'
import { MyPageReview } from '@/models/views/myPage/MyPageProductReview'
import { myPageProductOrder } from '@/services/api/myPage/MyPageProduct'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import { onMounted, computed } from 'vue'
import MyPageLoadingBoundary from '@/components/myPage/common/MyPageLoadingBoundary.vue'
import useAsync from '@/composables/common/useAsync'
import { useMyPageReviewPrd } from '@/composables/myPage/useMyPageReviewPrd'
import MyPageReviewPrdForm from '@/components/myPage/products/common/MyPageReviewPrdForm.vue'

const { fetchData, data, loading } = useAsync<MyPageReview>({
  apiCall: () => myPageProductOrder.getWelfareReviewMyReviewDetail(+orderProductReviewKey.value)
})

const { orderProductReviewKey, productReviewRequest } = useMyPageReviewPrd()

const optionName = computed(() => {
  if (!data.value || data.value.productResponse?.productOptionResponses?.length === 0) return ''

  const productOptionResponse = data.value.productResponse.productOptionResponses[0]
  if (productOptionResponse) {
    const { optionLargeName, optionMediumName, optionSmallName } = productOptionResponse
    return `${optionLargeName || ''} ${optionMediumName || ''} ${optionSmallName || ''}`
  }
  return ''
})

const init = async () => {
  const res = await fetchData()

  const reviewData = res?.value?.productReviewResponse
  if (!reviewData) return

  const { review, reviewStarPoint } = reviewData
  productReviewRequest.review = review
  productReviewRequest.reviewStarPoint = reviewStarPoint
}

onMounted(() => {
  init()
})
</script>
<template>
  <WelfareTitleTextStickyTop displayBackIcon :title="$t('myPage.reviewTab.label1')" class="wf-px-20--i" />

  <MyPageLoadingBoundary :loading="loading">
    <template #content>
      <div v-if="data && Object.entries(data).length > 0" class="wf_container-col wf-py-20 wf-px-16">
        <div class="prd-content-header">
          <span class="wf-unit-title line-clamp-2 wf_flex-1 wf-color--g-333 wf-font_15-mid--lh140">
            {{ data.productResponse.productName }}
          </span>
        </div>
        <MyPageProductReviewItem :src="data.productResponse.attachfilePathName" :alt="data.productResponse.attachfileName">
          <template #item>
            <ul class="prd-item-right-default">
              <li>
                <span>{{ optionName }}</span>
              </li>
            </ul>
          </template>
        </MyPageProductReviewItem>
      </div>
      <WelfareLineHorizontal />
      <MyPageReviewPrdForm
        v-if="data?.productReviewResponse"
        :review="data.productReviewResponse.review"
        :reviewStarPoint="data.productReviewResponse.reviewStarPoint"
        :product-review-file-responses="data.productReviewResponse.productReviewFileResponses"
      />
    </template>
  </MyPageLoadingBoundary>
</template>

<style lang="scss" scoped>
.prd {
  &-content {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
}
</style>
