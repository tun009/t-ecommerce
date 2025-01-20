<!-- FO_MC_OC013000 -->
<script setup lang="ts">
import OrderCompleteGroupDeliveryProductAddress from '@/components/order/OrderCompleteGroupDeliveryProductAddress.vue'
import GroupBillingInformation from '@/components/order/OrderGroupBillingInformation.vue'
import GroupOrderCompletedHeader from '@/components/order/OrderGroupOrderCompletedHeader.vue'
import OrderGroupOrderPricePayment from '@/components/order/OrderGroupOrderPricePayment.vue'
import GroupProductCustomer from '@/components/order/OrderGroupProductCustomer.vue'
import ProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useOrderCompletedDeliveryPage } from '@/composables/order/useOrderCompletedDeliveryPage'

const { paymentInformationList, priceInfoBill, totalPayment, goToHome, listCardBill, isNoMember, completeOrder, orderInfo } =
  useOrderCompletedDeliveryPage()
</script>
<template>
  <div>
    <WelfareTitleTextStickyTop displayBackIcon displayHomeLeftIcon displaySearchIcon displayCartIcon title="주문완료" />
    <GroupOrderCompletedHeader
      :is-member="!isNoMember"
      :order-key="orderInfo?.orderKey"
      :orderer-name="orderInfo?.ordererName ?? ''"
      :status="false"
    />
    <GroupProductCustomer
      class="wf-mt--3"
      :class-button="`${isNoMember ? 'wf-mt--4' : 'wf-mt--5'}`"
      v-if="listCardBill.length"
      :size="2"
      :product-list="listCardBill"
    />
    <WelfareLineHorizontal />
    <OrderCompleteGroupDeliveryProductAddress
      v-for="(item, index) in orderInfo?.myPageOrderEntryResponses"
      :key="index"
      :index="index + 1"
      :isMultiAddress="(orderInfo?.myPageOrderEntryResponses || []).length > 1"
      :data="item"
    />
    <WelfareBox v-if="totalPayment" :is-padding-vertical="false" :class="`wf-pt-18`">
      <ProductOrderTitle v-if="paymentInformationList.length" :title="$t('orderCompleted.methodTitle')" />
      <div class="wf-mb-5" v-for="(item, index) in paymentInformationList" :key="index">
        <GroupBillingInformation :isBorderBottom="index != paymentInformationList.length - 1" :method="item.method" :cardCompany="item.cardCompany" />
      </div>
    </WelfareBox>
    <WelfareLineHorizontal v-if="paymentInformationList.length && totalPayment" class="wf-mt--5" />
    <OrderGroupOrderPricePayment
      v-if="priceInfoBill"
      :isMember="false"
      :total-price-before-discount="priceInfoBill.totalPrice"
      :cost-delivery="priceInfoBill.costDelivery"
      :price-save-point="priceInfoBill.priceSavePoint"
      :total-price-discount="priceInfoBill.priceVoucher"
      :total-price-payment="totalPayment ?? 0"
      :discounts="priceInfoBill.discounts"
      :use-point-discounts="priceInfoBill.usePointDiscounts"
      :is-show-hint-payment="false"
    />
    <div class="wf_flex wf_justify-between wf-space-x-10 wf-pb-10 wf-pt-19 wf-px-16">
      <WelfareButtonLine @click="goToHome" class="wf_flex-1" lg-state="black-line" type="lg" text="홈으로 이동" />
      <WelfareButtonLine @click="completeOrder" class="wf_flex-1" type="lg" text="주문배송조회" />
    </div>
  </div>
</template>
