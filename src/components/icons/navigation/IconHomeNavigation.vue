<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType';
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 24,
  height: 20,
  color: defaultColor.white
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.0295 13.7964V18.38L19.3953 18.4137V9.06872H21L11.9985 1L3 9.06872H4.60469V18.3984L9.97055 18.3646V13.7964H14.0295Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linejoin="round"
    />
  </svg>
</template>
