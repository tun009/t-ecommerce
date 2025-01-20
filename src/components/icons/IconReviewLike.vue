<script setup lang="ts">
import { defaultColor } from '@/commons'

interface IconReviewLikeProps {
  color?: string
}

withDefaults(defineProps<IconReviewLikeProps>(), {
  color: defaultColor.gray4
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M4.86253 12.1976H4.25V6.47618H4.86253L7.29496 2.25554C7.5198 1.86541 7.93583 1.625 8.38612 1.625C9.15105 1.625 9.73934 2.30131 9.63338 3.05886L9.39883 4.73571H11.3893C12.2595 4.73571 14 5.60594 14 7.34641C14 9.08688 12.25 13.0678 10.3988 13.0678C7.96217 13.0678 5.87781 12.4877 4.86253 12.1976Z"
      :stroke="$props.color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1.5 6.25C1.5 5.49061 2.11561 4.875 2.875 4.875V4.875C3.63439 4.875 4.25 5.49061 4.25 6.25V12C4.25 12.7594 3.63439 13.375 2.875 13.375V13.375C2.11561 13.375 1.5 12.7594 1.5 12V6.25Z"
      :stroke="$props.color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
</template>
