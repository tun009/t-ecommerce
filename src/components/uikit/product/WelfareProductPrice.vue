<script setup lang="ts">
import { formatNumberDot } from '@/commons'
import IconQuestion from '@/components/icons/IconQuestion.vue'
interface WelfareProductPriceProps {
  price: number
  pricePromotion?: number
  percent?: number
  isApproximately?: boolean
}

interface WelfareProductPriceEmits {
  (e: 'question-click'): void
}

const props = defineProps<WelfareProductPriceProps>()
const emits = defineEmits<WelfareProductPriceEmits>()
</script>
<template>
  <div>
    <div class="wf_flex wf_items-center wf-space-x-5">
      <p v-if="props.percent" class="wf-color--f-95729 wf_flex wf_items-center wf-font_19--bold">
        <span class="wf-font_23--bold">{{ props.percent }}</span
        >%
      </p>
      <div class="wf-color--g-111 wf_flex wf_items-center wf-font_15--mid wf-space-x-1">
        <div class="wf_flex wf_items-center">
          <span class="wf-font_23--bold">{{ formatNumberDot(props?.pricePromotion ? props?.pricePromotion : props.price) }}</span
          >원
        </div>
        <span v-if="props.isApproximately">~</span>
      </div>
      <button v-if="props.percent" @click="emits('question-click')" class="wf-ml-2"><IconQuestion /></button>
    </div>
    <p v-if="props.pricePromotion !== props.price" class="wf-font_15--reg wf-color--g-bbb wf-mt-5 wf-text-line-through">
      {{ formatNumberDot(props.price) }}원
    </p>
  </div>
</template>
