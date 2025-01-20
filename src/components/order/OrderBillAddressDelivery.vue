<script setup lang="ts">
import { orderProductTextTypeAddressDeliveryOrder } from '@/models/views/order/OrderProductPageModel'
import WelfareColorTag from '@/components/uikit/tag/WelfareColorTag.vue'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
interface Props {
  deliveryAddress: DeliveryAddressModel
  messageAddressDelivery?: string
  hideDefaultTag?: boolean
}
const props = defineProps<Props>()
</script>
<template>
  <div v-if="props.deliveryAddress">
    <div class="wf_flex wf_items-center wf_justify-between">
      <p class="wf-font_15--bold wf-color--g-333">
        {{ props.deliveryAddress.deliveryAddressName }}

        {{
          props.deliveryAddress?.deliveryAddressCode ? `(${orderProductTextTypeAddressDeliveryOrder[props.deliveryAddress.deliveryAddressCode]})` : ''
        }}
      </p>
      <WelfareColorTag v-if="!props.hideDefaultTag" class="wf_width-56" active :text="$t('cardOrder.btnDelivery.default')" />
    </div>
    <div class="wf-mt-17 wf-font_15--reg wf-color--g-333 wf_width-225">
      <p>{{ props.deliveryAddress.address?.zipCode }}</p>
      <p class="wf-mt-7">{{ props.deliveryAddress.address?.basicRoad }}</p>
      <p class="wf-mt-7 line-clamp-2">{{ props.deliveryAddress.address?.basicJibun }} {{ props.deliveryAddress.address?.detail }}</p>
      <div class="wf_flex wf-space-x-9 wf-mt-5 wf-font_13--reg wf-color--g-333">
        <span>{{ props.deliveryAddress.deliveryCellphoneNumber }}</span>
        <span class="wf-color--g-999" v-if="props.deliveryAddress.deliveryTelNumber">|</span>
        <span>{{ props.deliveryAddress.deliveryTelNumber }}</span>
      </div>
      <p class="wf-mt-9 wf-color--g-333" v-if="props.messageAddressDelivery">{{ props.messageAddressDelivery }}</p>
    </div>
  </div>
</template>
