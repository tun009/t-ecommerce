<!-- FO_MC_MY016000 -->
<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useMyPageInquiryExchangeRequest } from '@/composables/myPage/inquiry/useMyPageInquiryExchangeRequest'
import MyPageInquiryExchangeUnitCard from '@/components/myPage/inquiry/MyPageInquiryExchangeUnitCard.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import OrderGroupProductDeliveryAddress from '@/components/order/OrderGroupProductDeliveryAddress.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'

const {
  orderData,
  currentAddress,
  valueMessageAddress,
  messageAdress,
  stateAddress,
  inputNameCustomer,
  multiAddressDeliveryCheckbox,
  openListAddress,
  defaultAddressDelivery,
  newAddress,
  listDeliveryAddress,
  checkClearAddressDelivery,
  showModalChooseMultiAddress,
  cartProductDelivery,
  handleShowExchangeFeeInformationModal
} = useMyPageInquiryExchangeRequest()
</script>

<template>
  <WelfareTitleTextStickyTop :title="$t('myPage.inquiryExchangeRequest.mainTitle')" display-cart-icon display-search-icon display-back-icon />
  <MyPageInquiryExchangeUnitCard :data="orderData" />
  <WelfareLineHorizontal />
  <OrderGroupProductDeliveryAddress
    v-model:message-adress="messageAdress"
    v-model:value-message-address="valueMessageAddress"
    v-model:input-name-customer="inputNameCustomer"
    :multi-address-delivery-checkbox="multiAddressDeliveryCheckbox"
    v-model:stateAddress="stateAddress"
    v-model:current-address="currentAddress"
    :listDeliveryAddress="listDeliveryAddress"
    @listen-choose-address="checkClearAddressDelivery"
    :default-address-delivery="defaultAddressDelivery"
    @open-modal-choose-address="showModalChooseMultiAddress"
    @open-list-address="openListAddress"
    :count-cart-delivery="cartProductDelivery.length"
    v-model:new-address="newAddress"
  />
  <WelfareLineHorizontal />
  <WelfareBox>
    <div class="wf_flex wf_justify-between">
      <p class="wf-font_17--bold wf_align-self-center">{{ $t('myPage.inquiryExchangeRequest.deliveryFeeTitle') }}</p>
      <WelfareButtonLine type="sm" :text="$t('myPage.inquiryExchangeRequest.shippingCostCalculationBtnTitle')" />
    </div>
    <div class="wf_flex wf_justify-between wf-font_15--reg wf-color--g-333 wf-mt-20">
      <p>{{ $t('myPage.inquiryExchangeRequest.exchangeShipCostTitle') }}</p>
      <p>0{{ $t('myPage.welfarePoints.won') }}</p>
    </div>
  </WelfareBox>
  <WelfareLineHorizontal />
  <WelfareBox class="wf_flex wf-space-x-10 wf_justify-center">
    <WelfareButtonLine lg-state="grey-line" class="wf_width-166" type="lg" :text="$t('myPage.refundInformation.cancelButton')" />
    <WelfareButtonLine
      type="lg"
      :text="$t('myPage.inquiryExchangeRequest.applicationBtnTitle')"
      class="wf_width-166"
      @click="handleShowExchangeFeeInformationModal"
    />
  </WelfareBox>
  <WelfareLineHorizontal />
  <WelfareBox>
    <p class="wf-font_14--semi color-777">{{ $t('myPage.inquiryExchangeRequest.exchangeAppInfoTitle') }}</p>
    <ul class="wf-mt-20 wf-ml--2 wf-font_13-reg--lh130 wf-color--g-777 wf_flex wf-space-y-8 wf_flex-col">
      <li class="wf_flex wf-space-x-3"><span class="wf-line-height-1">•</span>{{ $t('myPage.inquiryExchangeRequest.exchangeAppInfoContent1') }}</li>
      <li class="wf_flex wf-space-x-3"><span>•</span>{{ $t('myPage.inquiryExchangeRequest.exchangeAppInfoContent2') }}</li>
    </ul>
  </WelfareBox>
</template>

<style scoped>
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');
</style>
