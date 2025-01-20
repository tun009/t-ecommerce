<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { defineProps } from 'vue'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 12,
  height: 12,
  color: defaultColor.gray_bb
})
</script>
<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.540039 10.5H0.0400391V11.5443L0.853542 10.8895L0.540039 10.5ZM0.540039 0.5V0C0.263897 0 0.0400391 0.223858 0.0400391 0.5L0.540039 0.5ZM10.54 0.5H11.04C11.04 0.223858 10.8162 0 10.54 0V0.5ZM10.54 8.83335V9.33335C10.8162 9.33335 11.04 9.10949 11.04 8.83335H10.54ZM2.61074 8.83335V8.33335H2.43452L2.29724 8.44384L2.61074 8.83335ZM1.04004 10.5V0.5H0.0400391V10.5H1.04004ZM0.540039 1H10.54V0H0.540039V1ZM10.04 0.5V8.83335H11.04V0.5H10.04ZM10.54 8.33335H2.61074V9.33335H10.54V8.33335ZM2.29724 8.44384L0.226536 10.1105L0.853542 10.8895L2.92425 9.22286L2.29724 8.44384Z"
      :fill="props.color"
    />
    <rect x="3.18164" y="4.5" width="1" height="1" :fill="props.color" />
    <rect x="5.18164" y="4.5" width="1" height="1" :fill="props.color" />
    <rect x="7.18164" y="4.5" width="1" height="1" :fill="props.color" />
  </svg>
</template>
