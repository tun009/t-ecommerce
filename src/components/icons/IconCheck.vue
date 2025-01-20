<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 15,
  height: 11,
  color: defaultColor.red
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5.28947L5.21073 9.5L14.3335 1.5" :stroke="props.color" stroke-width="2" />
  </svg>
</template>
