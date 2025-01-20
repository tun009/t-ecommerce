<!-- FO_MC_MY015000 -->
<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useMyPageOrderCancelApply } from '@/composables/myPage/useMyPageOrderCancel'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTextarea from '@/components/uikit/input/WelfareTextarea.vue'
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import { WelfareCheckbox } from '@/components/uikit/input'
import { MyPageClaimDetailReason } from '@/models/views/myPage/MyPageOrderCancelModel'
import WelfareExpander from '@/components/widgets/common/WelfareExpander.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'

const {
  orderData,
  orderKey,
  deliveryDetailAddress,
  handleLinkToDeliveryInquiry,
  handlePutOrderCancel,
  values,
  onChangeCheckbox,
  isCheckedAgree,
  isCheckboxAll,
  handleCheckAll,
  handleChangeCheckBoxItem,
  handleReasonChange,
  listChecked,
  productCancelAmount,
  additionalShippingCosts,
  refundAmount,
  cancelShippingCost,
  orderShippingCost,
  refExpander,
  expectedCancellationAmount,
  listAmountPayment
} = useMyPageOrderCancelApply()
</script>

<template>
  <WelfareTitleTextStickyTop :title="$t('myPage.orderDetail.withDrawOrder')" display-cart-icon display-search-icon display-back-icon />
  <div class="wf-py-12 wf_text-center wf-pd wf-font_15--reg">
    {{ `${$t('myPage.inquiryExchangeRequest.orderNumberTitle')} ${orderKey}` }}
  </div>
  <div class="wf_flex wf-bg--g-f-5-f-6-fa wf-py-11 wf-px-16">
    <WelfareCheckbox :model-value="isCheckboxAll" @change="handleCheckAll(!isCheckboxAll)" />
    <p class="wf-pl-6 wf-font_15--bold wf-align-content-center">{{ $t('myPage.orderInfo.titleAddress') }}</p>
    <p class="wf-pl-10 wf-align-content-center wf-font_13-reg--lh140">{{ deliveryDetailAddress }}</p>
  </div>
  <WelfareBox>
    <div v-for="(item, index) in orderData" :key="index" :class="{ 'border-bb-777 wf-pb-20 wf-mb-20': index + 1 !== orderData?.length }">
      <WelfareUnitCard
        :product="item"
        is-check-box
        :checked="listChecked.includes(item.orderDeliveryProductKey?.toString())"
        @update:checked="(value) => handleChangeCheckBoxItem(value, item.orderDeliveryProductKey?.toString())"
        class="border-bb-777 wf-pb-16 wf-mb-20"
      />
      <p class="wf-font_17--bold wf-mb-19">{{ $t('myPage.orderCancel.reasonForCancel') }}</p>
      <div class="wf_flex wf-space-y-10-i wf-space-x-8--i wf_flex-wrap testScroll">
        <WelfareButtonLine
          :id="'reasonButton-' + item.orderDeliveryProductKey"
          class="wf-px-21-i wf_height-39"
          md-state="line"
          type="md"
          :text="$t('myPage.inquiryExchangeRequest.reasonForExchange1')"
          @click="() => handleReasonChange(index, 'cancelReasonCode', MyPageClaimDetailReason.HEART_CHANGE)"
          :active="values.ticketClaimReceivers?.[index]?.cancelReasonCode === MyPageClaimDetailReason.HEART_CHANGE"
        />
        <WelfareButtonLine
          class="wf-px-14-i wf_height-39"
          md-state="line"
          type="md"
          :text="$t('myPage.inquiryExchangeRequest.reasonForExchange2')"
          @click="() => handleReasonChange(index, 'cancelReasonCode', MyPageClaimDetailReason.PRICE_PROMOTION_COMPARISON)"
          :active="values.ticketClaimReceivers?.[index]?.cancelReasonCode === MyPageClaimDetailReason.PRICE_PROMOTION_COMPARISON"
        />
        <WelfareButtonLine
          class="wf-px-5-i wf_height-39"
          md-state="line"
          type="md"
          :text="$t('myPage.inquiryExchangeRequest.reasonForExchange3')"
          @click="() => handleReasonChange(index, 'cancelReasonCode', MyPageClaimDetailReason.ISSUE_DELAY)"
          :active="values.ticketClaimReceivers?.[index]?.cancelReasonCode === MyPageClaimDetailReason.ISSUE_DELAY"
        />
        <WelfareButtonLine
          class="wf-px-9-i wf_height-39"
          md-state="line"
          type="md"
          :text="$t('myPage.inquiryExchangeRequest.reasonForExchange4')"
          @click="() => handleReasonChange(index, 'cancelReasonCode', MyPageClaimDetailReason.SOLD_OUT_PRODUCT)"
          :active="values.ticketClaimReceivers?.[index]?.cancelReasonCode === MyPageClaimDetailReason.SOLD_OUT_PRODUCT"
        />
        <WelfareButtonLine
          class="wf_height-39"
          md-state="line"
          type="md"
          :text="$t('myPage.inquiryExchangeRequest.reasonForExchange5')"
          @click="() => handleReasonChange(index, 'cancelReasonCode', MyPageClaimDetailReason.ETC)"
          :active="values.ticketClaimReceivers?.[index]?.cancelReasonCode === MyPageClaimDetailReason.ETC"
        />
      </div>
      <WelfareTextarea
        class="wf-mt-8 wf_height-68"
        :placeholder="$t('myPage.inquiryWrite.placeholder2')"
        :model-value="values.ticketClaimReceivers?.[index]?.cancelMemo"
        @update:model-value="(value) => handleReasonChange(index, 'cancelMemo', value)"
      />
    </div>
  </WelfareBox>
  <WelfareLineHorizontal />
  <WelfareBox :is-padding-vertical="false">
    <WelfareExpander ref="refExpander" :default-expander="true" class="wf-mt-17">
      <template #button="{ isExpander }">
        <OrderProductOrderTitle @click="refExpander?.handleToggleExpander" :title="$t('myPage.orderCancel.expectedCancellation')">
          <div class="wf_flex">
            <p class="wf-pr-20">
              <span class="wf-font_17-bold--lh140">{{ expectedCancellationAmount }}</span
              ><span class="wf-font_15--mid">{{ $t('myPage.welfarePoints.won') }}</span>
            </p>
            <div class="wf-transition-03 wf-mr--2" :class="{ 'wf-rotate-180': isExpander }">
              <IconArrowDown />
            </div>
          </div>
        </OrderProductOrderTitle>
      </template>
      <div class="wf-pb-19 border-bb-777 wf-mb-18">
        <div class="wf-mt-17 wf-py-16 wf-px-16 wf-bg--g-f-5-f-6-fa">
          <div class="wf_flex wf_justify-between">
            <div class="wf_flex">
              <p class="wf-pl-6 wf-font_15-mid--lh157 wf-mt--2">{{ $t('myPage.orderDetail.refundPrice.welfarePoints') }}</p>
            </div>
            <div class="wf-pr-2">
              <span class="wf-font_15-reg--lh140 wf-mt--2">{{ listAmountPayment?.welfarePointPaymentAmount ?? 0 }}</span
              ><span class="wf-font_13--mid">{{ $t('myPage.welfarePoints.won') }}</span>
            </div>
          </div>
          <div class="wf_flex wf_justify-between wf-mt-10">
            <div class="wf_flex">
              <p class="wf-pl-6 wf-font_15-mid--lh157">{{ $t('myPage.orderDetail.refundPrice.payingCreditCard') }}</p>
            </div>
            <p class="wf-pr-2">
              <span class="wf-font_15-reg--lh140">{{ listAmountPayment?.creditCartPaymentAmount ?? 0 }}</span
              ><span class="wf-font_13--mid">{{ $t('myPage.welfarePoints.won') }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="wf_flex wf_justify-between">
        <p class="wf-font_15--semi wf-align-content-center">
          {{ $t('myPage.orderCancel.totalCancelAmount') }}
        </p>
        <p class="wf-pr-2">
          <span class="wf-font_17-bold--lh140">{{ listAmountPayment?.welfarePointPaymentAmount }}</span
          ><span class="wf-font_15--mid">{{ $t('myPage.welfarePoints.won') }}</span>
        </p>
      </div>
      <div class="wf-mt-11 wf-mb-17 wf-font_13-reg--lh130 color-777 wf-space-x-3 wf_flex">
        <p class="wf-line-height-1 wf-ml--3">•</p>
        {{ $t('myPage.orderCancel.orderShippingCostEntireOrder') }}
      </div>
    </WelfareExpander>
  </WelfareBox>
  <WelfareLineHorizontal />
  <WelfareBox isPaddingHorizontal>
    <div class="wf_flex wf_justify-between">
      <p class="wf-font_17--bold wf_align-self-center">{{ $t('myPage.inquiryExchangeRequest.deliveryFeeTitle') }}</p>
    </div>
    <div class="">
      <div class="wf_flex wf_justify-between wf-font_15--reg wf-color--g-333 wf-mt-20" v-if="isCheckboxAll">
        <p>{{ $t('myPage.orderCancel.orderShippingCost') }}</p>
        <p>{{ `${orderShippingCost} ${$t('myPage.welfarePoints.won')}` }}</p>
      </div>
      <div v-else class="wf_flex wf_justify-between wf-font_15--reg wf-color--g-333 wf-mt-16">
        <p>{{ $t('myPage.orderCancel.cancelShippingCost') }}</p>
        <p>{{ `${cancelShippingCost} ${$t('myPage.welfarePoints.won')}` }}</p>
      </div>
    </div>
  </WelfareBox>
  <WelfareLineHorizontal />
  <WelfareBox isPaddingHorizontal>
    <div class="border-bb-777 wf-pb-20">
      <div class="wf_flex wf_justify-between wf-font_15--reg wf-color--g-333 wf-mt-20">
        <p>{{ $t('myPage.orderCancel.cancellationProductPrice') }}</p>
        <p>{{ `${productCancelAmount} ${$t('myPage.welfarePoints.won')}` }}</p>
      </div>
      <div class="wf_flex wf_justify-between wf-font_15--reg wf-color--g-333 wf-mt-16">
        <p>{{ $t('myPage.orderCancel.additionalShippingCost') }}</p>
        <p>{{ `${additionalShippingCosts} ${$t('myPage.welfarePoints.won')}` }}</p>
      </div>
    </div>
    <div class="wf_flex wf_justify-between wf-mt-20">
      <span class="wf-font_17--bold wf_align-self-center">{{ $t('myPage.orderCancel.expectedRefundAmount') }}</span>
      <span class="wf-font_23--bold wf-color--f-95729">{{ `${refundAmount} ${$t('myPage.welfarePoints.won')}` }}</span>
    </div>
  </WelfareBox>
  <WelfareLineHorizontal />

  <WelfareBox>
    <div>
      <p class="wf-font_13-reg--lh130 wf-color--g-777">
        {{ $t('myPage.orderCancel.cancelConfirm') }}
      </p>
      <div class="wf-mt-8">
        <WelfareCheckbox :model-value="isCheckedAgree" class="wf-mt-4" @input="onChangeCheckbox(!isCheckedAgree)" />
        <span class="wf-font_15--reg wf-color--g-333 wf-ml-5">{{ $t('myPage.orderCancel.agree') }}.</span>
      </div>
    </div>
    <div class="wf_flex wf-space-x-10 wf_justify-center wf-mt-18">
      <WelfareButtonLine
        @click="handleLinkToDeliveryInquiry"
        lg-state="grey-line"
        class="wf_width-166"
        type="lg"
        :text="$t('myPage.refundInformation.cancelButton')"
      />
      <WelfareButtonLine
        @click="handlePutOrderCancel"
        type="lg"
        :text="$t('myPage.inquiryExchangeRequest.applicationBtnTitle')"
        class="wf_width-166"
      />
    </div>
  </WelfareBox>

  <WelfareLineHorizontal />
  <WelfareBox class="wf-mt-10">
    <p class="wf-font_14--semi color-777">{{ $t('myPage.orderCancel.orderCancellationInformation') }}</p>
    <ul class="wf-mt-20 wf-ml--2 wf-font_13-reg--lh130 wf-color--g-777 wf_flex wf-space-y-8 wf_flex-col">
      <li class="wf_flex wf-space-x-3"><span class="wf-line-height-1">•</span>{{ $t('myPage.orderCancel.orderCancellationContentOne') }}</li>
      <li class="wf_flex wf-space-x-3 wf-mt-2"><span>•</span>{{ $t('myPage.orderCancel.orderCancellationContentTwo') }}</li>
      <li class="wf_flex wf-space-x-3 wf-mt-3"><span>•</span>{{ $t('myPage.orderCancel.orderCancellationContentThree') }}</li>
      <li class="wf_flex wf-space-x-3 wf-mt-3"><span>•</span>{{ $t('myPage.orderCancel.orderCancellationContentFour') }}</li>
    </ul>
  </WelfareBox>
</template>

<style scoped>
@import url('@/assets/styles/views/inquiry/_welfare-inquiry.scss');
</style>
