<script setup lang="ts">
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { computed } from 'vue'
// import ProductOrderTitle from './OrderProductOrderTitle.vue'
import WelfareUnitCardStateDelivery from '../uikit/unit/WelfareUnitCardStateDelivery.vue'
import WelfareBox from '../widgets/common/WelfareBox.vue'
interface GroupProductCustomerProps {
  productList: ProductModel[]
  classButton?: string
  size?: number
  isShowTitle?: boolean
}
const props = withDefaults(defineProps<GroupProductCustomerProps>(), {
  size: 3,
  isShowTitle: true
})
const data = computed(() => {
  return props.productList
})
// const isExpanded = ref(false)
</script>

<template>
  <WelfareBox>
    <div class="wf-order-product-page">
      <WelfareUnitCardStateDelivery
        v-for="(item, index) in data"
        :key="index"
        :product="item"
        :is-button-option="true"
        :is-delivery-page="true"
        :is-button-state-delivery="true"
      />
    </div>
  </WelfareBox>
</template>

<style scoped>
@import url('@/assets/styles/views/order/_welfare-order-product-page.scss');
</style>
