<script setup lang="ts">
import { splitPhoneNumber } from '@/commons'

interface Props {
  orderName: string
  senderMessage: string
  phoneNumber: string
  receiverName: string
}
const props = defineProps<Props>()
</script>
<template>
  <div>
    <div class="wf_flex wf_items-center wf_justify-between">
      <p class="wf-font_15--bold wf-color--g-333">
        {{ props.receiverName }} <span class="wf-font_15--mid">({{ $t('myPage.eCouponOrderDetail.senderName') }} : {{ props.orderName }})</span>
      </p>
    </div>
    <div class="wf-mt-15 wf-font_15--reg wf-color--g-999 wf_width-225">
      <div class="wf_flex wf-mt-16 wf-mb-12">
        <span class="wf-font_13--reg">{{ splitPhoneNumber(props.phoneNumber) }}</span>
      </div>
      <p class="wf-mt-8 wf-color--g-333">{{ props.senderMessage }}</p>
    </div>
  </div>
</template>
