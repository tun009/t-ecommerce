<script setup lang="ts">
import { ref } from 'vue'
import IconArrowDown from '../icons/IconArrowDown.vue'
import WelfareViewPrice from '../uikit/product/WelfareViewPrice.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
import WelfareExpander from '../widgets/common/WelfareExpander.vue'
import WelfareNoteText from '../widgets/common/WelfareNoteText.vue'
import GroupPriceDiscount from './OrderGroupPriceDiscount.vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'

interface GroupOrderPricePaymentProps {
  totalPriceBeforeDiscount: number
  costDelivery: number
  totalPriceDiscount: number
  priceSavePoint: number
  totalPricePayment: number
  discounts?: { title: string; value: number }[]
  usePointDiscounts?: { title: string; value: number }[]
  isShowHintPayment?: boolean
}

const props = defineProps<GroupOrderPricePaymentProps>()

const refExpander = ref()
</script>
<template>
  <div>
    <WelfareBox :is-padding-horizontal="false">
      <WelfareExpander ref="refExpander" :default-expander="true">
        <template #button="{ isExpander }">
          <ProductOrderTitle class="wf-px-16" @click="refExpander?.handleToggleExpander" title="cardOrder.pricePayment.title">
            <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
              <IconArrowDown />
            </div>
          </ProductOrderTitle>
        </template>
        <div class="wf-pb-20 wf-pt-18 wf-px-16 wf-br-b-1 wf-br--g-e-7 wf_flex wf_flex-col wf-space-y-20">
          <GroupPriceDiscount :price="props.totalPriceBeforeDiscount" text="cardOrder.pricePayment.amountProduct" />
          <GroupPriceDiscount :price="props?.costDelivery" text="cardOrder.pricePayment.fee" />
          <div class="wf_width-full">
            <div class="wf_flex wf_items-center wf-mt--1 wf_justify-between">
              <span class="wf-font_15--reg wf-color--g-333">{{ $t('cardOrder.pricePayment.amountDiscount') }}</span>

              <WelfareViewPrice
                :price="props?.totalPriceDiscount"
                :is-minus="props?.totalPriceDiscount > 0"
                class="wf-font_14-reg--lh130 wf-color_i--f-95729"
                class-price="wf-font_15--bold "
              />
            </div>
            <div class="wf-mt-7 wf-mb--6" v-if="props.discounts">
              <div
                class="wf_flex wf_items-center wf_justify-between wf-mt-3"
                v-for="(itemDiscount, itemIndex) in props.discounts"
                v-bind:key="itemIndex"
              >
                <span class="wf-font_13--reg-p wf-color--g-555">ㄴ {{ itemDiscount.title }}</span>
                <WelfareViewPrice
                  :price="itemDiscount.value"
                  :is-minus="itemDiscount.value > 0"
                  class="wf-space-x-0--i wf-color_i--f-95729"
                  class-price="wf-font_13--reg-p-7"
                />
              </div>
            </div>
          </div>
          <div class="wf_width-full">
            <div class="wf_flex wf_items-center wf_justify-between">
              <span class="wf-font_15--reg wf-color--g-333">{{
                $t(props.isShowHintPayment ? 'cardOrder.pricePayment.usePoint' : 'cardOrder.pricePayment.usePointComplete')
              }}</span>

              <WelfareViewPrice
                :price="props?.priceSavePoint"
                :is-minus="props?.priceSavePoint > 0"
                class="wf-font_14-reg--lh130 wf-color_i--f-95729"
                class-price="wf-font_15--bold"
              />
            </div>
            <div class="wf-mt-7 wf-mb--6" v-if="props.usePointDiscounts">
              <div
                class="wf_flex wf_items-center wf_justify-between wf-mt-3"
                v-for="(itemPointDiscount, itemIndex) in props.usePointDiscounts"
                v-bind:key="itemIndex"
              >
                <span class="wf-font_13--reg-p wf-color--g-333">ㄴ {{ itemPointDiscount.title }}</span>
                <WelfareViewPrice
                  :price="itemPointDiscount.value"
                  :is-minus="itemPointDiscount.value > 0"
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
          <WelfareViewPrice :price="props?.totalPricePayment" class="wf-font_15--mid wf-color_i--f-95729" class-price="wf-font_23--bold" />
        </div>
        <div class="wf-ml--1" v-if="props.isShowHintPayment">
          <WelfareNoteText text="cardOrder.pricePayment.notes.item1" />
          <WelfareNoteText text="cardOrder.pricePayment.notes.item2" />
        </div>
      </div>
    </WelfareBox>
  </div>
</template>
