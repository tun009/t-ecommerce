<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 20,
  height: 20,
  color: defaultColor.white
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 19.2856C14.3394 19.2856 17.8572 15.7678 17.8572 11.4284C17.8572 7.08905 14.3394 3.57129 10 3.57129C5.66065 3.57129 2.14288 7.08905 2.14288 11.4284C2.14288 15.7678 5.66065 19.2856 10 19.2856Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M0.714294 3.5715C1.71754 2.40615 2.92857 1.43733 4.28572 0.714355"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.2857 3.5715C18.2825 2.40615 17.0714 1.43733 15.7143 0.714355"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M10 7.14307V11.4288H13.5714" :stroke="color" stroke-width="1.5" stroke-linecap="square" />
  </svg>
</template>
