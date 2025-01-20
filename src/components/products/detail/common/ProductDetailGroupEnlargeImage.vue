<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import { BaseModalEmits } from '@/models/widgets/modal'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Zoom } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, onMounted, ref } from 'vue'
import ProductDetailEnlargeVideo from './ProductDetailEnlargeVideo.vue'

interface ProductDetailGroupEnlargeImageProps {
  activeItem?: number
  medias?: string[]
}

const props = withDefaults(defineProps<ProductDetailGroupEnlargeImageProps>(), {
  activeItem: 1,
  medias: () => []
})
defineEmits<BaseModalEmits>()

const refSwipe = ref<SwiperType>()

onMounted(() => {
  refSwipe?.value?.slideTo?.(props.activeItem)
})

const mediaList = computed(() => {
  return {
    assets: props.medias.filter((item) => item),
    hasVideo: props.medias?.[0]
  }
})
</script>
<template>
  <div class="wf-relative wf_height-screen wf_width-screen wf-bg--g-111">
    <div class="wf-absolute wf-top-0 wf-right-0 wf-pt-15 wf-pr-24 wf_index-1000 wf-pointer" @click="$emit('onClose')">
      <IconClose :width="16" :height="16" :color="defaultColor.white" />
    </div>
    <Swiper
      :zoom="true"
      :loop="true"
      :pagination="{
        clickable: true
      }"
      :activeIndex="$props.activeItem"
      :modules="[Pagination, Zoom]"
      class="wf_height-full wf-product-detail-enlarge-image"
      @swiper="(swiper) => (refSwipe = swiper)"
    >
      <SwiperSlide v-for="(media, index) in mediaList.assets" :key="index">
        <div :class="`${index !== 0 && 'swiper-zoom-container'} wf_height-full wf_flex wf_items-center`">
          <div class="wf-item-product-parent wf-mt-16">
            <img class="wf-item-product-image wf_image--cover" :src="media" alt="media product" v-if="index !== 0 || !mediaList.hasVideo" />
            <div class="wf-relative wf-item-product-image" v-else>
              <ProductDetailEnlargeVideo
                :video="media"
                @onFullscreenChange="
                  (fullscreen) => {
                    if (refSwipe) refSwipe.allowTouchMove = !fullscreen
                  }
                "
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/commons/_welfare-swiper.scss');
@import url('@/assets/styles/views//products/detail/_welfare-product-image.scss');
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-enlarge-image.scss');
</style>
