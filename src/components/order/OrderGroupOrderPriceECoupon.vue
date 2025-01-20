<script setup lang="ts">
import { ref, computed } from 'vue'
import IconArrowDown from '../icons/IconArrowDown.vue'
import WelfareViewPrice from '../uikit/product/WelfareViewPrice.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
import WelfareExpander from '../widgets/common/WelfareExpander.vue'
import GroupPriceDiscount from './OrderGroupPriceDiscount.vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'

interface GroupOrderPriceECouponProps {
  orderAmount: number
  totalProductAmount: number
  orderDeliveryAmount: number
  immediatelyDiscountAmount: number
  couponDiscountAmount: number
  welfarePointPaymentAmount: number
}

const props = defineProps<GroupOrderPriceECouponProps>()

const refExpander = ref()

const totalDiscountAmount = computed(() => {
  return props.immediatelyDiscountAmount + props.couponDiscountAmount 
})
</script>
<template>
  <div>
    <WelfareBox :is-padding-horizontal="false">
      <WelfareExpander ref="refExpander">
        <template #button="{ isExpander }">
          <ProductOrderTitle class="wf-px-16" @click="refExpander?.handleToggleExpander" title="cardOrder.pricePayment.title">
            <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
              <IconArrowDown />
            </div>
          </ProductOrderTitle>
        </template>
        <div class="wf-pb-20 wf-pt-18 wf-px-16 wf-br-b-1 wf-br--g-e-7 wf_flex wf_flex-col wf-space-y-20">
          <GroupPriceDiscount :price="props.totalProductAmount" text="cardOrder.pricePayment.amountProduct" />
          <GroupPriceDiscount :price="props.orderDeliveryAmount" text="cardOrder.pricePayment.fee" />
          <div class="wf_width-full">
            <div class="wf_flex wf_items-center wf-mt--1 wf_justify-between">
              <span class="wf-font_15--reg wf-color--g-333">{{ $t('cardOrder.pricePayment.amountDiscount') }}</span>
              <WelfareViewPrice
                :price="totalDiscountAmount"
                :is-minus="true"
                class="wf-font_14-reg--lh130 wf-color_i--f-95729"
                class-price="wf-font_15--bold "
              />
            </div>
            <div class="wf-mt-7 wf-mb--6">
              <div class="wf_flex wf_items-center wf_justify-between wf-mt-3">
                <span class="wf-font_13--reg-p wf-color--g-555">ㄴ {{ $t('cardOrder.pricePayment.immediatelyDiscountAmount') }}</span>
                <WelfareViewPrice
                  :price="props.immediatelyDiscountAmount"
                  :is-minus="true"
                  class="wf-space-x-0--i wf-color_i--f-95729"
                  class-price="wf-font_13--reg-p-7"
                />
              </div>
              <div class="wf_flex wf_items-center wf_justify-between wf-mt-3">
                <span class="wf-font_13--reg-p wf-color--g-555">ㄴ {{ $t('cardOrder.pricePayment.couponDiscountAmount') }}</span>
                <WelfareViewPrice
                  :price="props.couponDiscountAmount"
                  :is-minus="true"
                  class="wf-space-x-0--i wf-color_i--f-95729"
                  class-price="wf-font_13--reg-p-7"
                />
              </div>
            </div>
          </div>
          <div class="wf_width-full">
            <div class="wf_flex wf_items-center wf_justify-between">
              <span class="wf-font_15--reg wf-color--g-333">{{ $t('cardOrder.pricePayment.usePoint') }}</span>

              <WelfareViewPrice :price="props.welfarePointPaymentAmount" :is-minus="true" class="wf-font_14-reg--lh130 wf-color_i--f-95729" class-price="wf-font_15--bold" />
            </div>
            <div class="wf-mt-7 wf-mb--6">
              <div class="wf_flex wf_items-center wf_justify-between wf-mt-3">
                <span class="wf-font_13--reg-p wf-color--g-333">ㄴ {{ $t('cardOrder.pricePayment.welfarePointPaymentAmount') }}</span>
                <WelfareViewPrice
                  :price="props.welfarePointPaymentAmount"
                  :is-minus="true"
                  class="wf-space-x-0--i wf-color_i--f-95729"
                  class-price="wf-font_13--reg-p-7"
                />
              </div>
            </div>
          </div>
        </div>
      </WelfareExpander>
      <div class="wf-px-16">
        <div class="wf_flex wf-py-20 wf_items-center wf_justify-between">
          <span class="wf-font_15--bold wf-color--g-111">{{ $t('cardOrder.pricePayment.totalPrice') }}</span>

          <WelfareViewPrice :price="props.orderAmount" class="wf-font_15--mid wf-color_i--f-95729" class-price="wf-font_23--bold" />
        </div>
      </div>
    </WelfareBox>
  </div>
</template>
