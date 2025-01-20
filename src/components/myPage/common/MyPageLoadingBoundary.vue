<script setup lang="ts">
import { defineProps } from 'vue'

interface MyPageLoadingProps {
  loading: boolean
}

const props = defineProps<MyPageLoadingProps>()
</script>

<template>
  <div v-if="props.loading"></div>
  <slot v-else name="content"></slot>
</template>
