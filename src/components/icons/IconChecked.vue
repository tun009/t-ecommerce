<script setup lang="ts">
import { defaultColor } from '@/commons';
import { IconPropsType } from '@/models/icons/IconPropsType';
import { defineProps } from 'vue'

withDefaults(defineProps<IconPropsType>(), {
  color: defaultColor.black
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
    <path d="M1 4.34211L4.15805 7.5L11.0002 1.5" :stroke="color" stroke-width="1.5"/>
  </svg>
</template>