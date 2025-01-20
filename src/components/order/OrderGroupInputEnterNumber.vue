<script setup lang="ts">
import { useOrderInputCardBank } from '@/composables/order/useOrderInputCard'
import TextInputWithMaxLengthCharacters from '../widgets/input/TextInputWithMaxLengthCharacters.vue'

interface Props {
  // number: number
  value: string[]
}

type Emitters = (e: 'update:value', value: string[]) => void

const props = defineProps<Props>()
const emits = defineEmits<Emitters>()

const { refInput, handleKeyDown, handleUpdateInput } = useOrderInputCardBank(props, emits)
</script>
<template>
  <div class="wf_flex wf-space-x-10">
    <TextInputWithMaxLengthCharacters
      v-for="(item, index) in value"
      :ref="(el: any) => (refInput[index] = el)"
      :key="index"
      :name="index.toString()"
      :model-value="item"
      @input="(value: InputEvent) => handleUpdateInput(value, index)"
      @keydown="(event) => handleKeyDown(event, index)"
      :max-length="4"
      is-number-input-type
      hiddenWarning
      type="number"
    />
  </div>
</template>
