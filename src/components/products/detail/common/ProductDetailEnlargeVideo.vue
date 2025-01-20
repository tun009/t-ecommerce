<script setup lang="ts">
import IconPlayVideo from '@/components/icons/IconPlayVideo.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { DEFAULT_VIDEO, defaultColor, formatTimeOfVideo, isAppleDevice } from '@/commons'
import IconPause from '@/components/icons/IconPause.vue'
import { useVideo } from '@/composables/common/useVideo'
import WelfareMediaControlVideo from '@/components/uikit/mediaControl/WelfareMediaControlVideo.vue'
import ProductDetailVideoMedia from './ProductDetailVideoMedia.vue'

interface ProductDetailEnlargeVideoProps {
  video?: string
  showTimeline?: boolean
}

type ProductDetailEnlargeVideoEmits = (e: 'onFullscreenChange', fullscreen: boolean) => void

withDefaults(defineProps<ProductDetailEnlargeVideoProps>(), {
  video: DEFAULT_VIDEO
})
const emit = defineEmits<ProductDetailEnlargeVideoEmits>()

const {
  isRotate,
  elementWrapVideo,
  isFullPage,
  videoRef,
  videoProgressRef,
  isPlay,
  isMute,
  percentVideo,
  durationVideo,
  onLoadedMetaData,
  onPlaying,
  onPause,
  onPlay,
  onProgressChange,
  onVolumeChange,
  handleChangePlay,
  handleChangeMute,
  handleOpenFullPage,
  handleFullscreenClose
} = useVideo((fullscreen: boolean) => emit('onFullscreenChange', fullscreen))
</script>
<template>
  <div
    ref="elementWrapVideo"
    :class="
      !isFullPage || isAppleDevice
        ? 'wf_width-full wf_height-full wf_flex wf_justify-center wf_items-center'
        : 'wf-relative wf_height-screen wf_width-screen wf-bg--g-111 '
    "
  >
    <div
      v-if="isFullPage && !isAppleDevice"
      class="wf-absolute wf-top-0 wf-right-0 wf-pt-15 wf-pr-24 wf_index-1000 wf-pointer"
      @click="handleFullscreenClose"
    >
      <IconClose :width="16" :height="16" :color="defaultColor.white" />
    </div>
    <div class="wf-product-enlarge-video-wrap wf_height-full wf_flex wf_justify-center wf_items-center">
      <video
        ref="videoRef"
        class="wf_width-full wf_height-full"
        alt="media product"
        :src="$props.video"
        @timeupdate="onPlaying"
        @loadedmetadata="onLoadedMetaData"
        @pause="onPause"
        @play="onPlay"
        @volumechange="onVolumeChange"
        playsinline
        webkit-playsinline
      ></video>
      <div
        class="wf-product-enlarge-video--play-pause wf_absolute wf-top-0 wf-bottom-0 wf-left-0 wf-right-0 wf_flex wf_items-center wf_justify-center wf-pointer"
        v-show="(!isFullPage || isAppleDevice) && !$props.showTimeline"
        :class="!isPlay && 'wf-show'"
      >
        <WelfareMediaControlVideo
          :play="isPlay"
          :muted="isMute"
          @on-click-play="handleChangePlay"
          @on-volume-change="handleChangeMute"
          @on-click-full-page="handleOpenFullPage"
        />
      </div>
      <div v-show="(isFullPage && !isAppleDevice) || $props.showTimeline">
        <div
          class="wf-product-enlarge-video--play-pause wf-bg-black-05 wf-pointer wf_absolute wf-top-0 wf-bottom-0 wf-left-0 wf-right-0 wf_flex wf_justify-center wf_items-center"
          @click="handleChangePlay(!isPlay)"
          :class="!isPlay && 'wf-show'"
        >
          <IconPlayVideo v-if="!isPlay" />
          <IconPause v-else />
        </div>
        <div class="wf_absolute wf-bottom-0 wf-left-0 wf-right-0 wf-px-20 wf-pb-10" v-show="isFullPage || isPlay">
          <div class="wf-mb-10 wf-ml-auto wf_width-fit" v-show="isRotate">
            <ProductDetailVideoMedia
              :is-mute="isMute"
              :fullPage="isFullPage"
              @on-change-mute="handleChangeMute"
              @onClickFullPage="handleOpenFullPage"
              @on-close-fullscreen="handleFullscreenClose"
            />
          </div>
          <div class="wf-product-video-control wf_flex wf_items-center wf-space-x-15">
            <div class="wf_flex-1 wf-product-video-line">
              <div class="wf-progress-bar">
                <input
                  type="range"
                  class="wf-progress-bar--input"
                  ref="videoProgressRef"
                  @input="onProgressChange"
                  :value="percentVideo"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
            <ProductDetailVideoMedia
              :is-mute="isMute"
              :fullPage="isFullPage"
              @on-change-mute="handleChangeMute"
              @onClickFullPage="handleOpenFullPage"
              @on-close-fullscreen="handleFullscreenClose"
              v-show="!isRotate"
            />
          </div>
          <div class="wf_flex wf_items-center wf_justify-between wf-color--g-fff wf-font_13--reg wf-mb-20 wf-mt-5" v-show="isRotate">
            <span>{{ formatTimeOfVideo(videoRef?.currentTime ?? 0) }}</span>
            <span>{{ formatTimeOfVideo(durationVideo ?? 0) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-enlarge-video.scss');
</style>
