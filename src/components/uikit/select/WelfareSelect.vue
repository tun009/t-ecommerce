<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { WelfareSelectEmits, WelfareSelectProps } from '@/models/uikits/WelfareSelectTypes'
import IconSelect from '@/components/icons/IconSelect.vue'

const props = defineProps<WelfareSelectProps>()
const emit = defineEmits<WelfareSelectEmits>()

const emitEvent = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <Dropdown v-bind="props" :modelValue="props.modelValue" v-on:update:modelValue="emitEvent">
    <template #dropdownicon>
      <IconSelect />
    </template>
    <template #option="slotProps">
      <slot name="option" :props="slotProps"> </slot>
    </template>
  </Dropdown>
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-select.scss');
</style>
