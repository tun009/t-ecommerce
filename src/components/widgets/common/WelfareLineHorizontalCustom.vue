<script setup lang="ts">
interface WelfareLineHorizontalCustomProps {
  class?: string
}

defineProps<WelfareLineHorizontalCustomProps>()
</script>

<template>
  <div :class="'wf-br-b-1 wf-bg--g-f-5-f-5-f wf-br--f0 wf_height-7 ' + $props.class" />
</template>
