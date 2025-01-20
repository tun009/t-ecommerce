<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType';
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 19,
  height: 19,
  color: defaultColor.gray1
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 19 19" fill="none">
    <path d="M13.4609 13.3623L17.75 17.75" :stroke="color" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
    <circle cx="8.25" cy="8.25" r="7.25" :stroke="color" stroke-width="1.5" />
  </svg>
</template>
