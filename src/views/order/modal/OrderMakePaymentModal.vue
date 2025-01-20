<!-- FO_MC_OR011004P -->
<script setup lang="ts">
import { defaultColor, formatNumberDot } from '@/commons'
import { OrderMakePaymentModalEmits, OrderMakePaymentModalProps } from '@/models/views/order/modal/OrderMakePaymentModel'
import { useOrderMakePayment } from '@/composables/order/modal/useOrderMakePayment'
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import IconClose from '@/components/icons/IconClose.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'

const props = defineProps<OrderMakePaymentModalProps>()
const emits = defineEmits<OrderMakePaymentModalEmits>()
const { onClickButton } = useOrderMakePayment(props, emits)
</script>

<template>
  <div class="modal-make-payment">
    <div class="wf_flex wf_justify-between wf_width-full wf-br-b-1 wf-br--g-primary wf-pb-15 height-37">
      <div class="width-14"></div>
      <div class="wf-font_21--bold wf-color--g-111">{{ $t('order.modal.makePayment') }}</div>
      <div class="pointer" @click="emits('cancel')">
        <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
      </div>
    </div>
    <div class="wf_width-full wf-space-y-20">
      <div class="wf_flex wf-space-x-6 wf-pt-2">
        <div class="wf-mt--3">
          <WelfareCheckbox :model-value="props.agreePaymentCheckbox" @update:model-value="(value) => emits('update:agreePaymentCheckbox', value)" />
        </div>
        <div>
          <span class="wf-color--g-333 wf-font_15--mid">{{ $t('order.modal.agree') }}</span>
          <div class="wf_flex wf-space-x-4 wf-color--g-777 wf-font_13--reg wf-pl-2 wf-pt-2">
            <span class="wf-pt-16">.</span>
            <div class="wf-pt-20">
              <div>{{ $t('order.modal.noteAgree1') }}</div>
              <div class="wf-pt-10">{{ $t('order.modal.noteAgree2') }}</div>
              <div class="wf-pt-10">{{ $t('order.modal.noteAgree3') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wf-pt-4 wf_width-full">
      <WelfareButtonLine
        type="lg"
        lg-state="black-line"
        active
        class="wf_width-full button-special wf-font_21--bold"
        :text="$t('order.modal.payment', { money: formatNumberDot(props.total) })"
        @click="onClickButton"
      />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/modal/_welfare-order-make-payment.scss');
</style>
