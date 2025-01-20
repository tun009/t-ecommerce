<script setup lang="ts">
import { ImgLoader } from '@/assets/images'
interface WelfareLoadingProps {
  classImage: string
}

const props = defineProps<WelfareLoadingProps>()
</script>
<template>
  <div class="wf_flex wf_justify-center">
    <img :src="ImgLoader" alt="" class="wf-loading-rotate" :class="props.classImage" />
  </div>
</template>

<style scoped>
@import url('@/assets/styles/commons/_welfare-loading.scss');
</style>
