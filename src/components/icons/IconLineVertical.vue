<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 1,
  height: 11,
  color: defaultColor.gray7
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 1 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1" height="11" :fill="color" />
  </svg>
</template>
