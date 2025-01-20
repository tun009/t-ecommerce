<script setup lang="ts">
import { computed, ref } from 'vue'
import IconArrowDown from '../icons/IconArrowDown.vue'
import WelfareViewPrice from '../uikit/product/WelfareViewPrice.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
import WelfareExpander from '../widgets/common/WelfareExpander.vue'
import GroupPriceDiscount from './OrderGroupPriceDiscount.vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'
import { getNumberMoney } from '@/commons'
interface GroupOrderPriceDiscountEmit {
  (e: 'update:disabledPoint', value: boolean): void
  (e: 'open-info-price-discount'): void
  (e: 'view-click-coupon'): void
  (e: 'lump-sum-questions'): void
}

interface GroupOrderPriceDiscountProps {
  instantDiscount: number
  lumpSumDiscount?: number
  couponDiscount: number
  disabledPoint: boolean
}

const props = defineProps<GroupOrderPriceDiscountProps>()

const emits = defineEmits<GroupOrderPriceDiscountEmit>()

const refExpander = ref()

const totalDiscount = computed(() => {
  return props?.couponDiscount + props.instantDiscount + (props.disabledPoint ? getNumberMoney(props.lumpSumDiscount) : 0)
})
</script>
<template>
  <WelfareBox :is-padding-vertical="false" class="wf-pt-17 wf-pb-20">
    <WelfareExpander ref="refExpander" :default-expander="true">
      <template #button="{ isExpander }">
        <ProductOrderTitle @click="refExpander?.handleToggleExpander" title="cardOrder.discount.title">
          <div class="wf_flex wf_items-center wf-space-x-2">
            <WelfareViewPrice :price="totalDiscount" class="wf-font_14-reg--lh130" class-price="wf-font_17--bold" />
            <span class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
              <IconArrowDown />
            </span>
          </div>
        </ProductOrderTitle>
      </template>
      <div class="wf_flex wf_flex-col wf-mt-18 wf-space-y-20">
        <GroupPriceDiscount
          :price="props.instantDiscount"
          @question-click="emits('open-info-price-discount')"
          display-question
          text="cardOrder.discount.instant"
        />
        <!-- <GroupPriceDiscount
          v-if="props.lumpSumDiscount !== undefined"
          :checked="props.disabledPoint"
          @update:checked="(checked) => emits('update:disabledPoint', checked)"
          :price="props.lumpSumDiscount"
          display-question
          @question-click="emits('lump-sum-questions')"
          display-check-box
          text="cardOrder.discount.lumpSum"
        /> -->
        <GroupPriceDiscount :price="props.couponDiscount" @view-click="emits('view-click-coupon')" display-btn text="cardOrder.discount.coupon" />
      </div>
    </WelfareExpander>
  </WelfareBox>
</template>
