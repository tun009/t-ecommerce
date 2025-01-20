<!-- 
  FO_MC_OR011008P
  FO_MC_OR011009P
  FO_MC_MY071001P
  FO_MC_MY071002P
-->
<script setup lang="ts">
import WelfareRadio from '@/components/uikit/input/WelfareRadio.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import { useOrderAddDeliveryAddress } from '@/composables/order/modal/useOrderAddDeliveryAddress'
import OrderSearchAddress from '@/components/order/OrderSearchAddress.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { BaseConfirmModalEmits } from '@/models/widgets/modal'
import { OrderDeliveryAddressCode } from '@/models/views/order/OrderProductPageModel'
import WelfareInputMark from '@/components/uikit/input/WelfareInputMark.vue'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
export interface OrderAddDeliveryAddressModalProps {
  isEdit: boolean
  item: DeliveryAddressModel
  classWrapper?: string
  title?: string
}

const props = defineProps<OrderAddDeliveryAddressModalProps>()
const emits = defineEmits<BaseConfirmModalEmits<any>>()

const { values, setFieldValue, onSubmit, isSetDefault, codeTelList, codeContactList, refSearchAddress, changeAddress } = useOrderAddDeliveryAddress(
  props,
  emits
)
</script>

<template>
  <OrderSearchAddress @update:model-value="(data) => changeAddress(data)" ref="refSearchAddress" />
  <div class="modal-add-delivery-address wf_modal-max-height" :class="props.classWrapper">
    <WelfareTitleModal
      classTitle="wf_height-21"
      :title="props.title ? $t(props.title) : ($props.isEdit ? $t('order.modal.editAddress') : $t('order.modal.addAddress'))"
      class="wf-pb-14 wf-delivery-address-header"
      classIcon="wf-mt--3 wf-delivery-address-icon"
      @close="$emit('onClose')"
    />
    <div class="wf_width-full wf_overflow-y-auto wf-mt-1">
      <div class="wf-color--g-111 wf-font_15--bold wf_letter-spacing--1">{{ $t('order.modal.chooseTypeAddress') }}</div>
      <div class="wf_flex wf-space-x-31 wf-pt-14 delivery-address-type">
        <WelfareRadio
          :gap-radio="5"
          :value="OrderDeliveryAddressCode.home"
          :label="$t('order.modal.home')"
          :model-value="values.deliveryAddressCode"
          @update:model-value="(value) => setFieldValue('deliveryAddressCode', value)"
        />
        <WelfareRadio
          :gap-radio="5"
          :value="OrderDeliveryAddressCode.company"
          :label="$t('order.modal.office')"
          :model-value="values.deliveryAddressCode"
          @update:model-value="(value) => setFieldValue('deliveryAddressCode', value)"
        />
        <WelfareRadio
          :gap-radio="5"
          :value="OrderDeliveryAddressCode.etc"
          :label="$t('order.modal.others')"
          :model-value="values.deliveryAddressCode"
          @update:model-value="(value) => setFieldValue('deliveryAddressCode', value)"
        />
      </div>
      <div class="wf-color--g-111 wf-font_15--bold wf_letter-spacing--1 wf-pt-20 wf-delivery-address-receiver">
        {{ $t('order.modal.receive') }} <span class="wf-color--red-ff-3-b-4-f">*</span>
      </div>
      <WelfareInput
        :placeholder="$t('order.modal.receivePlaceholder')"
        class="wf_width-full wf-pt-14 gap-y-0-i"
        :model-value="values.deliveryAddressName"
        :clearText="false"
        @update:model-value="(value) => setFieldValue('deliveryAddressName', value)"
      />
      <div class="wf-pt-20 wf_flex wf_justify-between address-information">
        <span class="wf-color--g-111 wf-font_15--bold">{{ $t('order.modal.address') }} <span class="wf-color--red-ff-3-b-4-f">*</span></span>
        <div class="wf_flex wf-space-x-6 wf-pr-1">
          <WelfareCheckbox v-model="isSetDefault" />
          <span class="wf-color--g-333 wf-font_13--reg wf-pt-3">
            {{ $t('order.modal.setDefault') }}
          </span>
        </div>
      </div>
      <div class="wf_flex wf-space-x-10 wf_width-full wf-pt-11 wf-delivery-address-kakao">
        <WelfareInput
          :placeholder="$t('order.modal.searchAddress')"
          class="special-width gap-y-0-i"
          :model-value="values.deliveryZipCode"
          disabled
          :clear-text="false"
          @update:model-value="(value) => setFieldValue('deliveryZipCode', value)"
        />
        <WelfareButtonLine
          class="button-w-fill wf-color--g-333-important"
          active
          md-state="line"
          type="md"
          :text="$t('order.modal.searchAddressButton')"
          @click="
            () => {
              refSearchAddress?.open?.()
            }
          "
        />
      </div>
      <WelfareInput
        :placeholder="$t('order.modal.genericAddress')"
        class="wf_width-full wf-pt-10 gap-y-0-i wf-delivery-address-detail"
        :model-value="values.loadNameAddress"
        disabled
        :clear-text="false"
        @update:model-value="(value) => setFieldValue('loadNameAddress', value)"
      />
      <WelfareInput
        :placeholder="$t('order.modal.detailAddress')"
        class="wf_width-full wf-pt-10 gap-y-0-i wf-delivery-address-detail"
        :model-value="values.detailedAddress"
        :clear-text="false"
        @update:model-value="(value) => setFieldValue('detailedAddress', value)"
      />

      <div class="wf-color--g-111 wf-font_15--bold wf_letter-spacing--1 wf-pt-21 tel-information">
        {{ $t('order.modal.tel') }} <span class="wf-color--red-ff-3-b-4-f">*</span>
      </div>
      <div class="wf_flex wf-space-x-10 wf_width-full wf-pt-13">
        <WelfareSelect
          :placeholder="$t('order.modal.select')"
          class="wf_width-95-important wf_min-width-95 wf-pr-14 wf_letter-spacing--1"
          option-label="label"
          :options="codeTelList"
          :model-value="values.preTel"
          @update:model-value="(value) => setFieldValue('preTel', value)"
        />
        <WelfareInputMark
          :model-value="values.tel"
          @update:model-value="
            (value) => {
              setFieldValue('tel', value)
            }
          "
          mask="9999-9999"
          :clearText="false"
          :placeholder="$t('order.modal.telPlaceholder')"
        />
      </div>
      <div class="wf-color--g-111 wf-font_15--bold wf_letter-spacing--1 wf-pt-21 contact-information">{{ $t('order.modal.contact') }}</div>
      <div class="wf_flex wf-space-x-10 wf_width-full wf-pt-13">
        <WelfareSelect
          :placeholder="$t('order.modal.select')"
          class="wf_width-95-important wf_min-width-95"
          option-label="label"
          :options="codeContactList"
          :model-value="values.preContact"
          @update:model-value="(value) => setFieldValue('preContact', value)"
        />
        <WelfareInputMark
          :model-value="values.contact"
          @update:model-value="
            (value) => {
              setFieldValue('contact', value)
            }
          "
          mask="9999-9999"
          :clearText="false"
          :placeholder="$t('order.modal.telPlaceholder')"
        />
      </div>
    </div>
    <div class="wf_flex wf-space-x-11 wf_width-full wrapper-button">
      <WelfareButtonLine
        lg-state="grey-line"
        type="lg"
        class="wf_flex-1 wf_min-width-initial"
        :text="$t('order.modal.button.cancel')"
        @click="emits('onClose')"
      />
      <WelfareButtonLine
        type="lg"
        class="wf_flex-1 wf-bg--g-111-important wf_min-width-initial"
        :text="props.isEdit ? $t('order.modal.button.edit') : $t('order.modal.button.addNew')"
        @click="onSubmit"
      />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/modal/_welfare-order-add-delivery-address.scss');
@import url('@/assets/styles/views/myPage/modal/deliveryAddress/_welfare-my-page-add-delivery-address.scss');
</style>
