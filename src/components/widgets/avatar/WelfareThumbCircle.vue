<script lang="ts" setup>
interface WelfareThumbCircle {
  url: string
  size?: 'sm' | 'md'
}
withDefaults(defineProps<WelfareThumbCircle>(), { size: 'sm' })
</script>

<template>
  <figure :class="{ 'wf-thumb-circle-sm': size === 'sm', 'wf-thumb-circle-md': size === 'md' }">
    <img :src="url" :width="24" :height="24" alt="" />
  </figure>
</template>
