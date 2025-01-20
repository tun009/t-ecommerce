<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 17,
  height: 19,
  color: defaultColor.gray_bb
})
</script>
<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.4043 16.5C9.73418 17.6111 7.54326 17.6111 5.87311 16.5M2.80549 7.33333C2.80549 4.11167 5.41716 1.5 8.63882 1.5C11.8605 1.5 14.4722 4.11167 14.4722 7.33333V9.4815C14.4722 10.7977 14.8617 12.0844 15.5918 13.1795L15.707 13.3522C15.8916 13.6291 15.6931 14 15.3603 14H1.91737C1.58458 14 1.38608 13.6291 1.57068 13.3522L1.68582 13.1795C2.4159 12.0844 2.80549 10.7977 2.80549 9.4815V7.33333Z"
      :stroke="props.color"
      stroke-width="1.5"
      stroke-linecap="square"
    />
  </svg>
</template>
