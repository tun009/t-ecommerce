<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { IMSlider1, IMSlider2, IMSlider3 } from '@/assets/images'
import { ref } from 'vue'
import { bannerCarouselAutoTime } from '@/commons'

const IMAGES = [
  {
    image: IMSlider1,
    label: '블랙프라이데이 UP TP 76'
  },
  {
    image: IMSlider2,
    label: '블랙프라이데이 UP TP 76'
  },
  {
    image: IMSlider3,
    label: '블랙프라이데이 UP TP 76'
  },
  {
    image: IMSlider1,
    label: '블랙프라이데이 UP TP 76'
  },
  {
    image: IMSlider2,
    label: '블랙프라이데이 UP TP 76'
  },
  {
    image: IMSlider3,
    label: '블랙프라이데이 UP TP 76'
  }
]

const indexActive = ref(0)
const onSlideChange = (event: any) => {
  const realIndex = event.realIndex
  indexActive.value = realIndex
}
</script>
<template>
  <div class="wf-banner-carousel">
    <Swiper
      :loop="true"
      :autoplay="{
        delay: bannerCarouselAutoTime
      }"
      :coverflow-effect="{
        depth: 100,
        modifier: 2.5,

        rotate: 0,
        scale: 1,
        slideShadows: false,
        stretch: 0
      }"
      effect="coverflow"
      :slides-per-view="1.564"
      :centered-slides="true"
      :space-between="52"
      :grabCursor="true"
      :navigation="{
        enabled: true
      }"
      :modules="[Navigation, EffectCoverflow]"
      slide-next-class=".swiper-button-next"
      slide-prev-class=".swiper-button-prev"
      id="wf-banner-carousel"
      ref="bannerRef"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="(_item, index) in IMAGES" :key="index" class="wf-image-carousel">
        <img :src="_item.image" class="wf_w-full wf-img-banner-carousel" alt="banner" />
      </SwiperSlide>
    </Swiper>
    <span class="wf-font_17--bold wf-color--g-111 wf-ml--3 wf-mt--2"
      >{{ IMAGES[indexActive].label }}<span class="wf-font_15--bold wf-color--g-111">%</span></span
    >
  </div>
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-banner-carousel.scss');
</style>
