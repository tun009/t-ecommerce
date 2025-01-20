<script setup lang="ts">
import MyPageOrderShortInfo from '@/components/myPage/common/MyPageOrderShortInfo.vue'
import MyPageProductOrderWrap from '@/components/myPage/common/MyPageProductOrderWrap.vue'
import { useMyPageOrderHistory } from '@/composables/myPage/useMyPageOrderHistory'

const { orderHProducts } = useMyPageOrderHistory()
</script>

<template>
  <div class>
    <div class="wf-px-16">
      <MyPageOrderShortInfo :fz-oder-date="true" order-date="2023.11.15" order-number="12345678912345" address="홍길동 서울 마포구 상암산로 34" />
      <MyPageProductOrderWrap
        v-if="orderHProducts"
        :class="`wf-py-20 wf-br-b-1 wf-br--g-e-7`"
        :product="orderHProducts"
        delivery-status="배송완료"
        :show-button-status-delivery="true"
        show-button-change-options
        show-button-return-request
      />

      <MyPageProductOrderWrap
        v-if="orderHProducts"
        :class="`wf-py-20`"
        :product="orderHProducts"
        delivery-status="출고지시"
        show-button-change-options
        show-button-return-request
      />
    </div>
    <div class="wf-px-16">
      <MyPageOrderShortInfo order-date="" order-number="" address="홍길동  서울 마포구 상암산로 34" />
      <MyPageProductOrderWrap
        v-if="orderHProducts"
        :class="`wf-py-20 wf-br-b-1 wf-br--g-e-7`"
        :product="orderHProducts"
        delivery-status="배송완료"
        :show-button-status-delivery="true"
        show-button-change-options
        show-button-return-request
      />

      <MyPageProductOrderWrap
        v-if="orderHProducts"
        :class="`wf-py-20`"
        :product="orderHProducts"
        delivery-status="출고지시"
        show-button-change-options
        show-button-return-request
      />
    </div>
  </div>
</template>
