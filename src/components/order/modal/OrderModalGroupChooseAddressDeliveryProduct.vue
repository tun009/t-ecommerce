<script setup lang="ts">
import OrderGroupProductDeliveryAddress from '@/components/order/OrderGroupProductDeliveryAddress.vue'
import WelfareUnitCardOrder from '@/components/uikit/unit/WelfareUnitCardOrder.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import { useOrderChooseDeliveryAddressProduct } from '@/composables/order/useOrderChooseDeliveryAddressProduct'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { OrderCartProductModel, OrderProductMessageAddressDeliveryEnum, StateAddressDelivery } from '@/models/views/order/OrderProductPageModel'
import { onMounted, ref } from 'vue'

interface Props {
  listDeliveryAddress: DeliveryAddressModel[]
  productList: OrderCartProductModel[]
  currentAddressDelivery: DeliveryAddressModel
  stateAddressDelivery?: StateAddressDelivery
  currentTypeAddress?: OrderProductMessageAddressDeliveryEnum
  messageAddress?: string
  index: number
}

type Emits = (e: 'update:product', id?: number, quantity?: number, target?: HTMLInputElement) => void

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const listDeliveryAddressNew = ref(props.listDeliveryAddress)

const {
  currentAddress,
  valueMessageAddress,
  messageAdress,
  stateAddress,
  inputNameCustomer,
  defaultAddressDelivery,
  handleValidateState,
  getDataAddress,
  newAddress,
  getStateAddress,
  getMessageAddress,
  openListAddress
} = useOrderChooseDeliveryAddressProduct(listDeliveryAddressNew, true, true)

onMounted(() => {
  if (props.stateAddressDelivery === 'new') newAddress.value = props.currentAddressDelivery
  if (props.stateAddressDelivery === 'list') currentAddress.value = props.currentAddressDelivery

  stateAddress.value = props.stateAddressDelivery as StateAddressDelivery
  valueMessageAddress.value = props?.currentTypeAddress
  messageAdress.value = props?.messageAddress

  // if (props.messageAddressDelivery && orderProductMessageAddressDeliveryOptions.includes(props.messageAddressDelivery)) {
  //   valueMessageAddress.value = props.messageAddressDelivery
  // } else if (props.messageAddressDelivery) {
  //   valueMessageAddress.value = orderProductMessageAddressDeliveryOptions[orderProductMessageAddressDeliveryOptions.length - 1].value
  //   messageAdress.value = props.messageAddressDelivery ?? ''
  // }
})

defineExpose({
  getValidate: handleValidateState,
  currentAddress: getDataAddress,
  stateAddress: getStateAddress,
  messageAddressDelivery: getMessageAddress
})
</script>
<template>
  <OrderGroupProductDeliveryAddress
    v-model:message-adress="messageAdress"
    v-model:value-message-address="valueMessageAddress"
    v-model:input-name-customer="inputNameCustomer"
    v-model:state-address="stateAddress"
    v-model:current-address="currentAddress"
    v-model:new-address="newAddress"
    @open-list-address="openListAddress"
    :listDeliveryAddress="props.listDeliveryAddress"
    :defaultAddressDelivery="defaultAddressDelivery"
    :is-show-multi-check-box="false"
    :index="index"
  />
  <WelfareBox class="wf-mt-7" :is-padding-vertical="false">
    <div class="wf-order-product-page wf-border-t-element" :id="`wf-delivery-address-${index + 1}`">
      <WelfareUnitCardOrder
        class="wf-py-20"
        v-for="(item, index) in props.productList"
        :key="index"
        :quantity="item.quantity"
        @update:quantity="
          (number: any, target) => {
            emits('update:product', item.product.id, number, target)
          }
        "
        :product="item.product"
      />
    </div>
  </WelfareBox>
  <WelfareBox>
    <p class="wf_text-right wf-color--blue-4075-f-3 wf-font_15--reg">무료배송</p>
  </WelfareBox>
</template>

<style scoped>
@import url('@/assets/styles/views/order/_welfare-order-product-page.scss');
</style>
