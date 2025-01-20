<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 20,
  height: 20,
  color: defaultColor.gray_bb
})
</script>
<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 18C16.5245 16.548 15.5903 15.2814 14.3323 14.3828C13.0742 13.4842 11.5572 13 10 13C8.44278 13 6.92578 13.4842 5.66772 14.3828C4.40966 15.2814 3.47553 16.548 3 18H17Z"
      :stroke="props.color"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <circle cx="10" cy="7" r="4" :stroke="props.color" stroke-width="1.5" />
  </svg>
</template>
