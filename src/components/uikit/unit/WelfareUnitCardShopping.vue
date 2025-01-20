<script setup lang="ts">
import { WelfareUnitCardEmits, WelfareUnitCardStateDeliveryProps } from '@/models/uikits/WelfareUnitCardTypes'
import WelfareButtonLine from '../button/WelfareButtonLine.vue'
import WelfareUnitCard from './WelfareUnitCard.vue'

const props = defineProps<WelfareUnitCardStateDeliveryProps>()
const emits = defineEmits<WelfareUnitCardEmits>()
const handleChangeCheckBox = (value: boolean) => {
  emits('update:checked', value)
}
</script>
<template>
  <div>
    <WelfareUnitCard
      :product="$props.product"
      :checked="props.checked"
      :is-delivery-page="props.isDeliveryPage"
      @update:checked="handleChangeCheckBox"
      is-check-box
      is-show-delete
    >
      <template #footer>
        <div class="wf-mt-15 wf_flex-col wf-space-y-8 wf_flex">
          <p class="wf-font_13--reg wf-color--g-999">무이자 6개월</p>
          <p class="wf-font_13--reg wf-color--g-999">일시불할인</p>
          <p class="wf-font_13--reg wf-color--g-999">청구할인 : 현대 7%, 삼성 5%, NH농협 3%</p>
        </div>
        <div class="wf-mt-11 wf_flex wf_justify-end wf-space-x-7">
          <WelfareButtonLine class="wf_flex-1" smSate type="sm" text="옵션/수량 변경" />
          <WelfareButtonLine class="wf_flex-1" active smSate type="sm" text="바로구매" />
        </div>
      </template>
    </WelfareUnitCard>
  </div>
</template>
