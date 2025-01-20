<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import MyPageProductReviewCard from '@/components/myPage/products/common/MyPageProductReviewCard.vue'
import MyPageProductReviewMediaContent from '@/components/myPage/products/review/MyPageProductReviewMediaContent.vue'
import WelfareStarRating from '@/components/uikit/score/WelfareStarRating.vue'
import { myPageProductOrder } from '@/services/api/myPage/MyPageProduct'
import { MyPageReview } from '@/models/views/myPage/MyPageProductReview'
import { onMounted } from 'vue'
import MyPageNotFound from '../common/MyPageNotFound.vue'
import useAsync from '@/composables/common/useAsync'
import MyPageLoadingBoundary from '@/components/myPage/common/MyPageLoadingBoundary.vue'
import { useModalConfirm } from '@/composables/widgets/modal/useModalConfirm'
import { useRouter } from 'vue-router'

const router = useRouter()
const { openModal, closeAllModal } = useModalConfirm()

const { fetchData, data, loading } = useAsync<MyPageReview[]>({
  apiCall: () => myPageProductOrder.getWelfareReviewMyReview()
})

const emit = defineEmits(['init'])

const formatDate = (reviewCreationDate: string) => {
  const regex = /(\d{4})\/(\d{2})\/(\d{2})/
  return reviewCreationDate.replace(regex, '$1-$2-$3')
}

const deleteMyReviewPrd = async (orderProductReviewKey: number) => {
  try {
    await myPageProductOrder.deleteWelfareReviewMyReview(orderProductReviewKey)
    emit('init')
    closeAllModal?.()
    await fetchData()
  } catch (error) {
    console.error(error)
  }
}

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
          />

          <div class="prd-review-card" key="1">
            <div class="prd-review-box wf-py-20 wf-px-16">
              <div class="prd-review-header">
                <div class="prd-review-star">
                  <WelfareStarRating :rating="item.productReviewResponse.reviewStarPoint" :index="index" small readonly />
                </div>
                <div class="prd-review-date wf-font_15--reg">
                  {{ formatDate(item.productReviewResponse.reviewCreationDate) }}
                </div>
              </div>

              <div class="prd-review-content wf-font_15--reg">
                <div>
                  <span>
                    {{ item.productReviewResponse.review }}
                  </span>
                </div>
                <div v-if="item.productReviewResponse?.productReviewFileResponses?.length > 0">
                  <MyPageProductReviewMediaContent :productReviewFileResponses="item.productReviewResponse.productReviewFileResponses" />
                </div>
              </div>
              <div class="prd-review-footer">
                <WelfareButtonLine
                  type="sm"
                  :text="$t('button.edit')"
                  @click="() => router.push(`/my-page/products/review/edit?orderProductReviewKey=${item.orderProductReviewKey}`)"
                />
                <WelfareButtonLine
                  type="sm"
                  :text="$t('button.delete')"
                  @click="
                    () => {
                      openModal({
                        content: $t('myPage.reviewwModal.text1'),
                        onConfirm: () => {
                          deleteMyReviewPrd(item.orderProductReviewKey)
                        }
                      })
                    }
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MyPageNotFound v-else :desc="$t('myPage.notFound.title2')" />
    </template>
  </MyPageLoadingBoundary>
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/product/review/_welfare-my-page-product-review.scss');
</style>
