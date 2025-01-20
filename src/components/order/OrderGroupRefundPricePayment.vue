<script setup lang="ts">
import { ref } from 'vue'
import IconArrowDown from '../icons/IconArrowDown.vue'
import WelfareViewPrice from '../uikit/product/WelfareViewPrice.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
import WelfareExpander from '../widgets/common/WelfareExpander.vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'

interface OrderGroupRefundPricePaymentProps {
  deposit?: number
  reserves?: number
  welfarePoints: number
  payingCreditCard: number
  totalRefund: number
  hiddenDeposit?: boolean
  hiddenReserves?: boolean
}

const props = defineProps<OrderGroupRefundPricePaymentProps>()

const refExpander = ref()
</script>
<template>
  <div>
    <WelfareBox :is-padding-horizontal="false">
      <WelfareExpander ref="refExpander">
        <template #button="{ isExpander }">
          <ProductOrderTitle class="wf-px-16" @click="refExpander?.handleToggleExpander" title="myPage.orderDetail.refundPrice.title">
            <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
              <IconArrowDown />
            </div>
          </ProductOrderTitle>
        </template>
        <div class="wf-pb-20 wf-pt-18 wf-px-16 wf-br-b-1 wf-br--g-e-7 wf_flex wf_flex-col wf-space-y-20">
          <div class="wf_width-full">
            <div class="wf_flex wf_items-center wf-mt--1 wf_justify-between">
              <span class="wf-font_15--reg wf-color--g-333">{{ $t('myPage.orderDetail.refundPrice.welfarePoints') }}</span>

              <WelfareViewPrice
                :price="props?.welfarePoints"
                :is-minus="false"
                class="wf-font_14-reg--lh130 wf-color_i--f-95729"
                class-price="wf-font_15--bold "
              />
            </div>
          </div>
          <div class="wf_width-full">
            <div class="wf_flex wf_items-center wf_justify-between">
              <span class="wf-font_15--reg wf-color--g-333">{{ $t('myPage.orderDetail.refundPrice.payingCreditCard') }}</span>

              <WelfareViewPrice
                :price="props?.payingCreditCard"
                :is-minus="false"
                class="wf-font_14-reg--lh130 wf-color_i--f-95729"
                class-price="wf-font_15--bold"
              />
            </div>
          </div>
        </div>
      </WelfareExpander>
      <div class="wf-px-16">
        <div class="wf_flex wf-pt-20 wf_items-center wf_justify-between">
          <span class="wf-font_15--bold wf-color--g-111">{{ $t('myPage.orderDetail.refundPrice.expectedRefund') }}</span>
          <WelfareViewPrice :price="props?.totalRefund" class="wf-font_15--mid wf-color_i--f-95729" class-price="wf-font_23--bold" />
        </div>
      </div>
    </WelfareBox>
  </div>
</template>
