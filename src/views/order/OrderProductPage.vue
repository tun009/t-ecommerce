<!-- FO_MC_OR011000, FO_MC_OR014000, FO_MC_OR011011P, FO_MC_OR012000 -->

<script setup lang="ts">
import OrderApplyCashReceipt from '@/components/order/OrderApplyCashReceipt.vue'
import GroupOrderBankPayment from '@/components/order/OrderGroupOrderBankPayment.vue'
import GroupOrderPriceDiscount from '@/components/order/OrderGroupOrderPriceDiscount.vue'
import GroupOrderPriceDiscountPoint from '@/components/order/OrderGroupOrderPriceDiscountPoint.vue'
import GroupOrderPricePayment from '@/components/order/OrderGroupOrderPricePayment.vue'
import GroupProductCustomer from '@/components/order/OrderGroupProductCustomer.vue'
import GroupProductDeliveryAddress from '@/components/order/OrderGroupProductDeliveryAddress.vue'
import TotalPricePayment from '@/components/order/OrderTotalPricePayment.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useProductOrderPage } from '@/composables/order/useOrderProductPage'

const {
  productCustomerList,
  multiAddressDeliveryCheckbox,
  valueMessageAddress,
  // currentAddress,
  // optionsAdress,
  messageAdress,
  welPointInput,
  pointInput,
  savePointInput,
  welfarePointCheckBox,
  pointCheckbox,
  savePointCheckbox,
  paymentMethodUseAgain,
  switchMethodPaymentRadio,
  currentBank,
  methodPaymentSelect,
  installmentMonthSelect,
  totalPriceBeforeDiscount,
  costDelivery,
  totalPriceDiscount,
  totalPricePayment,
  inputNameCustomer,
  disabledPoint,
  agreePolicyCheckbox,
  dataBanks,
  optionsInstallmentMonthSelect,
  optionsPaymentMethod,
  instantDiscount,
  lumpSumDiscount,
  couponDiscount,
  stateAddress,
  currentAddress,
  showModalInstantDiscountDetail,
  listDeliveryAddress,
  checkClearAddressDelivery,
  isUseApplyCash,
  personalApplyCash,
  incomePersonal,
  infoPersonal,
  infoCompany,
  incomeCompany,
  isShowCashReceipt,
  handleClickOther,
  // showModalInfoSaveMoney,
  showModalChooseMultiAddress,
  showModalApplyCoupon,
  defaultAddressDelivery,
  openListAddress,
  cartProductDelivery,
  handleSave,
  newAddress,
  showPopupPackageDiscount,
  dataVoucher,
  handleUpdateWelPointInput,
  totalPoint
} = useProductOrderPage()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :displayBackIcon="true" :displayHomeLeftIcon="true" :title="$t('cardOrder.title')" />
    <GroupProductCustomer :product-list="productCustomerList" />
    <WelfareLineHorizontal />
    <GroupProductDeliveryAddress
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
    <!-- <OrderGroupInfoNotMember
      v-else
      v-model:current-address="currentAddress"
      v-model:message-adress="messageAdress"
      v-model:value-message-address="valueMessageAddress"
      v-model:infoInComing="infoInComing"
      v-model:is-use-data="isUseDataCurrentMember"
    /> -->
    <WelfareLineHorizontal />
    <GroupOrderPriceDiscount
      v-model:disabled-point="disabledPoint"
      @open-info-price-discount="showModalInstantDiscountDetail"
      :coupon-discount="couponDiscount"
      :instant-discount="instantDiscount"
      :lump-sum-discount="lumpSumDiscount"
      @view-click-coupon="showModalApplyCoupon"
      @lump-sum-questions="showPopupPackageDiscount"
    />
    <WelfareLineHorizontal />
    <GroupOrderPriceDiscountPoint
      v-model:point-input="pointInput"
      v-model:save-point-input="savePointInput"
      v-model:point-checkbox="pointCheckbox"
      v-model:save-point-checkbox="savePointCheckbox"
      v-model:welfare-point-check-box="welfarePointCheckBox"
      :wel-point-input="welPointInput"
      @update:wel-point-input="handleUpdateWelPointInput"
      :disabled="disabledPoint"
      :dataVoucher="dataVoucher"
    />
    <WelfareLineHorizontal />
    <GroupOrderBankPayment
      :data-banks="dataBanks"
      :optionsInstallmentMonthSelect="optionsInstallmentMonthSelect"
      :optionsPaymentMethod="optionsPaymentMethod"
      :disabledPoint="disabledPoint"
      @click-bank="handleClickOther"
      v-model:current-bank="currentBank"
      v-model:installment-month-select="installmentMonthSelect"
      v-model:method-payment-select="methodPaymentSelect"
      v-model:payment-method-use-again="paymentMethodUseAgain"
      v-model:switch-method-payment-radio="switchMethodPaymentRadio"
    />

    <WelfareLineHorizontal />
    <div v-if="isShowCashReceipt">
      <OrderApplyCashReceipt
        v-model:is-use-apply-cash="isUseApplyCash"
        v-model:personal-apply-cash="personalApplyCash"
        v-model:income-personal="incomePersonal"
        v-model:info-personal="infoPersonal"
        v-model:info-company="infoCompany"
        v-model:income-company="incomeCompany"
      />
      <WelfareLineHorizontal />
    </div>
    <GroupOrderPricePayment
      :total-price-before-discount="totalPriceBeforeDiscount"
      :cost-delivery="costDelivery"
      :price-save-point="totalPoint"
      :total-price-discount="totalPriceDiscount"
      :total-price-payment="totalPricePayment"
      :isShowHintPayment="true"
    />
  </div>
  <TotalPricePayment classGroup='wf_flex-order-999 wf_index-2' @save="handleSave" v-model:agree-payment-checkbox="agreePolicyCheckbox" :total-price-payment="totalPricePayment" />
</template>
