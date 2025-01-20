<script setup lang="ts">
import { SIZE_FILE_REVIEW } from '@/commons'
import IconWriteReview from '@/components/icons/IconWriteReview.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareScore from '@/components/uikit/score/WelfareScore.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareSeparateStraightStripeItems from '@/components/widgets/common/WelfareSeparateStraightStripeItems.vue'
import ProductDetailReviewItem from './common/ProductDetailReviewItem.vue'
import ProductDetailListImageVideo from './common/ProductDetailListImageVideo.vue'
import { useProductDetailReviewsPage } from '@/composables/products/detail/productDetail/useProductDetailReviewsPage'
import InfiniteLoadingDataVue from '@/components/widgets/InfiniteLoadingData.vue'
import {
  ProductDetailListReviewSearchSortType,
  ProductDetailReviewSearchSortType,
  SORT_REVIEWS
} from '@/models/views/products/detail/ProductDetailViewPhotoVideoProductModel'

const { reviewBaseInfo, hideDes, reviews, activeSortReview, handleLikeReview, reviewFiles, handleLoadMore, hasMore, refresh, handleClickNewReview } =
  useProductDetailReviewsPage()
</script>

<template>
  <div class="wf_flex wf_flex-col wf-space-y-30 wf-tab-review">
    <div class="wf-px-20 wf-py-20 wf-bg--g-f-5-f-5-f wf_flex wf_flex-col wf-space-y-15 wf-color--g-555 wf-font_15--reg" v-if="!hideDes">
      <span>{{ $t('productDetail.productReview.rewardTitle') }}</span>
      <div class="wf_flex wf_flex-col wf-space-y-10">
        <p
          class="wf_flex wf_items-center"
          v-for="(text, index) in [
            $t('productDetail.productReview.rewardPointOne'),
            $t('productDetail.productReview.rewardPointSecond'),
            $t('productDetail.productReview.rewardPointThird')
          ]"
          v-bind:key="index"
        >
          <span class="wf-mr-4 wf-ml--2 wf-color--g-bbb">&#x2022;</span>
          <span v-html="text" />
        </p>
      </div>
      <span>{{ $t('productDetail.productReview.rewardDes') }}</span>
    </div>

    <!-- write review -->
    <div class="wf_flex wf_flex-col wf_items-center wf-space-y-21" :class="{ 'wf-pt-30': hideDes }">
      <WelfareScore :value="reviewBaseInfo?.reviewStarPoint ?? 0" centerText />
      <WelfareButtonLine md-state="default" type="md" :active="true" :text="$t('productDetail.productReview.newBtn')" @click="handleClickNewReview" />
    </div>

    <div class="wf_flex wf_flex-col wf_items-center wf-space-y-15">
      <span class="wf-color--g-111 wf-font_15--bold wf_letter-spacing--1"
        >{{ $t('productDetail.productReview.fileTitle') }} <span class="wf-font_15--reg">({{ reviewFiles.length ?? 0 }})</span></span
      >
      <ProductDetailListImageVideo :medias="reviewFiles.slice(0, SIZE_FILE_REVIEW)" class="wf-px-16" :refresh="refresh" />
    </div>

    <WelfareLineHorizontal />

    <!-- list reviews -->

    <div class="wf-pt-10 wf-pb-75 wf-mb-25 wf_flex wf_flex-col wf_items-center wf-space-y-15" v-if="reviews.length === 0">
      <IconWriteReview />
      <span class="wf-color--g-333 wf-font_15--reg">{{ $t('productDetail.productReview.empty') }}</span>
    </div>
    <div class="wf_flex wf_flex-col wf-space-y-20 wf-px-16 wf-pb-40" v-else>
      <WelfareSeparateStraightStripeItems
        isI18nText
        class="wf-ml-auto"
        :items="SORT_REVIEWS"
        :active-item="activeSortReview"
        :formatItem="(item: ProductDetailReviewSearchSortType) => ProductDetailListReviewSearchSortType[item]"
        @update="(value) => (activeSortReview = value)"
      />

      <div class="wf_width-full wf_height-1 wf-bg--g-2-e-7-e-7 wf-mb--6"></div>

      <InfiniteLoadingDataVue v-if="reviews.length > 0" @infinite="handleLoadMore" :stop-scroll="!hasMore">
        <div class="wf_flex wf_flex-col wf-space-y-14">
          <ProductDetailReviewItem
            :review="review"
            v-for="(review, index) in reviews"
            v-bind:key="index"
            :refresh="refresh"
            @on-like="(orderProductReviewKey, like) => handleLikeReview(orderProductReviewKey, like, index)"
          />
        </div>
      </InfiniteLoadingDataVue>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-reviews-page.scss');
</style>
