<!-- FO_MC_MY014004P -->
<script setup lang="ts">
import OrderGroupProductDeliveryAddress from '@/components/order/OrderGroupProductDeliveryAddress.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { useChangeOrderDeliveryAddress } from '@/composables/widgets/modal/useChangeOrderDeliveryAddress'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { OrderCartGroupDeliveryAddressModel, OrderProductMessageAddressDeliveryEnum } from '@/models/views/order/OrderProductPageModel'
import { BaseConfirmModalEmits } from '@/models/widgets/modal'

export interface PopupChangeDeliveryAddressProps {
  oldAddress?: DeliveryAddressModel
  oldMessageAddress?: OrderProductMessageAddressDeliveryEnum
  nonMember?: boolean
}

const props = defineProps<PopupChangeDeliveryAddressProps>()
const emit = defineEmits<BaseConfirmModalEmits<OrderCartGroupDeliveryAddressModel>>()

const {
  listDeliveryAddress,
  currentAddress,
  valueMessageAddress,
  messageAdress,
  stateAddress,
  inputNameCustomer,
  multiAddressDeliveryCheckbox,
  openListAddress,
  defaultAddressDelivery,
  newAddress,
  checkClearAddressDelivery,
  handleChangeAddress
} = useChangeOrderDeliveryAddress(emit, props)
</script>

<template>
  <div class="wf_modal-width wf_modal-max-height wf-bg--g-fff wf_flex wf_flex-col wf-px-16 wf-pt-10 wf-pb-30 wf-space-y-20 wf-pb-20-important">
    <WelfareTitleModal
      :title="$t('myPage.changeOrderDeliveryAddress.title')"
      classIcon="wf-mt--3"
      class="wf-pt-10 wf-pb-15"
      classTitle=" wf_letter-spacing--0745 "
      @close="emit('onClose')"
    />

    <div class="wf_overflow-y-auto">
      <OrderGroupProductDeliveryAddress
        isModal
        :nonMember="props.nonMember"
        :isWrapBox="false"
        :showTitleDeliveryOrder="false"
        v-model:message-adress="messageAdress"
        v-model:value-message-address="valueMessageAddress"
        v-model:input-name-customer="inputNameCustomer"
        :multi-address-delivery-checkbox="multiAddressDeliveryCheckbox"
        v-model:stateAddress="stateAddress"
        v-model:current-address="currentAddress"
        :listDeliveryAddress="listDeliveryAddress"
        @listen-choose-address="checkClearAddressDelivery"
        :default-address-delivery="defaultAddressDelivery"
        @open-list-address="openListAddress"
        v-model:new-address="newAddress"
      />
    </div>
    <div class="wf_flex wf-space-x-11 wf_width-full">
      <WelfareButtonLine
        lg-state="grey-line"
        type="lg"
        class="wf_flex-1"
        :text="$t('myPage.changeOrderDeliveryAddress.btnCancel')"
        @click="emit('onClose')"
      />
      <WelfareButtonLine
        lg-state="grey-line"
        active
        type="lg"
        class="wf_flex-1"
        :text="$t('myPage.changeOrderDeliveryAddress.btnAccept')"
        @click="handleChangeAddress"
      />
    </div>
  </div>
</template>
