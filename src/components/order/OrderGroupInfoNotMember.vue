<script setup lang="ts">
import { WelfareInput } from '@/components/uikit/input'
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import {
  OrderProductCustomerDeliveryAddressModel,
  orderProductListOptionTailEmail,
  orderProductOptionsAdress
} from '@/models/views/order/OrderProductPageModel'
import WelfareLineHorizontal from '../widgets/common/WelfareLineHorizontal.vue'
import OrderGroupEnterPhone from './OrderGroupEnterPhone.vue'
import OrderProductDeliveryNew from './OrderProductDeliveryNew.vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'
import { CODE_TEL_LIST } from '@/commons'

interface Props {
  infoInComing: {
    name: string
    phone: string
    emailStart: string
    emailEnd: string | undefined
    prefix: string | undefined
  }
  currentAddress: OrderProductCustomerDeliveryAddressModel
  valueMessageAddress: string
  messageAdress: string
  isUseData: boolean
}

interface Emits {
  (e: 'update:currentAddress', data: OrderProductCustomerDeliveryAddressModel): void
  (e: 'update:valueMessageAddress', value: any): void
  (e: 'update:messageAdress', value: any): void
  (e: 'update:infoInComing', value: any): void
  (e: 'update:isUseData', value: boolean): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()
</script>
<template>
  <div class="wf-mt--2">
    <WelfareBox>
      <ProductOrderTitle title="주문자정보"></ProductOrderTitle>
      <div class="wf-mt-20 wf_flex wf_flex-col wf-space-y-20">
        <WelfareInput :modelValue="props.infoInComing.name" disabled :clearText="false" :title="$t('cardOrder.orderInfoOrderer.orderer')" required />
        <div>
          <OrderGroupEnterPhone
            class="wf-space-y-9--i"
            disabled
            title="주문자 연락처 "
            :phone="props.infoInComing.phone"
            :optionContact="CODE_TEL_LIST"
            :prefix="props.infoInComing.prefix"
          />
        </div>
        <div>
          <WelfareInput
            :model-value="props.infoInComing.emailStart"
            @update:model-value="(value) => emits('update:infoInComing', { ...props.infoInComing, emailStart: value })"
            classWrap="wf_flex wf-space-x-10 wf_items-center"
            type="email"
            required
            :clear-text="false"
            class="wf-space-y-9--i"
            classWrapInput="wf_max-width-142"
            title="주문자 이메일"
          >
            <template #suffix>
              <span>@</span>
              <WelfareSelect
                placeholder="직접입력"
                :model-value="props.infoInComing.emailEnd"
                @update:model-value="(value) => emits('update:infoInComing', { ...props.infoInComing, emailEnd: value })"
                class="wf_flex-1"
                :options="orderProductListOptionTailEmail"
              />
            </template>
          </WelfareInput>
        </div>
      </div>
    </WelfareBox>
    <WelfareLineHorizontal />
    <WelfareBox>
      <ProductOrderTitle title="배송정보">
        <div class="wf_flex wf-space-x-6 wf_items-center">
          <WelfareCheckbox
            :model-value="props.isUseData"
            @update:model-value="(value) => emits('update:isUseData', value)"
            inputId="multi-delivery-id"
          />
          <label for="multi-delivery-id" class="wf-color--g-333 wf-font_15--reg wf_letter-spacing--0-7">주문자와 동일</label>
        </div>
      </ProductOrderTitle>
      <OrderProductDeliveryNew
        class="wf-mt-20"
        :gapWrapForm="20"
        :isHiddenTypeDelivery="true"
        :currentAddress="props.currentAddress"
        @update:current-address="(data) => emits('update:currentAddress', data)"
        :isHiddenAddressCheckboxDefault="true"
      />
      <div class="wf_flex wf-mt-20 wf_flex-col wf-space-y-10">
        <WelfareSelect
          :model-value="props?.valueMessageAddress"
          @update:model-value="(value) => emits('update:valueMessageAddress', value)"
          :options="orderProductOptionsAdress"
          :placeholder="$t('cardOrder.messageAdressPlaceholder')"
        />
        <WelfareInput
          v-if="valueMessageAddress === '직접입력'"
          :model-value="props?.messageAdress"
          @update:model-value="(value) => emits('update:messageAdress', value)"
          :placeholder="$t('cardOrder.inputMessagePlaceholder')"
          :maxLength="20"
          :clear-text="false"
        />
        <ul class="wf_flex wf_flex-col wf-font_13--reg wf-space-y-10">
          <li class="wf_flex wf-space-x-3 wf-color--g-777">
            <span class="wf-color--g-bbb wf-ml--1">•</span><span>{{ $t('cardOrder.deliveryNotes.item1') }}</span>
          </li>
          <li class="wf_flex wf-space-x-3 wf_items-start wf-font_13-reg--lh130 wf-color--g-777">
            <span class="wf-color--g-bbb wf-ml--1">•</span>
            <div v-html="$t('cardOrder.deliveryNotes.item2')" />
          </li>
        </ul>
      </div>
    </WelfareBox>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/_welfare-order-info-not-member.scss');
</style>
