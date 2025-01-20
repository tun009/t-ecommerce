<script lang="ts" setup>
import { computed } from 'vue'

interface WelfareColorTag {
  text: string
  type?: 'sm' | 'lg'
  class?: string
  active?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<WelfareColorTag>(), {
  type: 'sm'
})

const className = computed(() => {
  const tabs = {
    sm: `sm`,
    lg: `lg`
  }
  let classItem = tabs[props.type]
  return classItem
})
</script>
<template>
  <button class="btn-tag-color normal" :disabled="props.disabled" :class="[className, { selected: props.active }, props.class]">
    {{ props.text }}
  </button>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-color-tag.scss');
</style>
