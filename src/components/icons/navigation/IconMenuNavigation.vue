<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 18,
  height: 15,
  color: defaultColor.white
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 18 15" fill="none">
    <rect y="13" width="18" height="1.5" rx="0.75" :fill="color" />
    <rect y="6.5" width="18" height="1.5" rx="0.75" :fill="color" />
    <rect width="18" height="1.5" rx="0.75" :fill="color" />
  </svg>
</template>
