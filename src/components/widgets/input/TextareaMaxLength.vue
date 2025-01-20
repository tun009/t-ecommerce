<script setup lang="ts">
import WelfareTextarea from '@/components/uikit/input/WelfareTextarea.vue'
import { useInputValidationMaxLength } from '@/composables/widgets/input/useInputValidationMaxLength'
import { InputValidationMaxLengthProps, WelfareTextareaEmits } from '@/models/uikits/WelfareInputTypes'

const props = defineProps<InputValidationMaxLengthProps>()
const emits = defineEmits<WelfareTextareaEmits>()

const { inputElement, onInput } = useInputValidationMaxLength(props, emits)
</script>

<template>
  <WelfareTextarea
    ref="inputElement"
    v-bind="props"
    :readonly="props.readonly"
    @update:model-value="(value: string) => emits('update:modelValue', value)"
    @input="(e: any) => onInput(e)"
    :placeholder="placeholder"
    :disabled="props.disabled"
    :maxLength="props.maxLength"
  />
</template>
