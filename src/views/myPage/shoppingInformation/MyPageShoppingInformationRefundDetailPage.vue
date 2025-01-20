<!-- FO_MC_MY016008 -->
<script setup lang="ts">
import { DEFAULT_DATE_FORMAT_DOT } from '@/commons'
import MyPageOrderShortInfo from '@/components/myPage/common/MyPageOrderShortInfo.vue'
import MyPageShoppingInformationProductOrder from '@/components/myPage/shoppingInformation/MyPageShoppingInformationProductOrder.vue'
import OrderBillAddressDelivery from '@/components/order/OrderBillAddressDelivery.vue'
import OrderGroupRefundPricePayment from '@/components/order/OrderGroupRefundPricePayment.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useMyPageShoppingInformationRefundDetail } from '@/composables/myPage/useMyPageShoppingInformationRefundDetail'

const { products, orderInformation, refundBill, totalRefund, orderRefundResponseDetail } = useMyPageShoppingInformationRefundDetail()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :title="$t('myPage.shoppingInformation.refund.title')" display-back-icon display-cart-icon display-search-icon />
    <div class="wf-relative">
      <MyPageOrderShortInfo
        :order-date="orderInformation?.orderDate || DEFAULT_DATE_FORMAT_DOT"
        :order-number="orderInformation?.orderNumber || ''"
      />
      <div class="wf-pt-20" v-for="(orderProduct, index) in products" v-bind:key="index">
        <div class="wf-px-16">
          <p class="wf-font_17--bold wf-color--g-111 wf-mb--8">
            {{ $t('myPage.shoppingInformation.refund.product') + (index > 0 ? index + 1 : '') }}
          </p>
          <MyPageShoppingInformationProductOrder
            v-for="(product, indexProduct) in orderProduct.products"
            v-bind:key="indexProduct"
            :class="`wf-pt-20 wf-pb-19 ${indexProduct < orderProduct.products.length - 1 && 'wf-br-b-1 wf-br--g-e-7'}`"
            :isDeliveryPage="true"
            :product="product.product"
            :quantity="product.refundQuantity"
            :reason="product.reason ?? ''"
            :hiddenOptions="true"
          />
        </div>
        <WelfareLineHorizontal />
        <WelfareBox>
          <div class="wf_flex wf_justify-between wf_items-center wf-mb-20">
            <OrderProductOrderTitle :title="`myPage.shoppingInformation.refund.collectionLocationInformation`" />
          </div>
          <OrderBillAddressDelivery
            v-if="orderProduct.deliveryAddress"
            :hideDefaultTag="true"
            :delivery-address="orderProduct.deliveryAddress"
            :message-address-delivery="orderProduct.messageAddressDelivery"
          />
        </WelfareBox>
        <WelfareLineHorizontal />
      </div>
      <div class="wf-relative">
        <div class="wf-px-16 wf_height-57 wf_flex wf_items-center wf_justify-between">
          <p class="wf-color--g-111 wf-mt-2 wf-font_17--bold">{{$t('myPage.shoppingInformation.refund.fee')}}</p>
          <p class="wf-color--g-111 wf-mt-11 wf_letter-spacing--1 wf-font_15--reg">{{ orderRefundResponseDetail?.refundDeliveryAmount ?? 0 }} {{  $t('common.won') }}</p>
        </div>
        <WelfareLineHorizontal />
      </div>

      <OrderGroupRefundPricePayment
        hiddenDeposit
        hiddenReserves
        :welfarePoints="refundBill?.priceSavePoint ?? 0"
        :payingCreditCard="refundBill?.priceVoucher ?? 0"
        :totalRefund="totalRefund"
      />
    </div>
  </div>
</template>
