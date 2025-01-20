<script setup lang="ts">
import { useExpander } from '@/composables/common/useExpander'

export interface WelfareExpanderSlots {
  button: (data: { isExpander: boolean }) => void
  default: () => void
}

const { isExpander, handleHideExpander, handleShowExpander, handleToggleExpander } = useExpander()

defineSlots<WelfareExpanderSlots>()

defineExpose({
  handleHideExpander,
  handleShowExpander,
  handleToggleExpander,
  isExpander
})
</script>

<template>
  <div class="wf-customer-expander wf-bb">
    <slot name="button" :isExpander="isExpander"></slot>
    <div class="wf-expander wf-background" :class="{ 'wf-expanded': isExpander }">
      <div class="wf-expander-content font-13">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/customer/_welfare-customer.scss');
</style>
