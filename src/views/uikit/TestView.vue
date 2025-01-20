<script setup lang="ts">
import OrderMakePaymentModal from '@/views/order/modal/OrderMakePaymentModal.vue'
import OrderInstantDiscountDetailsModal from '@/views/order/modal/OrderInstantDiscountDetailsModal.vue'
import { MockDataDiscountDetail } from '@/assets/mockData/orders/data-discount-detail'
import OrderSumDiscountInformationModal from '@/views/order/modal/OrderSumDiscountInformationModal.vue'
import MyPageHistoryExchangeStatusModal from '../myPage/modal/MyPageHistoryExchangeStatusModal.vue'
import { MockDataMyPage } from '@/assets/mockData/myPage/mock-data-my-page'
import MyPageStatusOrderRefundModal from '../myPage/modal/MyPageStatusOrderRefundModal.vue'
import MyPageStatusDeliveryModal from '../myPage/modal/MyPageStatusDeliveryModal.vue'
import MyPageListDeliveryModal from '../myPage/modal/MyPageListDeliveryModal.vue'
</script>

<template>
  <div class="wf-bg--g-777 wf-py-20 wf_flex">
    <div class="wf_flex-1">
      <div>Modal FO_MC_OR011003P</div>
      <OrderMakePaymentModal :total="99999999" />

      <div>Modal FO_MC_OR011004P</div>
      <OrderInstantDiscountDetailsModal :total="999999999" :items="MockDataDiscountDetail" />

      <div>Modal FO_MC_OR011001P</div>
      <OrderSumDiscountInformationModal />

      <div>Modal FO_MC_MY011005P</div>
      <MyPageHistoryExchangeStatusModal :data="MockDataMyPage.historyData" />

      <div>Modal FO_MC_MY011004P</div>
      <MyPageStatusOrderRefundModal :data="MockDataMyPage.refundStatusData" />

      <div>Modal FO_MC_MY011003P</div>
      <MyPageStatusDeliveryModal id="1" />

      <div>Modal FO_MC_MY011002P</div>
      <MyPageListDeliveryModal id="1" />
    </div>
  </div>
</template>
