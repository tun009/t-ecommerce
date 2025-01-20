<script setup lang="ts">
import { WelfareUnitCardEmits, WelfareUnitCardStateDeliveryProps } from '@/models/uikits/WelfareUnitCardTypes'
import WelfareUnitCard from './WelfareUnitCard.vue'
import WelfareButtonLine from '../button/WelfareButtonLine.vue'

const props = defineProps<WelfareUnitCardStateDeliveryProps>()
const emits = defineEmits<WelfareUnitCardEmits>()
const handleChangeCheckBox = (value: boolean) => {
  emits('update:checked', value)
}
</script>

<template>
  <div>
    <div class="wf_unit-claim--header wf_flex wf_justify-between wf_items-center wf_height-41">
      <p class="wf-font_15--bold wf-color--g-111">2023.11.15</p>
      <router-link class="wf-font_13--reg wf-color--g-777 wf-text-underline" :to="'#'">주문번호 12345678912345</router-link>
    </div>
    <div
      class="wf_height-41 wf_flex wf-space-x-12 wf-bg--g-f-5-f-6-fa wf-px-10 wf_items-center"
      :class="[{ 'wf-mb-19': props.isButtonStateDelivery, 'wf-mb-21': !props.isButtonStateDelivery }]"
    >
      <p class="wf-font_13--mid wf-color--g-111">배송지</p>
      <p class="wf-color--g-555 wf-font_13--reg">홍길동 &nbsp;서울 마포구 상암산로 34</p>
    </div>
    <div class="wf_height-31 wf_flex wf_items-center wf-mb-10 wf_justify-between">
      <span class="wf-color--f-95729 wf-font_15--mid">{{ product?.deliveryName }}</span>
      <WelfareButtonLine class="wf_width-62" v-if="props.isButtonStateDelivery" type="sm" text="배송현황" />
    </div>
    <WelfareUnitCard @update:checked="handleChangeCheckBox" :isDeliveryPage="props.isDeliveryPage" :product="$props.product">
      <template #footer>
        <div class="wf-mt-10">
          <p class="wf-font_13--reg wf-color--g-999">반품상품</p>
        </div>
        <div v-if="props.isButtonOption" class="wf-mt-16 wf_flex wf_justify-end wf-space-x-5">
          <WelfareButtonLine class="wf_width-69" smSate type="sm" text="옵션변경" />
          <WelfareButtonLine class="wf_width-69" smSate type="sm" text="주문취소" />
        </div>
      </template>
    </WelfareUnitCard>
  </div>
</template>
