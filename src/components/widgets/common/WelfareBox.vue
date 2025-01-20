<script setup lang="ts">
interface WelfareBoxProps {
  isPaddingHorizontal?: boolean
  isPaddingVertical?: boolean
}

const props = withDefaults(defineProps<WelfareBoxProps>(), {
  isPaddingHorizontal: true,
  isPaddingVertical: true
})
</script>

<template>
  <div class="wf-bg--g-fff" :class="[{ 'wf-px-16': props.isPaddingHorizontal, 'wf-py-20': isPaddingVertical }]">
    <slot></slot>
  </div>
</template>
