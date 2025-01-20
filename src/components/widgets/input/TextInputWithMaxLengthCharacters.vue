<script setup lang="ts">
import WelfareInputText from '@/components/uikit/input/WelfareInput.vue'
import { WelfareInputEmits, WelfareInputMaxLengthValidationProps } from '@/models/uikits/WelfareInputTypes'
import { useInputValidationMaxLength } from '@/composables/widgets/input/useInputValidationMaxLength'

const emits = defineEmits<WelfareInputEmits>()

const props = defineProps<WelfareInputMaxLengthValidationProps>()
const { onInput, inputElement, onKeyDown } = useInputValidationMaxLength(props, emits)

defineExpose({
  focus: () => {
    inputElement.value?.setFocus?.()
  }
})
</script>

<template>
  <WelfareInputText
    ref="inputElement"
    v-bind="props"
    :v-on="$emit || {}"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    @input="(event: any) => onInput(event)"
    @keydown="(e) => onKeyDown(e)"
  />
</template>
