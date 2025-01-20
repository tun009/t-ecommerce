<script setup lang="ts">
interface WelfareMediaNumber {
  class?: string
  total: number
  active: number
}

defineProps<WelfareMediaNumber>()
</script>

<template>
  <div :class="`wf-bg--g-111-02 wf-pt-5 wf-pr-13 wf-pb-5 wf-pl-11 wf-color--g-fff wf_height-22 wf_flex ${$props.class}`">
    <span class="wf-font_11--bold">
      {{ $props.active }} <span class="wf-font_11--reg wf-ml-1 wf_letter-spacing--1">/ {{ $props.total }}</span></span
    >
  </div>
</template>
