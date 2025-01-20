<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 15,
  height: 9,
  color: defaultColor.gray1
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 15 9" fill="none">
    <path d="M13.4285 7L7.71418 1.28571L1.9999 7" :stroke="color" stroke-width="1.5" stroke-linecap="square" />
  </svg>
</template>
