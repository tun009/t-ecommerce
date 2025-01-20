<script setup lang="ts">
import WelfareInputText from '@/components/uikit/input/WelfareInput.vue'
import { useInputValidationMaxBytes } from '@/composables/widgets/input/useInputValidationMaxBytes'
import { WelfareInputEmits, WelfareInputMaxBytesValidationProps } from '@/models/uikits/WelfareInputTypes'

const props = defineProps<WelfareInputMaxBytesValidationProps>()
defineEmits<WelfareInputEmits>()

const { currentText, inputElement, maxLengthRef, onKeyPress } = useInputValidationMaxBytes(props)
</script>

<template>
  <WelfareInputText
    ref="inputElement"
    v-bind="props"
    :v-on="$emit || {}"
    v-model="currentText"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    @keypress="onKeyPress"
    :max-length="maxLengthRef"
    @keydown="($event) => $emit('keydown', $event)"
  />
</template>
