<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 8,
  height: 13,
  color: defaultColor.white
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 6L4 9M4 9L7 6M4 9V0.5" :stroke="color" stroke-width="0.8" />
    <path d="M1 11.5H7" :stroke="color" stroke-width="0.8" />
  </svg>
</template>
