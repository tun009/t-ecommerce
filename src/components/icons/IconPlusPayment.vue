<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 50,
  height: 50,
  color: defaultColor.primary
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="26" y1="4.37115e-08" x2="26" y2="50" :stroke="color" stroke-width="2" />
    <line x1="50" y1="26" x2="-8.74228e-08" y2="26" :stroke="color" stroke-width="2" />
  </svg>
</template>
