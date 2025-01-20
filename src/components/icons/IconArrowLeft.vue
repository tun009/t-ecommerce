<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 20,
  height: 20,
  color: defaultColor.primary
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2L6 10L14 18" :stroke="props.color" stroke-width="1.5" stroke-linecap="square" />
  </svg>
</template>
