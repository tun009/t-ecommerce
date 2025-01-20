<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 45,
  height: 40,
  color: defaultColor.white
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M22.4863 6.25812C18.4876 1.59808 11.8195 0.344539 6.80939 4.61174C1.79929 8.87894 1.09394 16.0135 5.0284 21.0603C8.29963 25.2564 18.1995 34.1063 21.4442 36.9707C21.8072 37.2912 21.9887 37.4514 22.2004 37.5143C22.3852 37.5693 22.5874 37.5693 22.7722 37.5143C22.9839 37.4514 23.1654 37.2912 23.5284 36.9707C26.7731 34.1063 36.673 25.2564 39.9442 21.0603C43.8787 16.0135 43.2594 8.83405 38.1632 4.61174C33.067 0.389425 26.485 1.59808 22.4863 6.25812Z"
      :stroke="color"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
