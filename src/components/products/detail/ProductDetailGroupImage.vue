<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import IconPlayVideo from '@/components/icons/IconPlayVideo.vue'
import { useModal } from '@/composables/common/useModal'
import ProductDetailGroupEnlargeImage from './common/ProductDetailGroupEnlargeImage.vue'
import { computed } from 'vue'
import { ProductDetailAttachFileModel } from '@/models/views/products/ProductDetailReviewModel'
import { AttachFileType } from '@/models/common'
import { YesNoEnum } from '@/models/common'

interface ProductDetailGroupImageProps {
  listBanner: ProductDetailAttachFileModel[]
}

const props = withDefaults(defineProps<ProductDetailGroupImageProps>(), {
  listBanner: () => [] as ProductDetailAttachFileModel[]
})
const { showModal, closeModalByPop } = useModal()
const hasVideo = computed(() => props.listBanner.find((item) => item.attachfileType === AttachFileType.MOV))
const medias = computed(() => {
  const video = props.listBanner.find((item) => item.attachfileType === AttachFileType.MOV)?.attachfileUrl

  const imgList = props.listBanner
    .filter((item) => item.attachfileType === AttachFileType.IMAGE)
    ?.filter((item) => item.imageRepresentativeYn === YesNoEnum.N)
    ?.map((item) => item.attachfileUrl)
  return [video, ...imgList]
})

const imageRepresentativeUrl = computed(() => {
  return props.listBanner.find((item) => item.imageRepresentativeYn === YesNoEnum.Y && item.attachfileType === AttachFileType.IMAGE)
})

const showLargeImage = (index: number) => {
  showModal?.({
    component: ProductDetailGroupEnlargeImage,
    props: {
      activeItem: index,
      medias: [
        props.listBanner.find((item) => item.attachfileType === AttachFileType.MOV)?.attachfileUrl,
        ...props.listBanner.map((it) => it.attachfileUrl)
      ]
    },
    events: {
      onClose: () => closeModalByPop?.()
    }
  })
}
</script>
<template>
  <div class="wf-relative">
    <div class="wf_width-full wf-relative">
      <Swiper
        :loop="true"
        :pagination="{
          clickable: true
        }"
        :modules="[Pagination]"
      >
        <SwiperSlide v-for="(item, index) in medias" :key="index">
          <div class="wf-item-product-parent" @click="() => showLargeImage(index)">
            <img class="wf-item-product-image" alt="" :src="index === 0 ? imageRepresentativeUrl?.attachfileUrl : item" />
            <div v-if="hasVideo" class="wf-item-product-backdrop wf_flex wf_justify-center wf_items-center">
              <button>
                <IconPlayVideo />
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/commons/_welfare-swiper.scss');
@import url('@/assets/styles/views/products/detail/_welfare-product-image.scss');
</style>
