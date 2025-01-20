<script setup lang="ts">
import { WelfareButtonEmits, WelfareButtonLineProps } from '@/models/uikits/WelfareButtonTypes'
import { computed } from 'vue'

const props = withDefaults(defineProps<WelfareButtonLineProps>(), {
  type: 'sm',
  smSate: false,
  mdState: 'default',
  lgState: 'default',
  typeAction: 'button'
})

const className = computed(() => {
  const normalClass = !props?.active ? 'normal' : ''
  const tabs = {
    sm: `line-btn-31 ${props?.smSate ? 'wf-font_15--reg' : ''} ${normalClass}`,
    md: `line-btn-41 ${props?.mdState == 'default' ? normalClass : props?.mdState}`,
    lg: `line-btn-51  ${props?.lgState == 'default' ? normalClass : props?.lgState}`
  }
  let classItem = tabs[props.type]
  return classItem
})
const emits = defineEmits<WelfareButtonEmits>()
</script>

<template>
  <button
    :type="props.typeAction"
    @click="
      (event) => {
        emits('click', event)
      }
    "
    :disabled="props.disabled"
    class="btn line-btn"
    :class="[className, { selected: props?.active }, props?.class ?? '']"
  >
    <slot name="left"></slot>
    {{ $props.text ?? '' }}
    <slot name="right"></slot>
  </button>
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-button-line.scss');
</style>
