<script setup lang="ts">
import { formatNumberDot } from '@/commons'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import { useI18n } from 'vue-i18n'
interface CartDescriptionAndBriefPaymentInfoProps {
  totalShippingCost: number
  totalPaymentWithoutShippingCost: number
  hideCost?: boolean
}
const { t } = useI18n()
let descriptions = [
  {
    title: t('cart.description.information.title'),
    list: [t('cart.description.information.list.first'), t('cart.description.information.list.second')]
  }
  // ,
  // {
  //   title: t('cart.description.interest.title'),
  //   list: [t('cart.description.interest.list.first')]
  // }
]
const props = defineProps<CartDescriptionAndBriefPaymentInfoProps>()
</script>

<template>
  <div class="wf-py-20 wf-px-16 wf-bg--3-f-5-f-6-fa wf_flex wf_justify-between" v-if="!props.hideCost">
    <div>
      <span class="wf-font_15--reg"> {{ `${formatNumberDot(props.totalPaymentWithoutShippingCost)} ${t('common.won')}` }}</span>
      <span v-if="props.totalShippingCost">{{
        ` + ${t('cart.payment.paymentShippingCost')} ${formatNumberDot(props.totalShippingCost)} ${t('common.won')}`
      }}</span>
    </div>
    <div class="wf-font_15--bold">
      {{ `${formatNumberDot(props.totalPaymentWithoutShippingCost + props.totalShippingCost)} ${t('common.won')}` }}
    </div>
  </div>
  <div class="wf-border-width-b-1 wf-br--g-e-7" v-if="props.hideCost"></div>
  <WelfareBox>
    <div v-for="(description, index) in descriptions" :key="description.title" :class="[{ 'wf-mb-20': index == 0 }]">
      <div class="wf-font_15--bold">{{ description.title }}</div>
      <div class="wf-color--g-777 wf-mt-15 wf_flex wf_flex-col">
        <div class="wf_flex wf-flex-row" v-for="item in description.list" :key="item">
          <span class="wf-mr-4 wf-color--g-bbb wf-mt--1">•</span>
          <div class="wf-font_13--mid">{{ item }}</div>
        </div>
      </div>
    </div>
  </WelfareBox>
</template>
