<script setup lang="ts">
import { bannerAutoTime } from '@/commons'
import IconArrowGallery from '@/components/icons/IconArrowGallery.vue'
import IconPause from '@/components/icons/IconPause.vue'
import IconPlayVideo from '@/components/icons/IconPlayVideo.vue'
import { useMediaControlGallery } from '@/composables/uikits/useMediaControlGallery'
import { MediaControlGalleryEmits, MediaControlGalleryProps } from '@/models/uikits/WelfareMediaControl'

const props = withDefaults(defineProps<MediaControlGalleryProps>(), {
  activeItem: 1,
  changeDuration: bannerAutoTime
})
const emit = defineEmits<MediaControlGalleryEmits>()

const { handleClickLeft, handleClickRight, handleClickPause } = useMediaControlGallery(props, emit)
</script>

<template>
  <div class="wf_flex wf_items-center wf_justify-between wf-space-x-18 wf-bg-black-05 wf_height-30 wf_width-110 wf-pl-14 wf-pr-10">
    <div class="wf_flex wf_items-center wf_justify-between wf-space-x-7 wf_width-full">
      <button class="wf_flex" @click="handleClickLeft">
        <IconArrowGallery />
      </button>
      <div class="wf-font_11--reg wf_letter-spacing--0705 wf-color--g-fff wf-space-x-2 wf_min-width-30 wf_flex wf_items-center wf_justify-center">
        <span> {{ props.activeItem }}</span> <span :class="props.classTotal ?? 'wf-color--g-8e'">/</span>
        <span :class="props.classTotal ?? 'wf-color--g-8e'">{{ props.total }}</span>
      </div>
      <button class="wf_rotate-180 wf-mr-1 wf_flex" @click="handleClickRight">
        <IconArrowGallery />
      </button>
    </div>
    <button class="wf_flex" @click="handleClickPause">
      <IconPlayVideo :width="10" :height="16" v-if="!$props.autoPlay" />
      <IconPause :width="10" :height="12" v-else />
    </button>
  </div>
</template>
