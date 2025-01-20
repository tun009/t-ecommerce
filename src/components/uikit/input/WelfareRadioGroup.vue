<script setup lang="ts">
import { WelfareRadioEmits, WelfareRadioGroupProps } from '@/models/uikits/WelfareRadioTypes'
import WelfareRadio from './WelfareRadio.vue'

withDefaults(defineProps<WelfareRadioGroupProps>(), {
  gap: 30
})
defineEmits<WelfareRadioEmits>()
</script>

<template>
  <div class="wf_flex" :class="`wf-space-x-${$props.gap}`">
    <template v-for="option in $props.options" :key="option.value">
      <WelfareRadio
        v-bind="{ ...$props, ...option }"
        :name="$props.name"
        :input-id="`${$props.name}.${option.value}`"
        @update:model-value="(value: any) => $emit('update:modelValue', value)"
        @click.prevent="(event) => $emit('click', event)"
        @change.prevent="(event) => $emit('change', event)"
      />
    </template>
  </div>
</template>
