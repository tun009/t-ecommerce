<!-- FO_MC_MY071000 -->
<script setup lang="ts">
import { WIDTH_ICON_20, defaultColor } from '@/commons'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconEmptyAddress from '@/components/icons/IconEmptyAddress.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareColorTag from '@/components/uikit/tag/WelfareColorTag.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { useDeliveryAddress } from '@/composables/widgets/modal/useDeliveryAddress'
import { YesNoEnum } from '@/models/common'

const { items, onEditAddress, onAddAddress, onDeleteAddress, handleDisplayDeliveryAddressCode, loading } = useDeliveryAddress(true)
</script>

<template>
  <div class="wf_overflow-hidden wf-bg--g-fff wf_width-screen wf_flex wf_flex-col">
    <WelfareTitleModal
      :title="$t('myPage.deliveryAddress.title')"
      class="wf-py-20 wf-px-16 wf-br--g-e-7"
      :widthIcon="WIDTH_ICON_20"
      :colorIcon="defaultColor.primary"
      classIcon="wf-mt--1"
      @close="$router.back()"
    />
    <div class="wf-px-16 wf-pb-20 wf-pt-20 wf_height-screen-un-title">
      <WelfareButtonLine
        active
        class="wf_width-full wf-color--g-333-important wf-pt-15"
        type="md"
        md-state="line"
        :text="$t('order.modal.button.addAddress')"
        @click="onAddAddress"
      />
      <div v-if="items?.length > 0" class="wf_flex wf_flex-col wf-pt-20 wf-space-y-19 wf_width-full wf_overflow-y-auto wf_height-full wf-pb-40">
        <div v-for="(item, index) in items" :key="index" class="wf_width-full">
          <div class="wf-br-1 wf-br--g-e-7 wf-box">
            <div class="wf_flex wf_justify-between wf_width-full wf-special-padding">
              <div class="wf-font_15--bold wf-color--g-111 wf_align-self-center wf_flex wf-line-break-anywhere">
                {{ item.deliveryAddressName }} &nbsp;({{ handleDisplayDeliveryAddressCode(item.deliveryAddressCode) }}) &nbsp;&nbsp;
                <div class="wf-mt--2">
                  <IconCheck v-if="item.deliveryAddressBaseYn === YesNoEnum.Y" />
                </div>
              </div>
              <WelfareColorTag
                v-if="item.deliveryAddressBaseYn === YesNoEnum.Y"
                active
                :text="$t('order.modal.defaultAddress')"
              />
            </div>
            <div class="wf_flex wf_flex-col wf-space-y-3 wf_width-full wf-special-padding">
              <div class="wf-font_15--reg wf-color--g-333">{{ item.address?.zipCode }}</div>
              <div class="wf_max-width-225">
                <span v-if="item.address?.basicRoad" class="wf-font_15--reg wf-color--g-333 wf-line-break-anywhere">{{
                  `${item.address?.basicRoad ?? ''}
                              ${item.address?.detail ?? ''}`
                }}</span>
                <span v-if="item.address?.basicJibun" class="wf-font_15--reg wf-color--g-333 wf-ml-2 wf-line-break-anywhere"
                  >({{ `${item.address?.basicJibun ?? ''}${item.address?.detail ? ', ' + item.address.detail : ''}` }})</span
                >
              </div>
            </div>
            <div class="wf_flex contact wf_width-full wf-pb-1 wf-pt-4 wf-px-20">
              <div class="wf-font_13--reg wf-color--g-999 wf-mr-10">{{ item.deliveryCellphoneNumber }}</div>
              <div class="wf-font_13--reg wf-color--g-999 wf-pr-8">|</div>
              <div class="wf-font_13--reg wf-color--g-999">{{ item.deliveryTelNumber }}</div>
            </div>
            <div class="wf_flex wf_justify-end wf-button-padding wf-pt-9--i">
              <WelfareButtonLine type="sm" :text="$t('order.modal.button.edit')" class="wf-mr-5" @click="onEditAddress(item)" />
              <WelfareButtonLine
                type="sm"
                :text="$t('order.modal.button.delete')"
                :disabled="item.deliveryAddressBaseYn === YesNoEnum.Y"
                @click="onDeleteAddress(item.deliveryAddressKey ?? '')"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="!items?.length && !loading" class="wf-empty-address wf-mt--1">
        <IconEmptyAddress />
        <div class="wf-color--g-333 wf-font_15--mid">{{ $t('order.modal.emptyAddressList') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/views/order/modal/_welfare-order-delivery-address.scss');
</style>
