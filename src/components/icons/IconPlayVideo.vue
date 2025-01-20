<script setup lang="ts">
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 37,
  height: 44
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 37 44" fill="none">
    <path d="M4 40V4L33 22L4 40Z" stroke="white" stroke-width="4" />
  </svg>
</template>
