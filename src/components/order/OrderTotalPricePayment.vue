<script setup lang="ts">
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import WelfareViewPrice from '@/components/uikit/product/WelfareViewPrice.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'

interface TotalPricePaymentProps {
  agreePaymentCheckbox: boolean
  totalPricePayment: number
  classGroup?: string
  isShowNote?: boolean
}

interface TotalPricePaymentEmits {
  (e: 'update:agreePaymentCheckbox', value: boolean): void
  (e: 'save'): void
}

const props = defineProps<TotalPricePaymentProps>()
const emits = defineEmits<TotalPricePaymentEmits>()
</script>

<template>
  <div class="wf-sticky-bottom wf-br-t-1 wf-br--g-e-7 wf-bg--white" :class="classGroup">
    <WelfareBox>
      <div class="wf_flex wf-space-x-6 wf_items-center">
        <WelfareCheckbox
          inputId="agree-policy"
          :model-value="props.agreePaymentCheckbox"
          @update:model-value="(value) => emits('update:agreePaymentCheckbox', value)"
        />
        <label for="agree-policy" class="wf-color--g-111 wf-font_15--reg">{{ $t('cardOrder.messageAgreement') }}</label>
      </div>
      <div v-if="isShowNote" class="wf_flex wf-mt-10 wf-space-x-2 wf-font_13-reg--lh130 wf-color--g-777">
        <span>•</span><span>{{ $t('cardOrder.noteAgreePolicy') }}</span>
      </div>
    </WelfareBox>
    <div @click="emits('save')" class="wf_height-63 wf-bg--g-111 wf-space-x-2 wf_justify-center wf_items-center wf_flex">
      <WelfareViewPrice :price="props?.totalPricePayment" class="wf-font_21--bold wf-color--g-fff" class-price="wf-font_21--bold" />
      <span class="wf-font_21--bold wf-color--g-fff">{{ $t('cardOrder.paymentText') }}</span>
    </div>
  </div>
</template>
