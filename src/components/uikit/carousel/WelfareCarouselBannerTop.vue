<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import { bannerCarouselAutoTime } from '@/commons'
import { HomeBannerTop } from '@/models/views/home/HomeGnbProductModel'

interface Props {
  data: HomeBannerTop[]
}

const props = defineProps<Props>()

const indexActive = ref(0)
const onSlideChange = (event: any) => {
  const realIndex = event.realIndex
  indexActive.value = realIndex
}
</script>
<template>
  <div class="wf-banner-top">
    <Swiper
      :loop="true"
      :autoplay="{
        delay: bannerCarouselAutoTime
      }"
      :slides-per-view="1.2"
      :centered-slides="true"
      :space-between="10"
      effect="coverflow"
      :coverflow-effect="{
        depth: 0,
        modifier: 1.4,

        rotate: 0,
        scale: 1,
        slideShadows: false,
        stretch: 0
      }"
      :modules="[Navigation, EffectCoverflow, Autoplay]"
      slide-next-class=".swiper-button-next"
      slide-prev-class=".swiper-button-prev"
      id="wf-banner-carousel"
      ref="bannerRef"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="(_item, index) in props?.data" :key="index" class="wf-image-carousel">
        <img :src="_item.image" class="wf_w-full wf-img-banner-carousel" alt="banner" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-banner-top.scss');
</style>
