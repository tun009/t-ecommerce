<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 14,
  height: 14,
  color: defaultColor.gray1
})
</script>
<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="6.5" fill="white" :stroke="props.color" />
    <path d="M10 6L7 9L4 6" :stroke="props.color" stroke-linecap="square" />
  </svg>
</template>
