<script setup lang="ts">
import {
  OrderProductStateAddress,
  orderProductMessageAddressDeliveryOptions,
  OrderProductMessageAddressDeliveryEnum
} from '@/models/views/order/OrderProductPageModel'
import IconArrowRight from '../icons/IconArrowRight.vue'
import IconQuestionGreyCircle from '../icons/IconQuestionGreyCircle.vue'
import WelfareInput from '../uikit/input/WelfareInput.vue'
import WelfareSelect from '../uikit/select/WelfareSelect.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
import OrderProductDeliveryAdressDefault from './OrderProductDeliveryAdressDefault.vue'
import OrderProductDeliveryNew from './OrderProductDeliveryNew.vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import TextInputWithMaxLengthCharacters from '../widgets/input/TextInputWithMaxLengthCharacters.vue'

interface GroupProductDeliveryAddressProps {
  multiAddressDeliveryCheckbox?: boolean
  isShowMultiCheckBox?: boolean
  valueMessageAddress: OrderProductMessageAddressDeliveryEnum | undefined
  messageAdress: string
  inputNameCustomer: string
  stateAddress: OrderProductStateAddress
  currentAddress: DeliveryAddressModel
  newAddress: DeliveryAddressModel
  defaultAddressDelivery: DeliveryAddressModel | undefined
  listDeliveryAddress: DeliveryAddressModel[]
  countCartDelivery?: number
  index?: number
  isWrapBox?: boolean
  showTitleDeliveryOrder?: boolean
  isModal?: boolean
  nonMember?: boolean
}

interface GroupProductDeliveryAddressEmits {
  (e: 'update:valueMessageAddress', value: any): void
  (e: 'update:messageAdress', value: any): void
  (e: 'update:inputNameCustomer', value: any): void
  (e: 'update:stateAddress', value: any): void
  (e: 'update:currentAddress', data: DeliveryAddressModel): void
  (e: 'update:newAddress', data: DeliveryAddressModel): void
  (e: 'listen-choose-address', value: boolean): void
  (e: 'open-modal-choose-address'): void
  (e: 'open-list-address'): void
}

const props = withDefaults(defineProps<GroupProductDeliveryAddressProps>(), {
  isShowMultiCheckBox: true,
  isWrapBox: true,
  showTitleDeliveryOrder: true
})
const emits = defineEmits<GroupProductDeliveryAddressEmits>()

const listButtonAdress: { state: OrderProductStateAddress; name: string }[] = [
  {
    state: 'default',
    name: 'cardOrder.btnDelivery.default'
  },
  {
    state: 'new',
    name: 'cardOrder.btnDelivery.new'
  },
  {
    state: 'list',
    name: 'cardOrder.btnDelivery.list'
  }
]

const handleClickButtonTypeAddress = (state: OrderProductStateAddress) => {
  emits('update:stateAddress', state)
  if (state === 'list') {
    emits('open-list-address')
  }
}
// const listenChooseAddress = (value: boolean) => {
//   emits('listen-choose-address', value)
// }
</script>

<template>
  <WelfareBox id="wf-address-order" :is-padding-horizontal="props.isWrapBox" :is-padding-vertical="props.isWrapBox">
    <ProductOrderTitle :title="`cardOrder.titleDeliveryOrder`" :options="{ index }" v-if="props.showTitleDeliveryOrder" />
    <div v-if="props.multiAddressDeliveryCheckbox" class="wf-mt-30">
      <div @click="emits('open-modal-choose-address')" class="wf_flex wf-br-1 wf-br--g-e-7 wf_justify-between wf_height-41 wf-px-15 wf_items-center">
        <span class="wf-color--g-333 wf-font_15--reg"
          >{{ countCartDelivery ? `${countCartDelivery}개의 배송지가 선택되어 있습니다.` : '배송지를 선택해 주세요.' }}
        </span>
        <span>
          <IconArrowRight :width="8" :height="13" />
        </span>
      </div>
      <ul class="wf_flex wf-mt-20 wf_flex-col wf-font_13--reg wf-space-y-10">
        <li class="wf_flex wf-space-x-3 wf_items-start wf-font_13-reg--lh130 wf-color--g-777">
          <span class="wf-color--g-bbb wf-ml--1"><IconQuestionGreyCircle /></span>
          <div v-html="$t('cardOrder.noteChooseAdress')" class="" />
        </li>
      </ul>
    </div>
    <div v-if="!props.multiAddressDeliveryCheckbox || !isShowMultiCheckBox" :class="props.showTitleDeliveryOrder && 'wf-mt-29'">
      <WelfareInput
        :title="props.showTitleDeliveryOrder ? $t('cardOrder.nameOrderer') : props.nonMember ? $t('cardOrder.nameOrdererNonMember') : ''"
        :required="!props.nonMember"
        :disabled="props.nonMember"
        clear-text
        :model-value="props.inputNameCustomer"
        @update:model-value="(value) => emits('update:inputNameCustomer', value)"
      />
    </div>
    <div v-if="!props.multiAddressDeliveryCheckbox || !isShowMultiCheckBox" :class="isModal ? 'wf-mt-10' : 'wf-mt-20'">
      <div class="wf_flex wf-order-btn-address" v-if="!props.nonMember">
        <button
          v-for="(item, index) in listButtonAdress"
          :key="index"
          class="wf-color--g-777 wf-font_15--reg"
          :class="{ selected: item.state === stateAddress }"
          @click="() => handleClickButtonTypeAddress(item.state)"
        >
          {{ $t(item.name) }}
        </button>
      </div>
      <div v-if="stateAddress" class="wf-mt-20">
        <OrderProductDeliveryAdressDefault v-if="stateAddress === 'default'" :defaultAddressDelivery="defaultAddressDelivery" />
        <OrderProductDeliveryNew
          v-else-if="stateAddress === 'new'"
          key="new"
          :current-address="newAddress"
          @update:current-address="(data: DeliveryAddressModel) => emits('update:newAddress', data)"
          :gapWrapForm="props.isModal ? 20 : 24"
          :isHiddenAddressCheckboxDefault="props.isModal"
          :is-hidden-type-delivery="$props.nonMember"
          :isModal="props.isModal"
        />
        <OrderProductDeliveryNew
          key="list"
          v-else
          :current-address="currentAddress"
          @update:current-address="(data: DeliveryAddressModel) => emits('update:currentAddress', data)"
          :gapWrapForm="props.isModal ? 20 : 24"
          :isHiddenAddressCheckboxDefault="props.isModal"
          :isModal="props.isModal"
        />
      </div>
      <div :class="`wf_flex ${props.isModal ? 'wf-mt-20' : 'wf-mt-22'} wf_flex-col wf-space-y-10`">
        <WelfareSelect
          :model-value="props?.valueMessageAddress"
          @update:model-value="(value) => emits('update:valueMessageAddress', value)"
          :options="orderProductMessageAddressDeliveryOptions"
          option-label="label"
          option-value="value"
          :placeholder="$t('cardOrder.messageAdressPlaceholder')"
        />
        <TextInputWithMaxLengthCharacters
          v-if="valueMessageAddress === OrderProductMessageAddressDeliveryEnum.other"
          :model-value="props?.messageAdress"
          @update:model-value="(value) => emits('update:messageAdress', value)"
          :placeholder="$t('cardOrder.inputMessagePlaceholder')"
          :maxLength="20"
          show-max-length
          hidden-warning
          :clear-text="false"
        />
      </div>
      <ul :class="`wf_flex wf-mt-20 wf_flex-col wf-font_13--reg  ${props.isModal ? 'wf-space-y-11' : 'wf-space-y-10'}`">
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
</template>

<style scoped>
@import url('@/assets/styles/views/order/_welfare-order-product-page.scss');
</style>
