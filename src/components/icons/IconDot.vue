<script setup lang="ts">
import { IconPropsType } from '@/models/icons/IconPropsType'

withDefaults(defineProps<IconPropsType>(), {
  width: 2,
  height: 3
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="$props.width" :height="$props.height" viewBox="0 0 2 3" :fill="$props.color">
    <circle cx="1" cy="1.5" r="1" fill="#777777" />
  </svg>
</template>
