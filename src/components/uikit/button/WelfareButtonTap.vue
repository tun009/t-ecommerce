<script setup lang="ts">
import { WelfareButtonEmits, WelfareButtonTapProps } from '@/models/uikits/WelfareButtonTypes'
import { computed } from 'vue'

const props = withDefaults(defineProps<WelfareButtonTapProps>(), {
  type: 'tapSquare'
})

const className = computed(() => {
  const tabs = {
    tapSquare: 'btn-tap-1 ',
    tapRound: 'btn-tap-2 ',
    tapCircle: 'btn-tap-3 ',
    tapCircleArrow: 'btn-tap-4 '
  }
  let classItem = tabs[props.type]
  classItem += props?.active ? 'selected' : 'normal'
  return classItem
})
const emits = defineEmits<WelfareButtonEmits>()
</script>

<template>
  <button
    @click="
      (event) => {
        emits('click', event)
      }
    "
    :disabled="props.disabled"
    class="btn"
    :class="[$props?.class ?? '', className]"
  >
    {{ $props.text ?? '' }}
    <span v-if="props.type === 'tapCircleArrow'" class="icon btn-sz-14" />
  </button>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-button-tap.scss');
</style>
