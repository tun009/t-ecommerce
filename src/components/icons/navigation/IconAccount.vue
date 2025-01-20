<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 17,
  height: 17,
  color: defaultColor.white
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 17 17" fill="none">
    <path
      d="M8.5 8C10.433 8 12 6.433 12 4.5C12 2.567 10.433 1 8.5 1C6.567 1 5 2.567 5 4.5C5 6.433 6.567 8 8.5 8Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 16C15.2902 14.7951 14.2148 13.7844 12.8919 13.0788C11.5689 12.3733 10.0494 12 8.5 12C6.95059 12 5.4311 12.3733 4.10813 13.0788C2.78517 13.7844 1.70982 14.7951 1 16"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
