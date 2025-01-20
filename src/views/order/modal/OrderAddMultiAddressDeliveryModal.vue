<!-- FO_MC_OR012000 -->
<script setup lang="ts">
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import OrderModalGroupChooseAddressDeliveryProduct from '@/components/order/modal/OrderModalGroupChooseAddressDeliveryProduct.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import InfiniteLoadingData from '@/components/widgets/InfiniteLoadingData.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useOrderChooseMultiDeliveryAddress } from '@/composables/order/modal/useOrderChooseMultiDeliveryAddress'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { OrderCartGroupDeliveryAddressModel, orderProductListDataCountAddressDelivery } from '@/models/views/order/OrderProductPageModel'

interface Props {
  listDeliveryAddress: DeliveryAddressModel[]
  cartProductDelivery?: OrderCartGroupDeliveryAddressModel[]
  products: ProductModel[]
}

interface Emits {
  (e: 'close'): void
  (e: 'save', listDeliveryAddress: OrderCartGroupDeliveryAddressModel[]): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const {
  handleChooseCountAddress,
  countAddressDelivery,
  listAddressLoad,
  listCartDelivery,
  handleUpdateQuantity,
  handleSave,
  refAddressDeliveryList
} = useOrderChooseMultiDeliveryAddress(props.listDeliveryAddress, props.cartProductDelivery, props.products)
</script>
<template>
  <div class="wf-bg--g-fff wf-overflow-scroll-full--y wf_width-screen wf-relative" id="wf-add-multi-delivery">
    <WelfareTitleTextStickyTop
      :display-close-icon="true"
      @on-click-close="
        () => {
          emits('close')
        }
      "
      :title="$t('cardOrder.titleChooseAddress')"
    />
    <WelfareBox>
      <div class="wf-px-4">
        <OrderProductOrderTitle title="cardOrder.orderAddDelivery.titleCount" />
        <WelfareSelect
          option-label="label"
          class="wf-mt-13"
          :model-value="countAddressDelivery"
          @update:model-value="handleChooseCountAddress"
          :options="orderProductListDataCountAddressDelivery"
        />
      </div>
    </WelfareBox>
    <WelfareLineHorizontal />
    <InfiniteLoadingData
      @infinite="listAddressLoad"
      target="wf-add-multi-delivery"
      :stop-scroll="listCartDelivery.length >= +countAddressDelivery.value"
    >
      <div class="wf-mt--1" v-for="(item, index) in listCartDelivery" :key="`${countAddressDelivery.value}-${index}`">
        <OrderModalGroupChooseAddressDeliveryProduct
          ref="refAddressDeliveryList"
          :index="index + 1"
          :list-delivery-address="props.listDeliveryAddress"
          :current-address-delivery="item.deliveryAddress"
          :state-address-delivery="item.typeDelivery"
          :message-address-delivery="item.messageAddressDelivery"
          :current-type-address="item?.messageTypeAddressDelivery"
          :product-list="item.products"
          @update:product="(id, quantity, target) => handleUpdateQuantity(index, id, quantity, target)"
        />
        <WelfareLineHorizontal v-if="index < +countAddressDelivery.value - 1" />
      </div>
    </InfiniteLoadingData>
    <div
      class="wf_width-full wf_min-height-61 wf-bg--g-111 wf-space-x-2 wf-color--g-fff wf_justify-center wf_items-center wf_flex wf-font_21--bold"
      @click="
        () =>
          handleSave((data: OrderCartGroupDeliveryAddressModel[]) => {
            emits('save', data)
          })
      "
      type="lg"
      lg-state="grey-line"
      active
    >
      저장하기
    </div>
  </div>
</template>
