<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 15,
  height: 9,
  color: defaultColor.primary
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.width" :height="props.height" viewBox="0 0 15 9" fill="none">
    <path d="M2.5 2L7.5 7L12.5 2" :stroke="props.color" stroke-width="1.5" stroke-linecap="square" />
  </svg>
</template>
