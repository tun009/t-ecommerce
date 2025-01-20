<!-- FO_MC_OR013000, FO_MC_OR013001 -->
<script setup lang="ts">
import GroupOrderBankPayment from '@/components/order/OrderGroupOrderBankPayment.vue'
import GroupOrderPricePayment from '@/components/order/OrderGroupOrderPricePayment.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import TotalPricePayment from '@/components/order/OrderTotalPricePayment.vue'
import OrderCouponInfoOutGoing from '@/components/order/orderCouponElectronic/OrderCouponInfoOutGoing.vue'
import { WelfareInput } from '@/components/uikit/input'
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import WelfareTextarea from '@/components/uikit/input/WelfareTextarea.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useOrderCouponElectronicProductPage } from '@/composables/order/useOrderCouponElectronicProductPage'
import { orderProductListDataCountPeople } from '@/models/views/order/OrderProductPageModel'
import OrderGroupOrderPriceDiscount from '@/components/order/OrderGroupOrderPriceDiscount.vue'
import GroupOrderPriceDiscountPoint from '@/components/order/OrderGroupOrderPriceDiscountPoint.vue'

const {
  welPointInput,
  pointInput,
  savePointInput,
  welfarePointCheckBox,
  pointCheckbox,
  savePointCheckbox,
  handleUpdateWelPointInput,
  dataVoucher,
  paymentMethodUseAgain,
  switchMethodPaymentRadio,
  currentBank,
  methodPaymentSelect,
  installmentMonthSelect,
  totalPriceBeforeDiscount,
  costDelivery,
  totalPriceDiscount,
  totalPricePayment,
  agreePolicyCheckbox,
  dataBanks,
  optionsInstallmentMonthSelect,
  optionsPaymentMethod,
  instantDiscount,
  couponDiscount,
  showModalInstantDiscountDetail,
  infoOutGoingList,
  handleClickInfoMe,
  massageOutGoing,
  // showPopupRefuseSaveMoney,
  multiSendPeople,
  selectDataCountPeople,
  handleSave,
  handleClickOther,
  handleSetInfo,
  showModalApplyCoupon,
  productInfo,
  quantityProduct,
  isBuyAble,
  totalPoint
  // isDisableWelfarePoint
} = useOrderCouponElectronicProductPage()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :displayBackIcon="true" :displayHomeLeftIcon="true" :title="$t('cardOrder.title')" />
    <WelfareBox>
      <OrderProductOrderTitle class="wf-mb-13" title="cardOrder.titleOrderProduct" />
      <WelfareUnitCard v-if="productInfo" :product="productInfo" />
    </WelfareBox>
    <WelfareLineHorizontal />
    <WelfareBox class="wf_flex wf_flex-col wf-space-y-20">
      <OrderCouponInfoOutGoing
        v-if="quantityProduct === 1"
        v-model:name="infoOutGoingList[0].name"
        v-model:phone="infoOutGoingList[0].phone"
        @click-info-me="() => handleClickInfoMe(0)"
        @click-info-other="() => handleClickInfoMe(0)"
      />
      <div v-else>
        <OrderProductOrderTitle title="cardOrder.orderCoupon.title">
          <div class="wf_flex wf-space-x-10 wf_items-center">
            <WelfareCheckbox inputId="send-to-multiple" v-model="multiSendPeople" />
            <label for="send-to-multiple" class="wf-color--g-333 wf-font_15--reg wf_letter-spacing--0-7">{{
              $t('cardOrder.orderCoupon.titleCheckBoxSend')
            }}</label>
          </div>
        </OrderProductOrderTitle>
        <div v-if="multiSendPeople" class="wf_flex wf-mt-14 wf_flex-col wf-space-y-20">
          <WelfareSelect v-model:model-value="selectDataCountPeople" option-label="label" :options="orderProductListDataCountPeople"> </WelfareSelect>
          <OrderCouponInfoOutGoing
            v-for="(item, index) in infoOutGoingList"
            :key="index"
            :index="index + 1"
            @update:name="(value) => handleSetInfo(index, 'name', value)"
            @update:phone="(phone) => handleSetInfo(index, 'phone', phone)"
            :name="item.name"
            :phone="item.phone"
            @click-info-me="() => handleClickInfoMe(index)"
            @click-info-other="() => handleClickInfoMe(index)"
          />
        </div>
      </div>
    </WelfareBox>
    <WelfareLineHorizontal />
    <WelfareBox class="wf_flex wf_flex-col wf-space-y-20">
      <div class="wf-mt--2">
        <OrderProductOrderTitle title="보내는분" rawText class="wf-mb-10" />
        <WelfareInput :clear-text="false" :max-length="15" :show-max-length="false" v-model:model-value="massageOutGoing.name" placeholder="회원명" />
      </div>

      <WelfareTextarea
        class="wf-mt--1"
        title="메시지"
        v-model:model-value="massageOutGoing.message"
        placeholder="받는 분에게 전달할 메시지를 입력해 주세요."
        :show-max-length="true"
        :max-length="100"
      />
    </WelfareBox>
    <WelfareLineHorizontal />
    <OrderGroupOrderPriceDiscount
      @open-info-price-discount="showModalInstantDiscountDetail"
      :coupon-discount="couponDiscount"
      :instant-discount="instantDiscount"
      :disabled-point="false"
      @view-click-coupon="showModalApplyCoupon"
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
      :dataVoucher="dataVoucher"
    />
    <WelfareLineHorizontal />
    <GroupOrderBankPayment
      :data-banks="dataBanks"
      :is-member="true"
      :optionsInstallmentMonthSelect="optionsInstallmentMonthSelect"
      :optionsPaymentMethod="optionsPaymentMethod"
      v-model:current-bank="currentBank"
      v-model:installment-month-select="installmentMonthSelect"
      v-model:method-payment-select="methodPaymentSelect"
      v-model:payment-method-use-again="paymentMethodUseAgain"
      v-model:switch-method-payment-radio="switchMethodPaymentRadio"
      @click-bank="handleClickOther"
    />
    <WelfareLineHorizontal />
    <GroupOrderPricePayment
      :total-price-before-discount="totalPriceBeforeDiscount"
      :cost-delivery="costDelivery"
      :price-save-point="totalPoint"
      :total-price-discount="totalPriceDiscount"
      :total-price-payment="totalPricePayment"
      :isShowHintPayment="true"
    />
  </div>
  <TotalPricePayment
    v-if="isBuyAble"
    classGroup='wf_flex-order-999 wf_index-2'
    @save="handleSave"
    v-model:agree-payment-checkbox="agreePolicyCheckbox"
    :total-price-payment="totalPricePayment"
  />
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-input.scss');
</style>
