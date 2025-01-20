<script setup lang="ts">
import { defineProps } from 'vue'
import { ImagePlus } from '@/assets/images'
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'
import IconPlayVideoCircle from '@/components/icons/IconPlayVideoCircle.vue'
import { isAndroid, isIos } from '@/commons'

interface fileType {
  src: string
  name: string
  type: string
}

interface MyPageFileInputProps {
  data?: fileType
  target?: string | undefined
}

const props = withDefaults(defineProps<MyPageFileInputProps>(), {})

const emits = defineEmits<(e: 'handleImgUpload') => void>()

const isMobile = isAndroid || isIos
</script>
<template>
  <div class="wf_img wf-unit-image" @click="emits('handleImgUpload')">
    <img v-if="props.data?.type.includes('image')" ref="refImage" fetchpriority="high" class="thumbnail" loading="lazy" :src="props.data?.src" />
    <div v-else-if="props.data?.type.includes('video')" class="wf_relative wf_w-full wf_height-full">
      <video
        alt="media product"
        :src="props.data?.src"
        preload="none"
        playsinline="false"
        :autoplay="false"
        :poster="isMobile ? props.data?.src : ''"
        class="thumbnail"
      ></video>
      <div class="wf_absolute wf-top-0 wf-bottom-0 wf-left-0 wf-right-0 wf_flex wf_items-center wf_justify-center wf-pointer">
        <IconPlayVideoCircle />
      </div>
    </div>

    <div class="wf_img_pd" v-else>
      <WelfareImage class-group="wf-image-link-banner wf_img_plus" class="wf-unit-image" :data-src="ImagePlus" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');

.wf-unit-image {
  input {
    position: absolute;
    left: -9999em;
  }
}
.thumbnail {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
