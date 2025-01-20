<script setup lang="ts">
import { ref } from 'vue'

interface WelfareImageProps {
  alt?: string
  src?: string
  class?: any
  classGroup?: any
  dataSrc?: any
}

interface WelfareImageEmits {
  (e: 'load', payload: Event): void
  (e: 'error', payload: Event): void
}

defineEmits<WelfareImageEmits>()

const props = defineProps<WelfareImageProps>()
const refImage = ref<HTMLImageElement>()

// const { isInView, refTag } = useInView<HTMLDivElement>()

// watch(isInView, (newInView) => {
//   if (newInView && refImage.value) {
//     refImage.value.src = refImage.value.dataset.src ?? ''
//   }
// })
</script>
<template>
  <div ref="refTag" class="wf-img-wrapper" :class="props.classGroup ?? ''">
    <div class="wf-image-item">
      <img
        ref="refImage"
        fetchpriority="high"
        loading="lazy"
        :src="props.dataSrc"
        :alt="$props?.alt ?? ''"
        @load="(payload) => $emit('load', payload)"
        @error="(payload) => $emit('error', payload)"
        :class="props.class ?? ''"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/commons/_welfare-image.scss');
</style>
