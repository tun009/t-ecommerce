<script lang="ts" setup>
import { getNumberMoney } from '@/commons/common'
import { computed, ref } from 'vue'
import IconArrowDown from '../icons/IconArrowDown.vue'
import WelfareViewPrice from '../uikit/product/WelfareViewPrice.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
import WelfareExpander from '../widgets/common/WelfareExpander.vue'
import GroupPriceDiscount from './OrderGroupPriceDiscount.vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'
import { ProductVoucher } from '@/models/uikits/WelfareUnitCardTypes'

interface GroupOrderPriceDiscountPointProps {
  disabled?: boolean
  welPointInput?: number
  pointInput?: number
  savePointInput?: number
  welfarePointCheckBox: boolean
  pointCheckbox: boolean
  savePointCheckbox: boolean
  disabledSavePoint?: boolean
  dataVoucher?: ProductVoucher
}

interface GroupOrderPriceDiscountPointEmits {
  (e: 'update:welPointInput', value: any): void
  (e: 'update:pointInput', value: any): void
  (e: 'update:savePointInput', value: any): void
  (e: 'update:welfarePointCheckBox', value: any): void
  (e: 'update:pointCheckbox', value: any): void
  (e: 'update:savePointCheckbox', value: any): void
  (e: 'click-save-point'): void
}

const props = defineProps<GroupOrderPriceDiscountPointProps>()
const emits = defineEmits<GroupOrderPriceDiscountPointEmits>()
const refExpander = ref()
const totalDiscount = computed(() => {
  return getNumberMoney(props.welPointInput)
})
</script>

<template>
  <WelfareBox>
    <WelfareExpander ref="refExpander" :default-expander="true">
      <template #button="{ isExpander }">
        <ProductOrderTitle class="wf-mt--2" @click="refExpander?.handleToggleExpander" title="cardOrder.savePoint.title">
          <div class="wf_flex wf_items-center wf-space-x-2">
            <WelfareViewPrice :price="totalDiscount" class="wf-font_14-reg--lh130" class-price="wf-font_17--bold" />
            <span class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
              <IconArrowDown />
            </span>
          </div>
        </ProductOrderTitle>
      </template>
      <div class="wf_flex wf_flex-col wf-mt-18 wf-space-y-10">
        <GroupPriceDiscount
          :inputValue="props.welPointInput"
          @update:input-value="(value) => emits('update:welPointInput', value)"
          @update:checked="(value) => emits('update:welfarePointCheckBox', value)"
          :sub-price="dataVoucher?.welPointInput ?? 0"
          display-check-box
          display-input
          :checked="props.welfarePointCheckBox"
          text="cardOrder.savePoint.welPoint"
          :disabled="props.disabled || (dataVoucher?.welPointInput ?? 0) <= 0"
        />
        <!-- SPECT-OUT -->
        <!-- <GroupPriceDiscount
          :sub-price="45000"
          :inputValue="props.pointInput"
          @update:input-value="(value) => emits('update:pointInput', value)"
          @update:checked="(value) => emits('update:pointCheckbox', value)"
          display-input
          display-question
          display-check-box
          display-sub-price
          :checked="props.pointCheckbox"
          text="cardOrder.savePoint.point"
          @question-click="emits('click-save-point')"
          :disabled="props.disabled || props?.disabledSavePoint"
        />
        <GroupPriceDiscount
          :inputValue="props.savePointInput"
          @update:input-value="(value) => emits('update:savePointInput', value)"
          @update:checked="(value) => emits('update:savePointCheckbox', value)"
          :sub-price="87900"
          display-input
          display-question
          display-check-box
          display-sub-price
          :checked="props.savePointCheckbox"
          text="cardOrder.savePoint.reserve"
          :disabled="props.disabled"
        /> -->
      </div>
    </WelfareExpander>
    <slot></slot>
  </WelfareBox>
</template>
