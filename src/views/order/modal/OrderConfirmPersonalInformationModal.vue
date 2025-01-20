<!-- FO_MC_OR014003P -->
<script setup lang="ts">
import IconDot from '@/components/icons/IconDot.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { BaseModalEmits } from '@/models/widgets/modal'

defineEmits<BaseModalEmits>()
</script>
<template>
  <div class="wf-modal-confirm-personal-information">
    <WelfareTitleModal :title="$t('order.modal.personalInformation.name')" class="wf-pb-15" class-icon="wf-mt--3" @close="$emit('onClose')" />
    <div class="wf-bg--g-f-5-f-6-fa wf-px-16 wf-py-20">
      <div class="wf-font_15--bold wf-color--g-333 wf-pt-3">{{ $t('order.modal.personalInformation.rule1') }}</div>
      <div class="wf-font_13-reg--lh130 wf-color--g-777 wf-pt-10 wf-pr-4">
        {{ $t('order.modal.personalInformation.note1') }}<br />
        <div class="wf-pt-1">{{ $t('order.modal.personalInformation.note2') }}</div>
        <div class="wf-pt-1">{{ $t('order.modal.personalInformation.note3') }}</div>
      </div>
      <div class="wf-font_15--bold wf-color--g-333 wf-pt-27">{{ $t('order.modal.personalInformation.rule2') }}</div>
      <div class="wf-font_13-reg--lh130 wf-color--g-777 wf-pt-12">
        {{ $t('order.modal.personalInformation.note4') }}
      </div>
      <div class="wf-font_15--bold wf-color--g-333 wf-pt-28">{{ $t('order.modal.personalInformation.rule3') }}</div>
      <div class="wf-font_13-reg--lh130 wf-color--g-777 wf-pt-12">{{ $t('order.modal.personalInformation.note5') }}</div>
    </div>
    <div class="wf_flex wf-font_13-reg--lh130 wf-color--g-777 wf_width-full wf-space-x-6">
      <div class="wf_flex wf-pt-4">
        <IconDot />
      </div>
      <div class="wf_width-full">
        <div class="">{{ $t('order.modal.personalInformation.note6') }}</div>
        <div class="wf-pt-1">{{ $t('order.modal.personalInformation.note7') }}</div>
        <div class="wf-pt-1">{{ $t('order.modal.personalInformation.note8') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/modal/_welfare-order-confirm-personal-information.scss');
</style>
<script setup></script>
