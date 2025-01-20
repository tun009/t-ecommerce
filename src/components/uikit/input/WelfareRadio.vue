<script setup lang="ts">
import { computed } from 'vue'
import RadioButton, { RadioButtonProps } from 'primevue/radiobutton'
import { WelfareRadioEmits, WelfareRadioProps } from '@/models/uikits/WelfareRadioTypes'

withDefaults(defineProps<WelfareRadioProps>(), {
  gapRadio: 10
})
defineEmits<WelfareRadioEmits>()
const checkboxPT = computed(() => ({
  root: {
    class: ['p-radiobutton']
  },
  input: ({ props }: { props: RadioButtonProps }) => ({
    class: ['p-radiobutton-box', { 'p-radiobutton-box-checked': props.value === props.modelValue, 'p-radiobutton-box-disabled': props.disabled }]
  })
}))
</script>

<template>
  <label :class="`wf_flex wf_items-center wf-space-x-${$props.gapRadio}`">
    <RadioButton
      v-bind="$props"
      :model-value="$props.modelValue"
      @update:model-value="(value: any) => $emit('update:modelValue', value)"
      @click.prevent="(event) => $emit('click', event)"
      @change.prevent="(event) => $emit('change', event)"
      :pt="checkboxPT"
    />
    <span v-if="!!$props.label" class="wf-font_15--mid wf-color--g-333">{{ $props.label }}</span>
  </label>
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-radio.scss');
</style>
