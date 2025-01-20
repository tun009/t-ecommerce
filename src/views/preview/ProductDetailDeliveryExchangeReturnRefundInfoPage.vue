<!-- FO_MC_IT012011 -->
<script setup lang="ts">
import ProductDetailDeliveryExchangeReturnRefundInfo from '@/components/products/detail/deliveryExchangeReturnRefund/ProductDetailDeliveryExchangeReturnRefundInfo.vue'
import { useProductDetailDeliveryExchangeReturnRefundInfoView } from '@/composables/products/detail/productDetail/useProductDetailDeliveryExchangeReturnRefundInfoView'

const { tableInfo, deliveryInfo, exchangeReturnInfo, reasonExchangeReturnInfo, exchangeReturnNote } =
  useProductDetailDeliveryExchangeReturnRefundInfoView()
</script>
<template>
  <ProductDetailDeliveryExchangeReturnRefundInfo
    :tableInfo="tableInfo"
    :deliveryInfo="deliveryInfo"
    :exchangeReturnInfo="exchangeReturnInfo"
    :reasonExchangeReturnInfo="reasonExchangeReturnInfo"
    :exchangeReturnNote="exchangeReturnNote"
  />
</template>
