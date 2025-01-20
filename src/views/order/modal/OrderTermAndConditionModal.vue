<!-- FO_MC_OR014002P -->
<script setup lang="ts">
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { BaseModalEmits } from '@/models/widgets/modal'

defineEmits<BaseModalEmits>()
</script>
<template>
  <div class="wf-fix-position">
    <div class="wf-caution-title">
      <div class="wf-font_21--bold wf-color--g-fff wf_letter-spacing--1 wf-pl-1">{{ $t('order.modal.termAndCondition.note') }}</div>
    </div>
    <div class="wf-modal-term-and-condition">
      <WelfareTitleModal  :title="$t('order.modal.termAndCondition.name')" class="wf-pb-15" class-icon="wf-mt--2" @close="$emit('onClose')"/>
      <div class="wf-bg--g-f-5-f-6-fa wf-px-16 wf-pt-20 wf-pb-17 wf_width-full wf-color--g-777 wf-font_13-reg--lh130 wf_overflow-auto">
        <div class="wf-font_15--bold wf-color--g-333 wf-pt-2 wf_letter-spacing--1">{{ $t('order.modal.termAndCondition.rule1') }}</div>
        <div class="wf-pt-13 wf-pr-4">{{ $t('order.modal.termAndCondition.note1') }}</div>
        <div class="wf-pt-5 wf-pr-4">{{ $t('order.modal.termAndCondition.note2') }}</div>
        <div class="wf-pt-5 wf-pr-4">{{ $t('order.modal.termAndCondition.note3') }}</div>
        <div class="wf-font_15--bold wf-color--g-333 wf-pt-27 wf_letter-spacing--1">{{ $t('order.modal.termAndCondition.rule2') }}</div>
        <div class="wf-pt-13">{{ $t('order.modal.termAndCondition.note4') }}</div>
        <div class="wf-pt-5 wf-pr-4">&nbsp;&nbsp;&nbsp;{{ $t('order.modal.termAndCondition.note5') }}</div>
        <div class="wf-pt-6 wf-pr-4">&nbsp;&nbsp;&nbsp;{{ $t('order.modal.termAndCondition.note6') }}</div>
        <div class="wf-pt-8 wf-pr-4">{{ $t('order.modal.termAndCondition.note7') }}</div>
        <div class="wf-font_15--bold wf-color--g-333 wf-pt-26 wf_letter-spacing--1">{{ $t('order.modal.termAndCondition.rule3') }}</div>
        <div class="wf-pt-12">{{ $t('order.modal.termAndCondition.note8') }}</div>
        <div class="wf-pt-5 wf-pr-4">&nbsp;&nbsp;&nbsp;{{ $t('order.modal.termAndCondition.note9') }}</div>
        <div class="wf-pt-5 wf-pr-4">&nbsp;&nbsp;&nbsp;{{ $t('order.modal.termAndCondition.note10') }}</div>
        <div class="wf-pt-5 wf-pr-4">&nbsp;&nbsp;&nbsp;{{ $t('order.modal.termAndCondition.note11') }}</div>
        <div class="wf-pt-8">{{ $t('order.modal.termAndCondition.note12') }}</div>
        <div class="wf-pt-1">{{ $t('order.modal.termAndCondition.note13') }}</div>
        <div class="wf-pt-1">{{ $t('order.modal.termAndCondition.note14') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/modal/_welfare-term-and-condition.scss');
</style>
