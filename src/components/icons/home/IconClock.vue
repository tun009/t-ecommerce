<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 10,
  height: 10,
  color: defaultColor.gray_bb
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.width" :height="props.height" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="6.75" stroke="#111111" stroke-width="1.5" />
    <path d="M7 5V8.5L9.5 10" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</template>
