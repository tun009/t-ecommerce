<!-- FO_MC_OR011003P -->
<script setup lang="ts">
import { defaultColor, formatNumberDot } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { OrderInstantListItemDiscountModel } from '@/models/views/order/modal/OrderInstantDiscountDetailsModel'
interface OrderInstantDiscountDetailModalProps {
  total: number
  items: OrderInstantListItemDiscountModel[]
}

type OrderInstantDiscountDetailModalEmits = (e: 'accept') => void

defineProps<OrderInstantDiscountDetailModalProps>()

defineEmits<OrderInstantDiscountDetailModalEmits>()
</script>

<template>
  <div class="modal-instant-discount wf-space-y-20">
    <div class="wf_flex wf_justify-between wf_width-full wf-br-b-1 wf-br--g-primary wf-pb-15">
      <div class="wf_width-16"></div>
      <div class="wf-font_21--bold wf-color--g-111">{{ $t('order.modal.instantDiscountDetails') }}</div>
      <div class="wf-pointer" @click="$emit('accept')">
        <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
      </div>
    </div>
    <div class="wf_width-full wf-bg--g-f-5-f-6-fa wf-p-20 wf-space-y-20">
      <div class="wf_flex wf_justify-between wf-pb-20" v-for="(item, index) in $props.items" :key="index">
        <div class="wf-color--g-333 wf-font_15--mid">{{ item.discountName }}</div>
        <div class="wf-color--g-333 wf-font_15--mid">{{ formatNumberDot(item.discount) }}{{ $t('order.modal.won') }}</div>
      </div>
      <div class="wf_flex wf_justify-between wf-pt-20">
        <div class="wf-color--g-333 wf-font_17--bold">{{ $t('order.modal.totalDiscount') }}</div>
        <div class="wf-color--f-95729 wf-font_17--bold">{{ formatNumberDot($props.total) }}{{ $t('order.modal.won') }}</div>
      </div>
    </div>
    <div class="wf-pt-5 wf_width-full">
      <WelfareButtonLine type="lg" class="wf_width-full" :text="$t('order.modal.button.check')" @click="$emit('accept')" />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/modal/_welfare-order-instant-discount-detail.scss');
</style>
