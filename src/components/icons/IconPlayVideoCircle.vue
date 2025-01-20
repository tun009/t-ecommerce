<script setup lang="ts">
import { IconPropsType } from '@/models/icons/IconPropsType';

withDefaults(defineProps<IconPropsType>(), {
  width: 36,
  height: 36
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="$props.width" :height="$props.height" viewBox="0 0 36 36" fill="none">
    <g opacity="0.9">
      <circle cx="18" cy="18" r="18" fill="white" />
      <path d="M16 22V14L22.5 18L16 22Z" fill="#111111" stroke="#111111" stroke-width="3" stroke-linejoin="round" />
    </g>
  </svg>
</template>
