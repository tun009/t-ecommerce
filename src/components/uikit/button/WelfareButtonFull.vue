<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import { WelfareButtonEmits, WelfareButtonFullProps } from '@/models/uikits/WelfareButtonTypes'

const props = withDefaults(defineProps<WelfareButtonFullProps>(), {
  isRotate: false
})
const emits = defineEmits<WelfareButtonEmits>()
</script>

<template>
  <button
    :disabled="props.disabled"
    @click="
      (event) => {
        emits('click', event)
      }
    "
    class="btn full-btn normal wf_flex wf-space-x-3"
    :class="[$props?.class ?? '', { selected: props.active }]"
  >
    {{ $props.text ?? '' }}
    <span :class="[{ 'wf-rotate-180': props.isRotate }]">
      <IconArrowDown />
    </span>
  </button>
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-button-full.scss');
</style>
