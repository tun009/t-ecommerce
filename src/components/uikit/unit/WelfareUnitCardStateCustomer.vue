<script setup lang="ts">
import { WelfareUnitCardStateCustomerProps } from '@/models/uikits/WelfareUnitCardTypes'
import WelfareUnitCard from './WelfareUnitCard.vue'

defineProps<WelfareUnitCardStateCustomerProps>()
</script>
<template>
  <div>
    <WelfareUnitCard :product="$props.product">
      <template #footer>
        <div class="wf-mt-13">
          <!-- <p class="wf-font_13--reg wf-color--red-ff-3-b-4-f">11/19(토) 이내 배송 예정</p> -->
        </div>
      </template>
    </WelfareUnitCard>
  </div>
</template>
