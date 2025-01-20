<script setup lang="ts">
interface MyPageWelfarePointItemsEmptyProps {
  title: string
  class: string
}

defineProps<MyPageWelfarePointItemsEmptyProps>()
</script>

<template>
  <div class="  wf_flex wf_items-center wf_justify-center wf-br-b-1 wf-br--g-e-7" :class="$props.class">
    <span class="wf-font_15--reg wf-color--g-333">{{ $props.title }}</span>
  </div>
</template>
