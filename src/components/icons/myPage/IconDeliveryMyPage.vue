<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 16,
  height: 11,
  color: defaultColor.gray_bb
})
</script>
<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.63504 2.55688H12.578C13.0984 2.55688 13.5974 2.76359 13.9654 3.13154C14.3333 3.49949 14.54 3.99853 14.54 4.51889V8.44289H13.0685"
      :stroke="props.color"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.48164 8.76997L1.45977 8.76997L1.45977 1.61685C1.45977 1.34583 1.56743 1.08591 1.75907 0.894271C1.9507 0.702632 2.21062 0.594971 2.48164 0.594971L8.61289 0.594971C8.88391 0.594971 9.14383 0.702632 9.33547 0.894271C9.5271 1.08591 9.63477 1.34583 9.63477 1.61685V7.4211"
      :stroke="props.color"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M9.30859 8.44312H6.69259" :stroke="props.color" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M11.2694 10.405C10.1859 10.405 9.30745 9.52654 9.30745 8.44296C9.30745 7.35937 10.1859 6.48096 11.2694 6.48096C12.353 6.48096 13.2314 7.35937 13.2314 8.44296C13.2314 9.52654 12.353 10.405 11.2694 10.405Z"
      fill="#F5F6FA"
      :stroke="props.color"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.72941 10.405C3.64582 10.405 2.76741 9.52654 2.76741 8.44296C2.76741 7.35937 3.64582 6.48096 4.72941 6.48096C5.81299 6.48096 6.69141 7.35937 6.69141 8.44296C6.69141 9.52654 5.81299 10.405 4.72941 10.405Z"
      fill="#F5F6FA"
      :stroke="props.color"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
