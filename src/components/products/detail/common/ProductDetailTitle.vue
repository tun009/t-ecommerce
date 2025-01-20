<script setup lang="ts">
interface ProductDetailTitleProps {
  title: string
  normal?: boolean
  class?: string
}

defineProps<ProductDetailTitleProps>()
</script>

<template>
  <p class="wf-color--g-111 wf_letter-spacing--1" :class="`${$props.class} ${$props.normal ? 'wf-font_15--reg' : 'wf-font_15--bold'}`">
    {{ $props.title }}
  </p>
</template>
