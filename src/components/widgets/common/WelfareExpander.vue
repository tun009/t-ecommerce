<script setup lang="ts">
import { useExpander } from '@/composables/common/useExpander'

interface Props {
  defaultExpander: boolean
}

export interface WelfareExpanderSlots {
  button: (data: { isExpander: boolean }) => void
  default: () => void
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpander: false
})

const { isExpander, handleHideExpander, handleShowExpander, handleToggleExpander } = useExpander(props.defaultExpander)

defineSlots<WelfareExpanderSlots>()

defineExpose({
  handleHideExpander,
  handleShowExpander,
  handleToggleExpander,
  isExpander
})
</script>

<template>
  <div>
    <slot name="button" :isExpander="isExpander"></slot>
    <div class="wf-expander" :class="{ 'wf-expanded': isExpander }">
      <div class="wf-expander-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
