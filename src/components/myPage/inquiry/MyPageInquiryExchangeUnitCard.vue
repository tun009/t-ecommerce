<script setup lang="ts">
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTextarea from '@/components/uikit/input/WelfareTextarea.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import { OrderCartGroupDeliveryAddressModel } from '@/models/views/order/OrderProductPageModel'

interface MyPageInquiryExchangeUnitCardProps {
  data?: OrderCartGroupDeliveryAddressModel[]
}

const props = defineProps<MyPageInquiryExchangeUnitCardProps>()
</script>

<template>
  <WelfareBox>
    <div class="border-bb-777">
      <p class="wf_text-center">{{ $t('myPage.inquiryExchangeRequest.orderNumberTitle') }}</p>
      <div v-for="(item,index) in props.data?.[0].products" :key="index">
        <WelfareUnitCard :product="item.product" is-check-box />
        <p class="wf-font_17--bold wf-mb-19">{{ $t('myPage.inquiryExchangeRequest.reasonForExchangeTitle')}}</p>
        <div class="wf_flex wf-space-y-10-i wf-space-x-8--i wf_flex-wrap">
          <WelfareButtonLine class="wf-px-21-i wf_height-39" md-state="line" type="md" :text="$t('myPage.inquiryExchangeRequest.reasonForExchange1')" />
          <WelfareButtonLine class="wf-px-14-i wf_height-39" md-state="line" type="md" :text="$t('myPage.inquiryExchangeRequest.reasonForExchange2')" />
          <WelfareButtonLine class="wf-px-5-i wf_height-39" md-state="line" type="md" :text="$t('myPage.inquiryExchangeRequest.reasonForExchange3')" />
          <WelfareButtonLine class="wf-px-9-i wf_height-39" md-state="line" type="md" :text="$t('myPage.inquiryExchangeRequest.reasonForExchange4')" />
          <WelfareButtonLine class="wf_height-39" md-state="line" type="md" :text="$t('myPage.inquiryExchangeRequest.reasonForExchange5')" />
        </div>
        <WelfareTextarea class="wf-mt-8 wf_height-68" :placeholder="$t('myPage.inquiryWrite.placeholder2')" />
      </div>
    </div>
  </WelfareBox>
</template>
