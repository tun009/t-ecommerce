<script setup lang="ts">
import { isAndroid, isIos } from '@/commons'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { OrderBankPaymentModel } from '@/models/views/order/OrderProductPageModel'
import { computed } from 'vue'
import WelfareCheckbox from '../uikit/input/WelfareCheckbox.vue'
import WelfareSelect from '../uikit/select/WelfareSelect.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'
import { PayMethod } from '@/models/common'

interface GroupOrderBankPaymentProps {
  paymentMethodUseAgain: boolean
  switchMethodPaymentRadio: boolean
  currentBank: PayMethod | undefined
  installmentMonthSelect: any
  methodPaymentSelect: WelfareSelectDataModel | undefined
  dataBanks: OrderBankPaymentModel[]
  optionsInstallmentMonthSelect: any
  optionsPaymentMethod: any
  disabledPoint?: boolean
}
interface GroupOrderBankPaymentEmits {
  (e: 'update:paymentMethodUseAgain', value: any): void
  (e: 'update:switchMethodPaymentRadio', value: any): void
  (e: 'update:installmentMonthSelect', value: any): void
  (e: 'update:methodPaymentSelect', value: any): void
  (e: 'update:currentBank', value: any): void
  (e: 'click-bank', value: PayMethod | undefined, callback: () => void): void
}

const props = defineProps<GroupOrderBankPaymentProps>()
const emits = defineEmits<GroupOrderBankPaymentEmits>()

const currentBankList = computed(() => {
  return props.dataBanks.find((item) => item.value == props.currentBank)
})
</script>

<template>
  <WelfareBox id="wf-bank-order">
    <ProductOrderTitle title="cardOrder.paymentMethod.title">
      <div class="wf_flex wf-space-x-6 wf_items-center">
        <WelfareCheckbox
          inputId="payment"
          :model-value="props.paymentMethodUseAgain"
          @update:model-value="(value) => emits('update:paymentMethodUseAgain', value)"
        />
        <label for="payment" class="wf-color--g-333 wf-font_15--reg">{{ $t('cardOrder.paymentMethod.usePaymentMethodAgain') }}</label>
      </div>
    </ProductOrderTitle>
    <div class="wf-pt-20">
      <div>
        <div class="wf-py-20 wf_flex wf-space-x-10 wf-space-y-10 wf_flex-wrap">
          <template v-for="(item, index) in dataBanks" :key="index">
            <div
              @click="
                emits('click-bank', item.value, () => {
                  emits('update:currentBank', item.value)
                })
              "
              v-if="(!isAndroid && !isIos) || ((item.value !== PayMethod.Samsung || isAndroid) && (item.value !== PayMethod.ApplePay || isIos))"
              class="wf_width-78 wf_height-50 wf-br-1 wf-font_13--bold wf_flex wf_items-center wf_justify-center"
              :class="[
                { 'wf-br--g-primary wf-color-primary': currentBank === item.value, 'wf-br--g-e-7 wf-color--g-777': currentBank !== item.value }
              ]"
            >
              <img
                v-if="item?.image"
                class="wf-bg--g-fff wf_width-auto wf_height-auto wf_max-w-parent wf_max-h-parent"
                :src="item?.image"
                :alt="item?.name"
              />
              <span v-if="item?.name">{{ $t(item?.name) }}</span>
            </div>
          </template>
        </div>
        <div v-if="currentBank === PayMethod.Card">
          <WelfareSelect
            optionLabel="label"
            placeholder="카드를 선택해주세요."
            :model-value="props.methodPaymentSelect"
            @update:model-value="(value) => emits('update:methodPaymentSelect', value)"
            :options="optionsPaymentMethod"
          />
          <WelfareSelect
            :disabled="!props.methodPaymentSelect"
            class="wf-mt-12"
            :model-value="props.installmentMonthSelect"
            @update:model-value="(value) => emits('update:installmentMonthSelect', value)"
            optionLabel="label"
            :options="optionsInstallmentMonthSelect"
            placeholder="카드를 선택해주세요."
          />
        </div>
        <div v-if="currentBankList?.notes" class="wf-mt-20">
          <p class="wf-font_13--mid wf-color--g-555 wf_letter-spacing--1-2">{{ currentBankList?.notes?.title }}</p>
          <div v-for="(item, index) in currentBankList?.notes.list" :key="index">
            <div class="wf_flex wf-font_13--reg wf-color--g-555 wf-space-x-2 wf-mt-10">
              <span>•</span> {{ typeof item === 'string' ? item : item.title }}
            </div>
            <div v-if="typeof item !== 'string' && item?.list" class="wf-ml-8">
              <div v-for="(_item, _index) in item?.list" :key="_index" class="wf_flex wf-font_13-reg--lh130 wf-color--g-555 wf-space-x-2 wf-mt-9">
                <span>-</span> {{ _item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </WelfareBox>
</template>
