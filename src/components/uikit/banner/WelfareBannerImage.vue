<script setup lang="ts">
import { useSwiper } from '@/composables/common/useSwiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import WelfareMediaControlGallery from '../mediaControl/WelfareMediaControlGallery.vue'
import WelfareMediaNumber from '../mediaControl/WelfareMediaNumber.vue'
import { bannerAutoTime } from '@/commons'

interface WelfareBannerImageProps {
  images: any[]
  hideAmount?: boolean
  hideControlMedia?: boolean
  classMediaControl?: string
  spaceBetWeen?: number
  allowSlideNext?: boolean
  allowSlidePrev?: boolean
  autoPlay?: boolean
  loop?: boolean
}

type WelfareBannerImageEmits = (e: 'click-image', index: number) => void

const props = withDefaults(defineProps<WelfareBannerImageProps>(), {
  hideAmount: true,
  hideControlMedia: true,
  spaceBetWeen: 0,
  classMediaControl: ''
})
defineEmits<WelfareBannerImageEmits>()

const { currentIndexActive, onActiveIndexChange, onSwiper, handleAutoPlay, onNext, onPre, autoPlay } = useSwiper(!props.hideControlMedia)
</script>
<template>
  <div class="wf_relative">
    <div class="wf_height-full wf_width-full wf-relative wf_overflow-hidden">
      <Swiper
        :allow-slide-next="allowSlideNext"
        :allow-slide-prev="allowSlidePrev"
        :space-between="spaceBetWeen"
        slides-per-view="auto"
        @swiper="onSwiper"
        :loop="loop"
        :pagination="{
          clickable: true
        }"
        @active-index-change="onActiveIndexChange"
        :autoplay="
          !props.hideControlMedia
            ? {
                delay: bannerAutoTime,
                disableOnInteraction: false
              }
            : props.autoPlay
        "
        :modules="[Autoplay]"
        class="wf_img_banner wf_overflow-visible-important"
      >
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <div class="wf_img_group">
            <img alt="banner" class="wf_height-full" :src="image" @click="$emit('click-image', index)" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <WelfareMediaControlGallery
      v-if="!$props.hideControlMedia"
      :auto-play="autoPlay"
      @on-click-pause="handleAutoPlay"
      @next-slide="onNext"
      @pre-slide="onPre"
      class="wf_absolute wf_bottom-0 wf_right-0 wf_index-1000 wf_width-fit wf_height-27"
      :class-total="'wf-color--g-bbb'"
      :total="images?.length ?? 0"
      :activeItem="currentIndexActive + 1"
    />
    <WelfareMediaNumber
      v-if="!$props.hideAmount"
      :class="`wf_absolute wf_bottom-0 wf_right-0 wf_index-1000 wf_width-fit ${$props.classMediaControl}`"
      :active="currentIndexActive + 1"
      :total="images?.length ?? 0"
    />
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/home/_welfare-home-banner-img.scss');
</style>
