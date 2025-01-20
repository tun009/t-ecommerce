<script setup lang="ts">
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 36,
  height: 36
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 36 36" fill="none">
    <line x1="9" y1="8.74231e-08" x2="9" y2="36" stroke="white" stroke-width="4" />
    <line x1="27" y1="8.74231e-08" x2="27" y2="36" stroke="white" stroke-width="4" />
  </svg>
</template>
