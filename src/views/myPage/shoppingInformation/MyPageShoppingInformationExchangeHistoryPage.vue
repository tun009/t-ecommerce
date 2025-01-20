<!-- FO_MC_MY016009 -->
<script setup lang="ts">
import { DEFAULT_DATE_FORMAT_DOT } from '@/commons'
import MyPageShoppingInformationShortInfo from '@/components/myPage/shoppingInformation/MyPageShoppingInformationShortInfo.vue'
import MyPageShoppingInformationProductOrder from '@/components/myPage/shoppingInformation/MyPageShoppingInformationProductOrder.vue'
import OrderBillAddressDelivery from '@/components/order/OrderBillAddressDelivery.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import WelfareViewPrice from '@/components/uikit/product/WelfareViewPrice.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useMyPageShoppingInformationExchangeHistory } from '@/composables/myPage/useMyPageShoppingInformationExchangeHistory'

const { products, totalPayment, orderInformation,orderDeliveryAddress } = useMyPageShoppingInformationExchangeHistory()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop
      :title="$t('myPage.shoppingInformation.exchangeHistory.title')"
      display-back-icon
      display-cart-icon
      display-search-icon
    />
    <div class="wf-relative">
      <MyPageShoppingInformationShortInfo
        :order-date="orderInformation?.orderDate || DEFAULT_DATE_FORMAT_DOT"
        :order-number="orderInformation?.orderNumber || ''"
      />
      <div class="wf-pt-20">
        <div class="wf-px-16">
          <p class="wf-font_17--bold wf-color--g-111 wf-mb--8">
            {{ $t('myPage.shoppingInformation.exchangeHistory.product')}}
          </p>
          <MyPageShoppingInformationProductOrder
            v-for="(product, indexProduct) in products"
            v-bind:key="indexProduct"
            :class="`wf-pt-20 wf-pb-19 ${indexProduct < products.length - 1 && 'wf-br-b-1 wf-br--g-e-7'}`"
            :isDeliveryPage="true"
            :product="product.product ?? {}"
            :reason="product.reasonForExchange"
            :options="product.exchangeOption"
            :quantity = "product.exchangeQuantity"
            :claim-process-status = "product.claimProcessStatus"
            display-exchange-application-tag
            :title-options="$t('myPage.shoppingInformation.exchangeHistory.exchangeOption')"
            :title-quantity="$t('myPage.shoppingInformation.exchangeHistory.exchangeQuantity')"
            :title-reason="$t('myPage.shoppingInformation.exchangeHistory.exchangeReason')"
          />
        </div>
        <WelfareLineHorizontal />
      </div>
      <WelfareBox>
        <div class="wf_flex wf_justify-between wf_items-center wf-mb-20">
          <OrderProductOrderTitle :title="`myPage.shoppingInformation.exchangeHistory.collectionLocationInformation`" />
        </div>
        <OrderBillAddressDelivery
          v-if="orderDeliveryAddress"
          :hideDefaultTag="true"
          :delivery-address="orderDeliveryAddress"
        />
      </WelfareBox>
      <WelfareLineHorizontal />
      <div class="wf-px-16">
        <div class="wf_flex wf-py-20 wf_items-center wf_justify-between">
          <span class="wf-font_17--bold wf-color--g-111 wf-mt-10">{{ $t('myPage.shoppingInformation.exchangeHistory.exchangeShippingFee') }}</span>
          <WelfareViewPrice :price="totalPayment" class="wf-font_15--mid wf-color_i--f-95729" class-price="wf-font_23--bold" />
        </div>
      </div>
    </div>
  </div>
</template>
