<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import IconDot from '@/components/icons/IconDot.vue'

type OrderInstantDiscountDetailModalEmits = (e: 'accept') => void
defineEmits<OrderInstantDiscountDetailModalEmits>()
</script>

<template>
  <div class="modal-sum-discount wf-space-y-20">
    <div class="wf_flex wf_justify-between wf_width-full wf-br-b-1 wf-br--g-primary wf-pb-15">
      <div class="wf_width-16"></div>
      <div class="wf-font_21--bold wf-color--g-111">{{ $t('order.modal.sumDiscount.name') }}</div>
      <div class="wf-pointer wf_flex" @click="$emit('accept')">
        <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
      </div>
    </div>
    <div class="wf_flex wf_flex-col wf-space-y-10 wf_width-full">
      <div class="wf_flex wf_items-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div class="wf_align-self-center"><IconDot /></div>
        <div>{{ $t('order.modal.sumDiscount.note1') }}</div>
      </div>
      <div class="wf_flex wf_items-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div class="wf_align-self-center"><IconDot /></div>
        <div class="wf_line-height-18">
          <div>{{ $t('order.modal.sumDiscount.note2') }}</div>
          <div>{{ $t('order.modal.sumDiscount.note3') }}</div>
        </div>
      </div>
      <div class="wf_flex wf_items-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div class="wf_align-self-center"><IconDot /></div>
        <div>{{ $t('order.modal.sumDiscount.note4') }}</div>
      </div>
      <div class="wf_flex wf_items-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div class="wf_align-self-center"><IconDot /></div>
        <div>{{ $t('order.modal.sumDiscount.note5') }}</div>
      </div>
    </div>
    <div class="wf-pt-3 wf_width-full">
      <WelfareButtonLine type="lg" class="wf_width-full" :text="$t('order.modal.button.check')" @click="$emit('accept')" />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/modal/_welfare-order-sum-discount-information.scss');
</style>
