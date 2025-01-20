<script lang="ts" setup>
import OrderModalContainer from '@/components/order/modal/OrderModalContainer.vue'
</script>
<template>
  <OrderModalContainer fixedTitle="cardOrder.fixedTitleMessageSaveMoney" title="cardOrder.titledMessageSaveMoney">
    <div class="wf-font_15-mid--lh140 wf_text-center wf-py-20 wf-color--g-333" v-html="$t('cardOrder.messageSaveMoney')"></div>
  </OrderModalContainer>
</template>
