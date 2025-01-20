<script setup lang="ts">
import { ImgLoader } from '@/assets/images'

interface WelfareLoaderProps {
  small?: boolean
}

const props = withDefaults(defineProps<WelfareLoaderProps>(), {
  small: false
})
</script>

<template>
  <div :class="`wf-loader ${props.small ? 'wf-loader-sm' : ''}`">
    <img class="wf-loader-icon" :src="ImgLoader" alt="loader" />
  </div>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-loader.scss');
</style>
