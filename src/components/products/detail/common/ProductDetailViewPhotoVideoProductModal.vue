<script setup lang="ts">
import { DEFAULT_DEBOUNCE_TIME, PAGE_SIZE_12, getImageOrderFullPath, getVideoOrderFullPathWithPoster } from '@/commons'
import IconPlayVideoCircle from '@/components/icons/IconPlayVideoCircle.vue'
import WelfareButtonFull from '@/components/uikit/button/WelfareButtonFull.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import { useHandleResponsePagination } from '@/composables/common/useHandleResponsePagination'
import {
  ProductDetailListReviewSearchSortType,
  ProductDetailReviewPhotoVideoResponse,
  ProductDetailReviewSearchSortType,
  SORT_REVIEWS
} from '@/models/views/products/detail/ProductDetailViewPhotoVideoProductModel'
import { productDetailReviewsApi } from '@/services/api/products/detail/ProductDetailReviewsApi'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductDetailViewDetailProductReviewModal from './ProductDetailViewDetailProductReviewModal.vue'
import { useModal } from '@/composables/common/useModal'
import { AttachFileType } from '@/models/common'
import WelfareLoading from '@/components/widgets/common/WelfareLoading.vue'
import WelfareSeparateStraightStripeItems from '@/components/widgets/common/WelfareSeparateStraightStripeItems.vue'

type ProductDetailViewPhotoVideoProductModalEmits = (e: 'close') => void
defineEmits<ProductDetailViewPhotoVideoProductModalEmits>()
const activeSortReview = ref(SORT_REVIEWS[0])
const router = useRoute()

const fetchData = (pageToken: number = 0, pageSize: number = PAGE_SIZE_12) => {
  return productDetailReviewsApi.getListFileByProductKey({
    pageNum: pageToken + 1,
    rowSize: pageSize,
    productKey: router.query.productKey as string,
    reviewSearchSortType: activeSortReview.value
  })
}

const { refresh, handleLoadMore, data, hasMore, isLoading } = useHandleResponsePagination<ProductDetailReviewPhotoVideoResponse>(
  fetchData,
  PAGE_SIZE_12
)

const handleChangeSort = (sort: ProductDetailReviewSearchSortType) => {
  activeSortReview.value = sort
  refresh()
}

onMounted(() => {
  setTimeout(() => {
    refresh()
  }, DEFAULT_DEBOUNCE_TIME)
})

const { showModal, closeModalByPop } = useModal()

const handleShowModalViewDetailReview = (orderProductReviewKey: number, reviewFileKey: number) => {
  showModal?.({
    component: ProductDetailViewDetailProductReviewModal,
    props: {
      orderProductReviewKey: orderProductReviewKey,
      reviewFileKey: reviewFileKey
    },
    events: {
      close: closeModalByPop
    }
  })
}
</script>

<template>
  <WelfareTitleModal class="wf_width-full wf-py-20 wf-px-16 wf-br--g-e-7" :title="$t('productDetailListMedia.title')" @close="() => $emit('close')" />
  <WelfareBox class="wf_width-full wf_overflow-y-auto wf-sticky-top">
    <div class="wf_flex wf_justify-end wf-mb-20">
      <WelfareSeparateStraightStripeItems
        isI18nText
        class="wf-ml-auto"
        :items="SORT_REVIEWS"
        :active-item="activeSortReview"
        :formatItem="(item: ProductDetailReviewSearchSortType) => ProductDetailListReviewSearchSortType[item]"
        @update="(value) => handleChangeSort(value)"
      />
    </div>

    <WelfareLoading v-if="isLoading" class-image="wf_width-50 wf_height-50" />
    <div class="wf_screen_grid wf-space-y-8" :class="$props.class" v-else>
      <div
        class="wf_relative"
        v-for="(media, index) in data"
        v-bind:key="index"
        @click="handleShowModalViewDetailReview(media.orderProductReviewKey, media.reviewFileKey)"
      >
        <div class="wf-img-wrapper wf_flex wf_justify-center" v-if="media.attachFileType == AttachFileType.IMAGE">
          <div class="wf-image-item wf_width-105 wf_height-105">
            <img class="wf_width-105 wf_height-105" :src="getImageOrderFullPath(media.reviewFullPath)" alt="media product" />
          </div>
        </div>
        <div class="wf-img-wrapper wf_flex wf_justify-center" v-else>
          <div class="wf-image-item wf_width-105 wf_height-105">
            <video class="wf_width-105 wf_height-105" :src="getVideoOrderFullPathWithPoster(media.reviewFullPath)" alt="media product"></video>
          </div>
          <div
            class="wf_absolute wf-top-0 wf-bottom-0 wf-left-0 wf-right-0 wf_flex wf_items-center wf_justify-center wf-bg-black-03 wf-pointer wf_width-105 wf_height-105"
          >
            <IconPlayVideoCircle :width="45" :height="45" />
          </div>
        </div>
      </div>
    </div>
    <WelfareButtonFull
      v-if="hasMore && !isLoading"
      @click="handleLoadMore"
      class="wf_flex-1 wf-mt-35 wf_width-full wf-br--g-111"
      :text="$t('myPage.inquiryList.buttonLoadMore')"
      type="lg"
      lg-state="black-line"
    />
  </WelfareBox>
</template>
<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-view-photo-video-product-modal.scss');
</style>