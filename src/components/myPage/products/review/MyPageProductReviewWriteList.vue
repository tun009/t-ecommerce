<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import MyPageProductReviewCard from '@/components/myPage/products/common/MyPageProductReviewCard.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { myPageProductOrder } from '@/services/api/myPage/MyPageProduct'
import { MyPageReviewMyOrder } from '@/models/views/myPage/MyPageProductReview'
import MyPageNotFound from '../common/MyPageNotFound.vue'
import useAsync from '@/composables/common/useAsync'
import MyPageLoadingBoundary from '@/components/myPage/common/MyPageLoadingBoundary.vue'

const router = useRouter()

const { fetchData, data, loading } = useAsync<MyPageReviewMyOrder[]>({
  apiCall: () => myPageProductOrder.getWelfareReviewMyOrder()
})

const init = async () => {
  await fetchData()
}

onMounted(() => {
  init()
})
</script>
<template>
  <MyPageLoadingBoundary :loading="loading">
    <template #content>
      <div v-if="data && data.length > 0">
        <div class="wf-py-20 wf-px-16" v-for="(item, index) in data" :key="index">
          <MyPageProductReviewCard
            :product-name="item.productResponse.productName"
            :order-key="item.orderKey"
            :product-option-responses="item.productResponse.productOptionResponses"
            :attachfile-path-name="item.productResponse.attachfilePathName"
            :attachfile-name="item.productResponse.attachfileName"
            :order-quantity="item.orderQuantity"
          >
            <template #footer>
              <div class="prd-order-button">
                <WelfareButtonLine
                  class="wf_w-full custom-btn"
                  md-state="line"
                  type="md"
                  :text="$t('myPage.reviewCard.buttonTitle')"
                  :active="false"
                  @click="
                    () =>
                      router.push({
                        path: `/my-page/products/review/write`,
                        query: {
                          productKey: item.productResponse.productKey,
                          orderProductKey: item.orderProductKey
                        }
                      })
                  "
                />
              </div>
            </template>
          </MyPageProductReviewCard>
        </div>
      </div>
      <MyPageNotFound v-else :desc="$t('myPage.notFound.title1')" />
    </template>
  </MyPageLoadingBoundary>
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/product/review/_welfare-my-page-product-write.scss');
</style>
