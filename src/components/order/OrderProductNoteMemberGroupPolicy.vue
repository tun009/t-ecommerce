<script setup lang="ts">
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'

interface Props {
  checked: boolean
  name: string
}

interface Emits {
  (e: 'update:checked', value: boolean): void
  (e: 'view-click'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
</script>
<template>
  <div class="wf_flex wf_items-center wf_justify-between">
    <div class="wf_flex wf-space-x-6 wf_items-center">
      <WelfareCheckbox :modelValue="props.checked" @update:modelValue="(value) => emits('update:checked', value)" :inputId="props.name" />
      <label :for="props.name" class="wf-color--g-333 wf-font_15--reg">{{ $t(name) }}</label>
    </div>
    <span @click="emits('view-click')" class="wf-font_15--bold wf-pr-3 wf-text-underline wf_letter-spacing--unset wf-color--g-111">{{
      $t('button.viewContent')
    }}</span>
  </div>
</template>
