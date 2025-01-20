<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 15,
  height: 14,
  color: defaultColor.blue
})
</script>
<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.5" cy="7" r="6" :stroke="props.color" stroke-width="2" />
    <path d="M7.5 4.66675V7.10153L9 8.66675" :stroke="props.color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
