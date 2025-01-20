<script setup lang="ts">
import { CODE_TEL_LIST } from '@/commons'
import WelfareInputMark from '../uikit/input/WelfareInputMark.vue'
import WelfareSelect from '../uikit/select/WelfareSelect.vue'
interface OrderGroupEnterPhoneProps {
  prefix: string | undefined
  phone: string
  optionContact?: string[]
  placeholderInput?: string
  title?: string
  disabled?: boolean
  required?: boolean
  class?: string
  sizeSelect?: number
}

interface OrderGroupEnterPhoneEmits {
  (e: 'update:prefix', value: any): void
  (e: 'update:phone', value: any): void
}

const props = withDefaults(defineProps<OrderGroupEnterPhoneProps>(), {
  required: true,
  sizeSelect: 97
})
const emits = defineEmits<OrderGroupEnterPhoneEmits>()
</script>
<template>
  <WelfareInputMark
    :clearText="false"
    :class="props.class ?? ''"
    :model-value="props.phone"
    @update:model-value="(value) => emits('update:phone', value)"
    class-wrap="wf_flex wf-space-x-10"
    :title="title"
    mask="9999-9999"
    :required="required"
    placeholder="[-]없이 숫자만 입력"
    :disabled="props.disabled"
  >
    <template #prefix>
      <WelfareSelect
        :disabled="props.disabled"
        :class="`wf_max-width-${sizeSelect} wf-py-11--i`"
        :model-value="props.prefix"
        @update:model-value="(value) => emits('update:prefix', value)"
        placeholder="선택"
        :options="optionContact ? optionContact : CODE_TEL_LIST"
      />
    </template>
  </WelfareInputMark>
</template>
