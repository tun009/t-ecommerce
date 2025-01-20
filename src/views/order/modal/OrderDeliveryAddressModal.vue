<!-- FO_MC_OR011007P -->
<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconEmptyAddress from '@/components/icons/IconEmptyAddress.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareColorTag from '@/components/uikit/tag/WelfareColorTag.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { useOrderDeliveryAddress } from '@/composables/order/modal/useOrderDeliveryAddress'
import { YesNoEnum } from '@/models/common'
import { OrderDeliveryAddressModalEmits, OrderDeliveryAddressModalProps } from '@/models/views/order/modal/OrderDeliveryAddressModel'

const emits = defineEmits<OrderDeliveryAddressModalEmits>()

defineProps<OrderDeliveryAddressModalProps>()

const { items, loading, chooseAddress, editAddress, addAddress, handleDisplayDeliveryAddressCode } = useOrderDeliveryAddress(emits)
</script>

<template>
  <div class="wf_overflow-hidden wf-bg--g-fff wf_width-screen wf_flex wf_flex-col">
    <WelfareTitleModal
      :title="$t('order.modal.deliveryAddressList')"
      class="wf-py-20 wf-px-16 wf-br--g-e-7"
      :widthIcon="20"
      :colorIcon="defaultColor.primary"
      classIcon="wf-mt--1"
      @close="emits('close')"
    />
    <div class="wf-px-16 wf-pb-20 wf-pt-20 wf_height-screen-un-title">
      <WelfareButtonLine
        active
        class="wf_width-full wf-color--g-333-important wf-pt-15"
        type="md"
        md-state="line"
        :text="$t('order.modal.button.addAddress')"
        @click="addAddress"
      />
      <div v-if="items.length > 0" class="wf_flex wf_flex-col wf-pt-20 wf-space-y-15 wf_width-full wf_overflow-y-auto wf_height-full wf-pb-40">
        <div v-for="(item, index) in items" :key="index" class="wf_width-full">
          <div class="wf-br-1 wf-br--g-e-7 wf-box">
            <div class="wf_flex wf_justify-between wf_width-full wf-special-padding">
              <div class="wf-font_15--bold wf-color--g-111 wf_align-self-center wf_flex">
                {{ item.deliveryAddressName }} &nbsp;({{ handleDisplayDeliveryAddressCode(item.deliveryAddressCode) }}) &nbsp;&nbsp;
                <div class="wf-mt--2">
                  <IconCheck v-if="item.deliveryAddressBaseYn === YesNoEnum.Y" />
                </div>
              </div>
              <WelfareColorTag v-if="item.deliveryAddressBaseYn === YesNoEnum.Y" active :text="$t('order.modal.defaultAddress')" />
            </div>
            <div class="wf_flex wf_flex-col wf-space-y-3 wf_width-full wf-special-padding">
              <div class="wf-font_15--reg wf-color--g-333">{{ item.address?.zipCode }}</div>
              <div class="wf_max-width-225">
                <span v-if="item.address?.basicRoad" class="wf-font_15--reg wf-color--g-333">{{
                  `${item.address?.basicRoad ?? ''}
                              ${item.address?.detail ?? ''}`
                }}</span><br />
                <span v-if="item.address?.basicJibun" class="wf-font_15--reg wf-color--g-333 wf-ml-2"
                  >({{ `${item.address?.basicJibun ?? ''}${item.address?.detail ? ', ' + item.address.detail : ''}` }})</span
                >
              </div>
            </div>
            <div class="wf_flex contact wf_width-full wf-pb-1 wf-pt-11 wf-px-20">
              <div class="wf-font_15--reg wf-color--g-333 wf-mr-10">{{ item.deliveryCellphoneNumber }}</div>
              <div class="wf-font_15--reg wf-color--g-333 wf-pr-8">|</div>
              <div class="wf-font_15--reg wf-color--g-333">{{ item.deliveryTelNumber }}</div>
            </div>
            <div class="wf_flex wf_justify-end wf-button-padding">
              <WelfareButtonLine type="sm" :text="$t('order.modal.button.edit')" class="wf-mr-5" @click="editAddress(item)" />
              <WelfareButtonLine
                type="sm"
                :text="$t('order.modal.button.choose')"
                :disabled="item.deliveryAddressBaseYn === YesNoEnum.Y"
                @click="chooseAddress(item)"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading === true && items.length === 0" class="wf-empty-address wf-mt--1">
        <IconEmptyAddress />
        <div class="wf-color--g-333 wf-font_15--mid">{{ $t('order.modal.emptyAddressList') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/modal/_welfare-order-delivery-address.scss');
</style>
