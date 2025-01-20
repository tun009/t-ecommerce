<script setup lang="ts">
import IconMinus from '@/components/icons/IconMinus.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { useProductAmountInput } from '@/composables/common/useProductAmoutInput'

interface WelfareProductAmountProps {
  quantity?: number
  min?: number
  max: number
  isEditInput?: boolean
}

type WelfareProductAmountEmits = (e: 'update:quantity', value: any) => void

const props = withDefaults(defineProps<WelfareProductAmountProps>(), {
  min: 1
})
const emits = defineEmits<WelfareProductAmountEmits>()

const { handleInputQuantity, handleMinus, handlePlus } = useProductAmountInput(props, emits)
</script>

<template>
  <div class="wf_flex">
    <button @click="handleMinus" :disabled="props.quantity === props.min"><IconMinus /></button>
    <input
      v-if="props.isEditInput"
      :value="props.quantity"
      @input="handleInputQuantity"
      placeholder="0"
      type="number"
      class="wf_height-29 wf-color--g-555 wf_text-center wf-font_15--mid wf_width-40 wf-px-2 wf-py-10 wf_flex wf-br--g-e-7 wf-br-t-1 wf-br-b-1 wf_flex-center"
    />
    <span
      v-else
      class="wf_height-29 wf-color--g-555 wf_text-center wf-font_15--mid wf_width-40 wf-px-2 wf-py-10 wf_flex wf-br--g-e-7 wf-br-t-1 wf-br-b-1 wf_flex-center wf-bg--g-fff"
    >
      {{ props.quantity }}
    </span>
    <button @click="handlePlus"><IconPlus /></button>
  </div>
</template>
