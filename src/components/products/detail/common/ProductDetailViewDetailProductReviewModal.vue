<script setup lang="ts">
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareScore from '@/components/uikit/score/WelfareScore.vue'
import { DEFAULT_DEBOUNCE_TIME, formatTimeWithDot, getImageOrderFullPath, getVideoOrderFullPathWithPoster } from '@/commons'
import IconSplit from '@/components/icons/IconSplit.vue'
import ProductDetailReviewLike from './ProductDetailReviewLike.vue'
import { ref } from 'vue'
import ProductDetailEnlargeVideo from './ProductDetailEnlargeVideo.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import ProductDetailReportModal from './ProductDetailReportModal.vue'
import { useModal } from '@/composables/common/useModal'
import { onMounted } from 'vue'
import { productDetailReviewsApi } from '@/services/api/products/detail/ProductDetailReviewsApi'
import { MyPageReview, MyProductReviewResponse } from '@/models/views/myPage/MyPageProductReview'
import { AttachFileType } from '@/models/common'
import WelfareLoading from '@/components/widgets/common/WelfareLoading.vue'
import { useLoading } from '@/composables/common/useLoading'

interface ProductDetailViewDetailProductReviewModalProps {
  orderProductReviewKey?: number
  reviewFileKey?: number
}
type ProductDetailViewDetailProductReviewModalEmits = (e: 'close') => void
const props = defineProps<ProductDetailViewDetailProductReviewModalProps>()
defineEmits<ProductDetailViewDetailProductReviewModalEmits>()
const { showModal, closeModalByPop } = useModal()
const { loading, setLoading } = useLoading()

const handleShowModalFormReport = () => {
  showModal?.({
    component: ProductDetailReportModal,
    props: {
      reportKey: props.orderProductReviewKey ?? ''
    },
    events: {
      close: closeModalByPop
    }
  })
}

const reviewObject = ref<MyPageReview>()

const fetchDataReview = async () => {
  setLoading?.(true)
  try {
    if (props.orderProductReviewKey) {
      // fetch data with props key
      const review = await productDetailReviewsApi.getDetailReviewByOrderProductReviewKey(props.orderProductReviewKey.toString())
      reviewObject.value = review.data
    }
  } catch (error) {
    setLoading?.(false)
  } finally {
    setLoading?.(false)
  }
}

onMounted(() => {
  setTimeout(() => {
    fetchDataReview()
  }, DEFAULT_DEBOUNCE_TIME)
})

const findIndexSlide = (arr: MyProductReviewResponse, key: number) => {
  return arr.productReviewFileResponses.findIndex((item) => item.reviewFileKey === key) ?? 0
}

const handleLike = async (orderProductReviewKey: number, like: boolean) => {
  if (like) {
    await productDetailReviewsApi.like(orderProductReviewKey)
  } else {
    await productDetailReviewsApi.disLike(orderProductReviewKey)
  }
  await fetchDataReview()
}
</script>
<template>
  <div class="wf_width-screen wf_height-screen wf-bg--white wf-sticky-bottom">
    <WelfareTitleModal
      class="wf_width-auto wf-py-20 wf-px-16 wf-br--g-e-7 wf-sticky-top wf-bg--white wf_zIndex-1001"
      :title="$t('productDetailViewDetailReview.title')"
      @close="() => $emit('close')"
    />
    <WelfareLoading v-if="loading" class-image="wf_width-50 wf_height-50 wf-mt-30" />
    <div v-if="reviewObject && !loading" class="wf_overflow-y-auto wf-sticky-bottom ">
      <div class="wf-item-product">
        <Swiper
          v-if="reviewObject.productReviewResponse.productReviewFileResponses.length > 0"
          :loop="reviewObject.productReviewResponse.productReviewFileResponses.length > 1"
          :pagination="{ clickable: true }"
          :modules="[Pagination]"
          :initialSlide="findIndexSlide(reviewObject.productReviewResponse, props.reviewFileKey ?? 0)"
        >
          <SwiperSlide v-for="(item, index) in reviewObject!.productReviewResponse.productReviewFileResponses" :key="index">
            <img
              class="wf-item-product-image wf_image--cover wf-item-product"
              :src="getImageOrderFullPath(item.reviewFullPath)"
              alt="media product"
              v-if="item.attachFileType == AttachFileType.IMAGE"
            />
            <div class="wf-relative wf-item-product-image wf-item-product" v-else>
              <ProductDetailEnlargeVideo :video="getVideoOrderFullPathWithPoster(item.reviewFullPath)" :showTimeline="true" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <WelfareBox class="wf-mt-32">
        <div class="wf_flex wf_flex-col wf-space-y-20 wf-pb-18" :class="$props.class">
          <div class="wf_flex wf_items-center wf_justify-between wf-pr-1">
            <WelfareScore small boldText :value="reviewObject.productReviewResponse.reviewStarPoint" :centerText="true" />
            <span class="wf-color--g-999 wf-font_15--reg">{{ reviewObject.productReviewResponse.memberId }}</span>
          </div>
          <div class="wf_flex wf_flex-col wf-space-y-15 wf-color--g-555 wf-font_15--reg wf-mt--3">
            <div class="wf_flex wf_items-center wf-space-x-10">
              <span class="wf-color--g-333 wf-font_15--bold wf_letter-spacing--1">{{ $t('productDetailViewDetailReview.labelProductName') }}</span>
              <span>{{ reviewObject.productResponse.productName }}</span>
            </div>
            <span class="wf-product-detail-review-des"> {{ reviewObject.productReviewResponse.review }} </span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-between">
            <div class="wf_flex wf-space-x-5 wf_items-center wf-font_15--reg wf-color--g-999">
              <span>{{ formatTimeWithDot(reviewObject.productReviewResponse.reviewCreationDate) }}</span>
              <IconSplit />
              <span @click="handleShowModalFormReport">{{ $t('productDetail.productReview.declaration') }}</span>
            </div>
            <ProductDetailReviewLike
              :value="reviewObject.productReviewResponse.totalLikes ?? 0"
              :like="reviewObject.productReviewResponse.canModifyLikes"
              @click="handleLike(props.orderProductReviewKey ?? 0, !reviewObject.productReviewResponse.canModifyLikes)"
            />
          </div>
        </div>
      </WelfareBox>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-view-detail-review-modal.scss');
</style>