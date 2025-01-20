<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 7,
  height: 9,
  color: defaultColor.gray3
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 7 9" fill="none">
    <path d="M2 1.3916L5 4.3916L2 7.3916" :stroke="color" stroke-width="1.5" stroke-linecap="square" />
  </svg>
</template>
