<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 20,
  height: 19,
  color: defaultColor.primary
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 20 19" fill="none">
    <path d="M17.0512 4H3L1.5 18H18.5547L17.0512 4Z" :stroke="color" stroke-width="1.5" />
    <path d="M13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8" :stroke="color" stroke-width="1.5" />
    <path d="M13 4C13 2.34315 11.6569 1 10 1C8.34315 1 7 2.34315 7 4" :stroke="color" stroke-width="1.5" />
  </svg>
</template>
