<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
interface Props {
  labelButton: string
  fixedTitle?: string
  title: string
}

type OrderConfirmPersonalInformationModalEmits = (e: 'close') => void
defineEmits<OrderConfirmPersonalInformationModalEmits>()
withDefaults(defineProps<Props>(), {
  labelButton: 'order.modal.button.check'
})
</script>
<template>
  <div v-if="fixedTitle" class="wf_modal-box-title">
    <div class="caution-title">
      <div class="wf-font_21--bold wf-color--g-fff wf_letter-spacing--1 wf-pl-1">{{ $t(fixedTitle) }}</div>
    </div>
  </div>
  <div class="wf-modal-order">
    <div class="wf_flex wf_justify-center wf-relative wf_width-full wf-br-b-1 wf-br--g-primary wf-pb-15">
      <div class="wf-font_21--bold wf-color--g-111 wf_text-center">{{ $t(title) }}</div>
      <div class="wf-pointer wf-button-close wf_flex" @click="$emit('close')">
        <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
      </div>
    </div>
    <slot></slot>
    <div class="wf_width-full">
      <WelfareButtonLine type="lg" class="wf_width-full" :text="$t(labelButton)" @click="$emit('close')" />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/modal/_welfare-order-confirm-personal-information.scss');
</style>
