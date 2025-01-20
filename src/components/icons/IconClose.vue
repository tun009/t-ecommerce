<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 12,
  height: 11,
  color: defaultColor.primary
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.5L2 9.5M2 1.5L10 9.5" :stroke="color" stroke-width="1.5" stroke-linecap="square" />
  </svg>
</template>
