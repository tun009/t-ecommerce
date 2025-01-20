<script setup lang="ts">
import IconMinus from '@/components/icons/IconMinus.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { ref } from 'vue'

interface WelfareProductAmountProps {
  quantity?: number
}

type WelfareProductAmountEmits = (e: 'update:quantity', value: any) => void

const props = defineProps<WelfareProductAmountProps>()
const emits = defineEmits<WelfareProductAmountEmits>()

const quantity = ref(props.quantity ?? 0)
const handleMinus = () => {
  if (quantity.value - 1 <= 0) return
  quantity.value = quantity.value - 1
  emits('update:quantity', quantity.value)
}

const handlePlus = () => {
  quantity.value = quantity.value + 1
  emits('update:quantity', quantity.value)
}
</script>

<template>
  <div class="wf_flex">
    <button @click="handleMinus">
      <IconMinus />
    </button>
    <div
      class="wf-bg--white wf_height-29 wf-color--g-555 wf-font_15--mid wf_min-width-44 wf-px-8 wf-py-10 wf_flex wf-br--g-e-7 wf-br-t-1 wf-br-b-1 wf_flex-center"
    >
      {{ props.quantity }}
    </div>
    <button @click="handlePlus">
      <IconPlus />
    </button>
  </div>
</template>
