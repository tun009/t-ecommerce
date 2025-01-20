<script setup lang="ts">
import { computed } from 'vue'
import Checkbox, { CheckboxContext } from 'primevue/checkbox'
import { WelfareCheckboxEmits, WelfareCheckboxProps } from '@/models/uikits/WelfareCheckboxTypes'
import IconCheckbox from '@/components/icons/IconCheckbox.vue'

withDefaults(defineProps<WelfareCheckboxProps>(), {
  binary: true
})
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
    v-bind="$props"
    :model-value="$props.modelValue"
    @input="(value: any) => $emit('update:modelValue', value)"
    @click.prevent="(event: MouseEvent) => $emit('click', event)"
    @change.prevent="(event) => $emit('change', event)"
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
