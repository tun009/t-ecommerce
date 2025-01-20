<script setup lang="ts">
import WelfareScore from '@/components/uikit/score/WelfareScore.vue'
import WelfareSeparateStraightStripeItems from '@/components/widgets/common/WelfareSeparateStraightStripeItems.vue'
import ProductDetailReviewLike from './ProductDetailReviewLike.vue'
import ProductDetailListImageVideo from './ProductDetailListImageVideo.vue'
import { onMounted } from 'vue'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import ProductDetailViewDetailProductReviewModal from './ProductDetailViewDetailProductReviewModal.vue'
import ProductDetailReportModal from './ProductDetailReportModal.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { ProductDetailReviewsResponseModel } from '@/models/services/responses/products/detail/ProductDetailReviewsResponse'
import { SIZE_FILE_REVIEW, formatTimeWithDot } from '@/commons'
interface ProductDetailReviewItemProps {
  class?: string
  review: ProductDetailReviewsResponseModel
  refresh?: () => void
}
type ProductDetailReviewItemEmits = (e: 'on-like', orderProductReviewKey: number, like: boolean) => void
const props = defineProps<ProductDetailReviewItemProps>()
defineEmits<ProductDetailReviewItemEmits>()
onMounted(() => {
  const desReviews = document.querySelectorAll('.wf-product-detail-review-des')
  desReviews.forEach((desReview) => {
    // 15: min height of one line text, if greater than 1 line must be have line height = 17.5px
    if (desReview.clientHeight > 15) {
      desReview.classList.add('wf_line-height-17-5')
    }
  })
})
const { showModal: showModalBottomSheet, closeModal } = useModalBottomSheet()
const handleShowModalViewDetailReview = (reviewFileKey?: number) => {
  showModalBottomSheet?.({
    type: ModalBottomSheetType.click,
    component: ProductDetailViewDetailProductReviewModal,
    props: {
      orderProductReviewKey: props.review?.orderProductReviewKey ?? '',
      reviewFileKey: reviewFileKey
    },
    events: {
      close: () => {
        closeModal?.()
        props.refresh?.()
      }
    }
  })
}
const handleShowModalFormReport = () => {
  showModalBottomSheet?.({
    type: ModalBottomSheetType.click,
    component: ProductDetailReportModal,
    props: {
      reportKey: props.review?.orderProductReviewKey ?? ''
    },
    events: {
      close: closeModal
    }
  })
}
</script>
<template>
  <div class="wf_flex wf_flex-col wf-space-y-20 wf-pb-18 wf-br-b-1 wf-br--g-e-7" :class="$props.class">
    <div class="wf_flex wf_items-end wf_justify-between wf-pr-1">
      <WelfareScore small boldText :value="$props.review?.productReviewResponse?.rewardPoint ?? 0" />
      <span class="wf-color--g-999 wf-font_15--reg">{{ $props.review?.productReviewResponse?.memberId ?? '' }}</span>
    </div>
    <div class="wf_flex wf_flex-col wf-space-y-15 wf-color--g-555 wf-font_15--reg">
      <div class="wf_flex wf_justify-between wf_items-center">
        <div class="wf_flex wf_items-center wf-space-x-10">
          <span class="wf-color--g-333 wf-font_15--bold wf_letter-spacing--1 wf_white-space--nowrap">{{
            $t('productDetail.productReview.purchaseInformation')
          }}</span>
          <span class="wf-line-clamp-1">{{
            $props.review.productResponse?.productOptionResponses && $props.review.productResponse?.productOptionResponses.length > 0
              ? $props.review.productResponse?.productOptionResponses?.map((i) => i.optionLargeName).join()
              : $props.review.productResponse?.productName
          }}</span>
        </div>
        <div
          @click="handleShowModalViewDetailReview()"
          class="wf_flex wf_items-center wf-color--g-555 wf-font_14-reg--lh130 wf-space-x-2 wf_white-space--nowrap wf-pointer"
        >
          <span> {{ $t('myPage.inquiryList.buttonLoadMore') }}</span>
          <IconArrowRight />
        </div>
      </div>
      <span class="wf-product-detail-review-des">
        {{ $props.review.productReviewResponse?.review }}
      </span>
      <ProductDetailListImageVideo
        v-if="
          $props.review.productReviewResponse?.productReviewFileResponses &&
          $props.review.productReviewResponse?.productReviewFileResponses?.length > 0
        "
        :medias="$props.review.productReviewResponse?.productReviewFileResponses.slice(0, SIZE_FILE_REVIEW)"
        :hideViewMore="$props.review.productReviewResponse?.productReviewFileResponses.length <= SIZE_FILE_REVIEW"
        :refresh="$props.refresh"
      />
    </div>
    <div class="wf_flex wf_items-center wf_justify-between">
      <WelfareSeparateStraightStripeItems
        :items="[formatTimeWithDot($props.review.productReviewResponse?.reviewCreationDate ?? ''), $t('productDetail.productReview.declaration')]"
        @update="handleShowModalFormReport"
        :disabled-click-index="0"
      />
      <ProductDetailReviewLike
        :value="$props.review?.productReviewResponse?.totalLikes ?? 0"
        :like="$props.review?.productReviewResponse?.canModifyLikes"
        @click="() => $emit('on-like', $props.review?.orderProductReviewKey ?? 0, !$props.review?.productReviewResponse?.canModifyLikes)"
      />
    </div>
  </div>
</template>