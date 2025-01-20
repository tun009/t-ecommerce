<script setup lang="ts">
import GroupProductCustomer from '@/components/order/OrderGroupProductCustomer.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'
import OrderBillAddressDelivery from './OrderBillAddressDelivery.vue'
import { OrderEntryResponse } from '@/models/services/responses/order/OrderProductCartResponse'
import { computed } from 'vue'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { formatKoreanPhoneNumber } from '@/commons'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'

interface Props {
  data: OrderEntryResponse
  isMultiAddress?: boolean
  index: number
}

const props = defineProps<Props>()

const address = computed((): DeliveryAddressModel => {
  const deliveryAddress = props.data.deliveryOrderResponse?.deliveryResponse
  return {
    deliveryAddressName: deliveryAddress?.receiverName,
    deliveryCellphoneNumber: formatKoreanPhoneNumber(deliveryAddress?.deliveryCellPhone),
    deliveryTelNumber: formatKoreanPhoneNumber(deliveryAddress?.deliveryTelephone),
    address: {
      detail: deliveryAddress?.deliveryDetailAddress,
      zipCode: deliveryAddress?.deliveryZipCode,
      basicJibun: deliveryAddress?.deliveryStreetAddress,
      basicRoad: deliveryAddress?.deliveryLotAddress
    }
  }
})

const products = computed(() => {
  return (props.data.deliveryOrderResponse?.deliveryProductResponses || []).map((item) => {
    const nameOption = (item.productResponse.productOptionResponses || []).map((option) => {
      return [option.optionSmallName, option.optionLargeName, option.optionMediumName].join(' / ')
    })
    return {
      productImage: item.productResponse.attachfilePathName || '',
      productName: item.productResponse.productName || '',
      quantity: item.orderQuantity || 1,
      pricePromotion: item.productResponse.productPrice || 1,
      nameOption: nameOption.join(', ')
    } as ProductModel
  })
})
</script>

<template>
  <div class="wf-mt--2">
    <WelfareBox>
      <ProductOrderTitle class="wf-mb-20" :title="`cardOrder.titleDeliveryOrder`" :options="isMultiAddress ? { index } : undefined" />
      <OrderBillAddressDelivery
        v-if="address"
        :delivery-address="address"
        :hideDefaultTag="false"
        :message-address-delivery="data.deliveryOrderResponse?.deliveryResponse?.deliveryRequestContent ?? ''"
      />
    </WelfareBox>
    <div v-if="isMultiAddress">
      <GroupProductCustomer
        class-button="wf-mt--4"
        class="wf-border-first-e wf-pt-9--i"
        :is-show-title="false"
        v-if="props?.data"
        :size="3"
        :product-list="products"
      />
    </div>
  </div>
  <WelfareLineHorizontal />
</template>
