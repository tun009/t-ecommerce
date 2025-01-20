<script setup lang="ts">
import { getImageOrderFullPath, getVideoOrderFullPathWithPoster } from '@/commons'
import IconPlayVideoCircle from '@/components/icons/IconPlayVideoCircle.vue'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import ProductDetailViewPhotoVideoProductModal from './ProductDetailViewPhotoVideoProductModal.vue'
import { ProductDetailReviewPhotoVideoResponse } from '@/models/views/products/detail/ProductDetailViewPhotoVideoProductModel'
import { AttachFileType } from '@/models/common'
import ProductDetailViewDetailProductReviewModal from './ProductDetailViewDetailProductReviewModal.vue'
interface ProductDetailListImageVideoProps {
  medias: ProductDetailReviewPhotoVideoResponse[]
  hideViewMore?: boolean
  class?: string
  refresh?: () => void
}
const { showModal, closeModal } = useModalBottomSheet()
const onClose = () => {
  closeModal?.()
  props.refresh?.()
}
const handleShowModalViewMoreImage = () => {
  showModal?.({
    type: ModalBottomSheetType.click,
    component: ProductDetailViewPhotoVideoProductModal,
    events: {
      close: onClose
    }
  })
}
const handleShowModalViewDetailReview = (orderProductReviewKey: number, reviewFileKey?: number) => {
  showModal?.({
    type: ModalBottomSheetType.click,
    component: ProductDetailViewDetailProductReviewModal,
    props: {
      orderProductReviewKey: orderProductReviewKey,
      reviewFileKey: reviewFileKey
    },
    events: {
      close: onClose
    }
  })
}
const props = defineProps<ProductDetailListImageVideoProps>()
</script>
<template>
  <div class="wf_flex wf_items-center wf-space-x-13" :class="$props.class">
    <div class="wf_relative" v-for="(media, index) in medias" v-bind:key="index" >
      <div class=" wf_width-76 wf_height-76"  @click="handleShowModalViewDetailReview(media.orderProductReviewKey, media.reviewFileKey)">
        <img
          class="wf_width-full wf_height-full wf_image--cover"
          :src="getImageOrderFullPath(media.reviewFullPath)"
          alt="media product"
          v-if="media.attachFileType == AttachFileType.IMAGE"
        />
        <div class="wf_width-full wf_height-full" v-else>
          <video class="wf_width-full wf_height-full" alt="media product" :src="getVideoOrderFullPathWithPoster(media.reviewFullPath)"></video>
          <div
            v-if="$props.hideViewMore || index < medias.length - 1"
            class="wf_absolute wf-top-0 wf-bottom-0 wf-left-0 wf-right-0 wf_flex wf_items-center wf_justify-center wf-bg-black-03 wf-pointer"
          >
            <IconPlayVideoCircle />
          </div>
        </div>
      </div>
      <div
        class="wf_absolute wf-top-0 wf-bottom-0 wf-left-0 wf-right-0 wf_flex wf_items-center wf_justify-center wf-bg-black-06 wf-pointer"
        v-if="index === medias.length - 1 && !$props.hideViewMore"
        @click="handleShowModalViewMoreImage"
      >
        <span class="wf-color--g-fff wf-font_15--bold">{{ $t('productDetail.productReview.moreFiles') }}</span>
      </div>
    </div>
  </div>
</template>