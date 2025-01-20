<script setup lang="ts">
import { ref } from 'vue'
import { exitFullscreen, openFullscreen } from '@/commons'
import WelfareMediaControlVideo from '@/components/uikit/mediaControl/WelfareMediaControlVideo.vue'
import WelfareMediaControlGallery from '@/components/uikit/mediaControl/WelfareMediaControlGallery.vue'

const element = ref()

const handleClickFullPage = (fullPage: boolean) => {
  if (fullPage) {
    openFullscreen(element.value)
  } else {
    exitFullscreen()
  }
}
</script>

<template>
  <div ref="element" class="wf_flex wf_flex-col wf_justify-center wf_items-center wf-space-y-20 wf_height-screen wf-bg--g-f-3-f-3">
    <WelfareMediaControlVideo @onClickFullPage="handleClickFullPage" />
    <WelfareMediaControlGallery :total="15" :activeItem="8" />
  </div>
</template>
