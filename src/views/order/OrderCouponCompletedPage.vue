<!-- FO_MC_OC013000, FO_MC_OC011000 -->
<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import ProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import GroupBillingInformation from '@/components/order/OrderGroupBillingInformation.vue'
import InformationRecipient from '@/components/order/OrderInformationRecipient.vue'
import GroupOrderCompletedHeader from '@/components/order/OrderGroupOrderCompletedHeader.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import { useOrderCompletedPage } from '@/composables/order/useOrderCompletedPage'
import OrderGroupOrderPricePayment from '@/components/order/OrderGroupOrderPricePayment.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import GroupProductCustomer from '@/components/order/OrderGroupProductCustomer.vue'

const { t, receivers, paymentInformationList, priceInfoBill, totalPayment, goToHome, completeOrder, orderInfo, listCardBill } =
  useOrderCompletedPage()
</script>
<template>
  <div>
    <WelfareTitleTextStickyTop :title="t('orderCompleted.title')" displayBackIcon displayHomeLeftIcon displaySearchIcon displayCartIcon />
    <GroupOrderCompletedHeader is-e-coupon :is-member="true" :order-key="orderInfo?.orderKey" :orderer-name="orderInfo?.ordererName ?? ''" />
    <!--        <ProductOrderTitle class="wf-pt-17 wf-px-16" :title="t('orderCompleted.productTitle')"/>-->
    <!--        <div v-for="(item, index) in orderProducts" :key="index">-->
    <!--          <div class="wf-px-16 wf-pb-10 wf-pt-12">-->
    <!--            <hr v-if="index != 0" class="wf-bg&#45;&#45;g-f-0-f-0 wf-mb-20 wf_height-1"/>-->
    <!--            <WelfareUnitCardStateCustomer :product="item.product"/>-->
    <!--          </div>-->
    <!--        </div>-->
    <GroupProductCustomer class="wf-mt--3" v-if="listCardBill.length" :size="2" :product-list="listCardBill" />
    <WelfareLineHorizontal class="wf-mt-5" />
    <div class="wf-px-16 wf-mt-22 wf-mb-20">
      <div v-for="(item, index) in receivers" :key="index" class="wf-mt-16-5">
        <InformationRecipient
          :isBorderBottom="index != receivers.length - 1"
          :nameTitle="item.nameTitle"
          :describe="item.describe"
          :name="item.name"
          :phone="item.phone"
        />
      </div>
    </div>
    <WelfareLineHorizontal />
    <div class="wf-px-16 wf-pt-20" v-if="totalPayment">
      <ProductOrderTitle :title="t('orderCompleted.methodTitle')" />
      <div class="wf-mb-5" v-for="(item, index) in paymentInformationList" :key="index">
        <GroupBillingInformation :isBorderBottom="index != paymentInformationList.length - 1" :method="item.method" :cardCompany="item.cardCompany" />
      </div>
    </div>
    <WelfareLineHorizontal v-if="totalPayment" class="wf-mt--5" />
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
    />
    <div class="wf_flex wf_justify-between wf-space-x-10 wf-pb-10 wf-pt-20 wf-px-16">
      <WelfareButtonLine @click="goToHome" class="wf_flex-1" lg-state="black-line" type="lg" :text="t('orderCompleted.buttonBack')" />
      <WelfareButtonLine @click="completeOrder" class="wf_flex-1" type="lg" :text="t('orderCompleted.buttonOrder')" />
    </div>
  </div>
</template>
