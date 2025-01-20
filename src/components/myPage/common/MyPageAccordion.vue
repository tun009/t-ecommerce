<script setup lang="ts">
interface accordionShow {
  show: boolean
}

const props = defineProps<accordionShow>()
</script>

<template>
  <div class="wf-bg--g-fff">
    <div class="wf-customer-expander wf-bb">
      <slot name="title"></slot>
    </div>
    <div class="wf-expander wf-background" :class="{ 'wf-expanded': props.show }">
      <div class="wf-expander-content wf-font_13--light color-555">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wf-bb {
  border-bottom: 1px solid #e7e7e7;
}
.wf-background {
  background: #f5f5f5;
}
.color-555 {
  color: #555555;
}
</style>
