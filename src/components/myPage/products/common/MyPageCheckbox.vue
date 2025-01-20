<script setup lang="ts">
import { computed } from 'vue'
import Checkbox, { CheckboxContext } from 'primevue/checkbox'
import { WelfareCheckboxEmits } from '@/models/uikits/WelfareCheckboxTypes'
import IconCheckbox from '@/components/icons/IconCheckbox.vue'

interface WelfareCheckboxProps {
  value: any
  inputId: string
}

const { value, inputId } = withDefaults(defineProps<WelfareCheckboxProps>(), {})

const modelValue = defineModel()
defineEmits<WelfareCheckboxEmits>()
const checkboxPT = computed(() => ({
  root: {
    class: ['p-checkbox']
  },
  input: ({ context }: { context: CheckboxContext }) => ({
    class: ['p-checkbox-box', { 'p-checkbox-box-checked': context.checked, 'p-checkbox-box-disabled': context.disabled }]
  })
}))
</script>

<template>
  <Checkbox
    :inputId="inputId"
    v-model="modelValue"
    @change.prevent="() => $emit('change', value)"
    @input="(value: string) => $emit('update:modelValue', value)"
    :value="value"
    :pt="checkboxPT"
  >
    <template v-slot:icon>
      <IconCheckbox class="p-checkbox-icon" />
    </template>
  </Checkbox>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-checkbox.scss');
</style>
