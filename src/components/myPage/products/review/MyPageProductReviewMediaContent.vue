<script setup lang="ts">
import IconPlayVideoCircle from '@/components/icons/IconPlayVideoCircle.vue'
import ProductDetailGroupEnlargeImage from '@/components/products/detail/common/ProductDetailGroupEnlargeImage.vue'
import { useModal } from '@/composables/common/useModal'
import { MyProductReviewFileResponses } from '@/models/views/myPage/MyPageProductReview'
import { getImageOrderFullPath } from '@/commons'
interface MyPageProductReviewMediaContent {
  productReviewFileResponses: MyProductReviewFileResponses[]
}
const { productReviewFileResponses } = withDefaults(defineProps<MyPageProductReviewMediaContent>(), {})

const { showModal, closeModalByPop } = useModal()

const showLargeImage = (index: number) => {
  showModal?.({
    component: ProductDetailGroupEnlargeImage,
    props: {
      activeItem: index,
      medias: productReviewFileResponses.map((media) => getImageOrderFullPath(media.reviewFullPath))
    },
    events: {
      onClose: () => closeModalByPop?.()
    }
  })
}
</script>
<template>
  <div class="prd-media-box wf_flex wf-space-x-5">
    <div v-for="(media, index) in productReviewFileResponses" :key="index" @click="() => showLargeImage(index)">
      <div class="wf_relative wf_width-63 wf_height-63">
        <img
          v-if="media.attachFileType === '01'"
          class="wf_width-63 wf_height-63 wf_image--cover"
          :src="getImageOrderFullPath(media.reviewFullPath)"
          :alt="media.reviewFileName"
        />
        <template v-else-if="media.attachFileType === '02'">
          <video class="wf_width-63 wf_height-63 wf_image--cover" :src="getImageOrderFullPath(media.reviewFullPath)" :alt="media.reviewFileName" />
          <div class="wf_absolute wf-top-0 wf-bottom-0 wf-left-0 wf-right-0 wf_flex wf_items-center wf_justify-center wf-bg-black-03 wf-pointer">
            <IconPlayVideoCircle />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.prd-media {
  &-box {
    overflow-x: auto;
  }
}
</style>
