<script setup lang="ts">
import { orderProductTextTypeAddressDeliveryOrder } from '@/models/views/order/OrderProductPageModel'
import WelfareColorTag from '../uikit/tag/WelfareColorTag.vue'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'

interface OrderProductDeliveryAdressDefaultProps {
  defaultAddressDelivery: DeliveryAddressModel | undefined
  message?: string
  classContact?: string
}
const props = defineProps<OrderProductDeliveryAdressDefaultProps>()
</script>

<template>
  <div v-if="props.defaultAddressDelivery">
    <div class="wf_flex wf_items-center wf_justify-between">
      <p class="wf-font_15--bold wf-color--g-333">
        {{ props.defaultAddressDelivery.deliveryAddressName }}

        ({{
          props?.defaultAddressDelivery?.deliveryAddressCode
            ? $t(orderProductTextTypeAddressDeliveryOrder[props.defaultAddressDelivery.deliveryAddressCode])
            : ''
        }})
      </p>
      <WelfareColorTag class="wf_width-56" active :text="$t('cardOrder.btnDelivery.default')" />
    </div>
    <div class="wf-mt-15 wf-font_15--reg wf-color--g-333 wf_width-225">
      <p>{{ props.defaultAddressDelivery?.address?.zipCode }}</p>
      <p class="wf-mt-5">{{ props.defaultAddressDelivery?.address?.basicRoad }}</p>
      <p class="wf-mt-5">
        {{ props.defaultAddressDelivery?.address?.basicJibun }}
        {{ props.defaultAddressDelivery?.address?.detail ? `(${props.defaultAddressDelivery?.address?.detail})` : '' }}
      </p>
      <div class="wf_flex wf-space-x-14" :class="classContact ?? 'wf-mt-5 wf-color--g-999 wf-font_13--reg'">
        <span class="wf_letter-spacing--1-4">{{ props.defaultAddressDelivery.deliveryCellphoneNumber }}</span>
        <span v-if="props.defaultAddressDelivery.deliveryTelNumber">|</span>
        <span class="wf_letter-spacing--1-4">{{ props.defaultAddressDelivery.deliveryTelNumber }}</span>
      </div>
      <p :class="classContact ?? 'wf-mt-5'" v-if="props.message">{{ props.message }}</p>
    </div>
  </div>
</template>
