<script setup lang="ts">
import { defaultColor } from '@/commons'
import { IconPropsType } from '@/models/icons/IconPropsType';
import { defineProps } from 'vue'
withDefaults(defineProps<IconPropsType>(), {
  width: 20,
  height: 20,
  color: defaultColor.red_2F
})
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.8101 7.39519C12.4472 4.77392 8.50697 4.0688 5.54646 6.4691C2.58594 8.8694 2.16914 12.8826 4.49405 15.7214C6.42706 18.0817 12.277 23.0598 14.1943 24.671C14.4088 24.8513 14.5161 24.9414 14.6412 24.9768C14.7504 25.0077 14.8698 25.0077 14.979 24.9768C15.1041 24.9414 15.2114 24.8513 15.4259 24.671C17.3432 23.0598 23.1931 18.0817 25.1261 15.7214C27.451 12.8826 27.0851 8.84415 24.0737 6.4691C21.0623 4.09405 17.173 4.77392 14.8101 7.39519Z"
      :fill="color"
    />
  </svg>
</template>
