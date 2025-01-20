<script setup lang="ts">
import { formatNumberDot } from '@/commons'
import IconMinus from '@/components/icons/IconMinus.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { WelfareUnitCardOrderEmits, WelfareUnitCardOrderProps } from '@/models/uikits/WelfareUnitCardTypes'
import WelfareUnitCard from './WelfareUnitCard.vue'

const props = defineProps<WelfareUnitCardOrderProps>()
const emits = defineEmits<WelfareUnitCardOrderEmits>()

const handleMinus = () => {
  if (Number(props.quantity) <= 0) return
  emits('update:quantity', Number(props.quantity) - 1)
}

const handlePlus = () => {
  if (Number(props.quantity) >= props.product.quantity) return
  emits('update:quantity', Number(props.quantity) + 1)
}

const handleInputQuantity = (payload: Event) => {
  const target = payload.target as HTMLInputElement
  const value = target.value.trim() === '' ? 0 : +target.value
  emits('update:quantity', value, target)
}
</script>

<template>
  <div>
    <WelfareUnitCard :product="props.product" :is-show-money="false">
      <template #footer>
        <div class="wf-mt-12 wf-space-x-10 wf_flex wf_items-center wf_justify-end">
          <span class="wf-color--g-777 wf-font_13--reg">(잔여:{{ formatNumberDot(props.product?.quantityClone) }}개)</span>
          <div class="wf_flex">
            <button @click="handleMinus"><IconMinus /></button>
            <input
              :value="props.quantity"
              @input="handleInputQuantity"
              placeholder="0"
              type="number"
              class="wf_height-29 wf-color--g-555 wf_text-center wf-font_15--mid wf_width-40 wf-px-2 wf-py-10 wf_flex wf-br--g-e-7 wf-br-t-1 wf-br-b-1 wf_flex-center"
            />
            <button @click="handlePlus"><IconPlus /></button>
          </div>
        </div>
      </template>
    </WelfareUnitCard>
  </div>
</template>
