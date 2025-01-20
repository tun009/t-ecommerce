<!--
  FO_MC_CT011000, 
  FO_MC_CT011001P,
  FO_MC_CT011002P,
  FO_MC_CT012000
-->
<script setup lang="ts">
import CartDescription from '@/components/cart/CartDescriptionAndBriefPaymentInfo.vue'
import CartEmptyProducts from '@/components/cart/CartEmptyProducts.vue'
import CartHeader from '@/components/cart/CartHeader.vue'
import CartPaymentInformation from '@/components/cart/CartPaymentInformation.vue'
import CartProductDetail from '@/components/cart/CartProductDetail.vue'
import WelfareLoader from '@/components/uikit/loader/WelfareLoader.vue'
import WelfareLineHorizontalVue from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTopVue from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useCartPage } from '@/composables/cart/useCartPage'

const {
  allProducts,
  selectedProducts,
  cartPaymentInformation,
  isSelectAll,
  isLoadingGetOrderCart,
  handleToggleSelect,
  handleToggleSelectAllProduct,
  handleGetOrderCart
} = useCartPage()
</script>
<template>
  <WelfareTitleTextStickyTopVue :title="$t('cart.title')" displayBackIcon />
  <div class="">
    <CartHeader
      :is-select-all="isSelectAll"
      :handle-get-order-cart="handleGetOrderCart"
      :selected-products="selectedProducts"
      :all-products="allProducts"
      @select-all-product="handleToggleSelectAllProduct"
      @refresh-cart="handleGetOrderCart"
    />
    <div v-if="!isLoadingGetOrderCart" class="wf-bg--g-f-0-f-0">
      <CartEmptyProducts v-if="allProducts.length === 0" />
      <div class="wf-px-16 wf-bg--g-fff" v-else>
        <CartProductDetail
          v-for="(product, index) in allProducts"
          :class="[{ 'wf-border-width-b-1 wf-br--g-e-7': index < allProducts.length - 1 }]"
          :key="product.productKey"
          :dataProduct="product"
          @refresh-cart="() => handleGetOrderCart(false)"
          @toggle-select="handleToggleSelect"
        />
      </div>
      <CartDescription
        :hideCost="allProducts.length === 0"
        :total-shipping-cost="cartPaymentInformation.totalShippingCost"
        :total-payment-without-shipping-cost="cartPaymentInformation.totalPaymentWithoutShippingCost"
      />

      <WelfareLineHorizontalVue />
      <CartPaymentInformation
        :sticky="false"
        :selected-products="selectedProducts"
        :total-discount-amount="cartPaymentInformation.totalDiscountAmount"
        :total-payment="cartPaymentInformation.totalPayment"
        :total-product-amount="cartPaymentInformation.totalProductAmount"
        :total-shipping-cost="cartPaymentInformation.totalShippingCost"
        :total-payment-without-shipping-cost="cartPaymentInformation.totalPaymentWithoutShippingCost"
      />
    </div>
    <div v-else class="wf_w-full wf_flex wf_justify-center wf_height-169 wf_items-center">
      <WelfareLoader />
    </div>
  </div>
  <CartPaymentInformation
    v-if="!isLoadingGetOrderCart"
    sticky
    :selected-products="selectedProducts"
    :total-discount-amount="cartPaymentInformation.totalDiscountAmount"
    :total-payment="cartPaymentInformation.totalPayment"
    :total-product-amount="cartPaymentInformation.totalProductAmount"
    :total-shipping-cost="cartPaymentInformation.totalShippingCost"
    :total-payment-without-shipping-cost="cartPaymentInformation.totalPaymentWithoutShippingCost"
  />
</template>
