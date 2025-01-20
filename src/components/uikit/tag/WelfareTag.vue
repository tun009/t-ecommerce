<script lang="ts" setup>
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import { WelfareTagEmits, WelfareTagProps } from '@/models/uikits/WelfareTagTypes'
const props = defineProps<WelfareTagProps>()
const emits = defineEmits<WelfareTagEmits>()
const handleClick = (event: MouseEvent) => {
  const btn = event.target as HTMLButtonElement
  const isBtnClose = btn.closest('.wf-btn-tag-close')
  if (isBtnClose) {
    emits('close')
    return
  }
  emits('click')
}
</script>
<template>
  <button @click="handleClick" class="btn btn-tag normal" :disabled="props.disabled" :class="[{ selected: props.active }, props.class ?? '']">
    <span>{{ props.text }}</span>
    <span class="wf-btn-tag-close"><IconClose :color="props.disabled ? defaultColor.gray5 : defaultColor.primary" /></span>
  </button>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-button-tag.scss');
</style>
