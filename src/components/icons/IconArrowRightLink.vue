<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 9,
  height: 13,
  color: defaultColor.primary
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 9 13" fill="none">
    <path d="M2 1.5L7 6.5L2 11.5" :stroke="color" stroke-width="1.5" stroke-linecap="square" />
  </svg>
</template>
