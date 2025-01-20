<script setup lang="ts">
import { WelfareButtonEmits, WelfareButtonSimpleProps } from '@/models/uikits/WelfareButtonTypes'
import WelfareButtonLine from './WelfareButtonLine.vue'
defineProps<WelfareButtonSimpleProps>()
const emits = defineEmits<WelfareButtonEmits>()
</script>
<template>
  <WelfareButtonLine
    @click="
      (event) => {
        emits('click', event)
      }
    "
    type="sm"
    sm-sate
    v-bind="$props"
    class="wf_height-39 wf_min-width-108 wf-px-2"
  />
</template>
