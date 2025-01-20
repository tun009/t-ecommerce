<script lang="ts" setup>
interface WelfareContainerProps {
  title?: string
  class?: string
}
const props = withDefaults(defineProps<WelfareContainerProps>(), { title: 'GENERAL' })
</script>
<template>
  <div :class="`wf_ui-kit-container ${props.class}`">
    <div class="wf_ui-kit-header">
      <p class="wf_ui-kit-header--text">{{ props.title }}</p>
    </div>
    <div class="wf_ui-kit-body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import url('@/assets/styles/uikit/_welfare-container.scss');
</style>
