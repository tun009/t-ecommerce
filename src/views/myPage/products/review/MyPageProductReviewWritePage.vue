<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import MyPageProductReviewItem from '@/components/myPage/products/common/MyPageProductReviewItem.vue'
import { MyPageReviewPrdDetail } from '@/models/views/myPage/MyPageProductReview'
import { myPageProductOrder } from '@/services/api/myPage/MyPageProduct'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import { onMounted } from 'vue'
import MyPageLoadingBoundary from '@/components/myPage/common/MyPageLoadingBoundary.vue'
import useAsync from '@/composables/common/useAsync'
import MyPageReviewPrdForm from '@/components/myPage/products/common/MyPageReviewPrdForm.vue'
import { useMyPageReviewPrd } from '@/composables/myPage/useMyPageReviewPrd'
import { computed } from 'vue'

const { productKey } = useMyPageReviewPrd()

const { fetchData, data, loading } = useAsync<MyPageReviewPrdDetail>({
  apiCall: () => myPageProductOrder.getWelfareReviewPrdDetail(+productKey.value)
})

const optionName = computed(() => {
  if (data.value && data.value.productOptionResponses && data.value.productOptionResponses.length > 0) {
    const productOptionResponse = data.value.productOptionResponses[0]
    if (productOptionResponse) {
      const { optionLargeName, optionMediumName, optionSmallName } = productOptionResponse
      return `${optionLargeName || ''} ${optionMediumName || ''} ${optionSmallName || ''}`
    }
  }
  return ''
})

const init = async () => {
  await fetchData()
}

onMounted(() => {
  init()
})
</script>
<template>
  <WelfareTitleTextStickyTop displayBackIcon :title="$t('myPage.reviewTab.label1')" class="wf-px-20--i" />

  <MyPageLoadingBoundary :loading="loading">
    <template #content>
      <div v-if="data" class="wf_container-col wf-py-20 wf-px-16">
        <div class="prd-content-header">
          <span class="wf-unit-title line-clamp-2 wf_flex-1 wf-color--g-333 wf-font_15-mid--lh140">
            {{ data.productName }}
          </span>
        </div>
        <MyPageProductReviewItem :src="data.attachfilePathName" :alt="data.attachfileName">
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
      <MyPageReviewPrdForm />
    </template>
  </MyPageLoadingBoundary>
</template>
