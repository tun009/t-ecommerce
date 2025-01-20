<script setup lang="ts">
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { computed, ref } from 'vue'
import ProductOrderTitle from './OrderProductOrderTitle.vue'
import WelfareUnitCardStateCustomer from '../uikit/unit/WelfareUnitCardStateCustomer.vue'
import WelfareButtonFull from '../uikit/button/WelfareButtonFull.vue'
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
  return !isExpanded.value ? props.productList.slice(0, props.size) : props.productList
})
const isExpanded = ref(false)
</script>

<template>
  <WelfareBox>
    <ProductOrderTitle v-if="isShowTitle" title="cardOrder.titleOrderProduct" />
    <div class="wf-order-product-page">
      <WelfareUnitCardStateCustomer v-for="(item, index) in data" :key="index" :product="item" />
    </div>
    <WelfareButtonFull
      :class="classButton ?? ''"
      v-if="props?.productList.length > props.size"
      @click="isExpanded = !isExpanded"
      :isRotate="isExpanded"
      :text="isExpanded ? $t('button.btnCollapse') : $t('button.btnExpander')"
      active
    />
  </WelfareBox>
</template>

<style scoped>
@import url('@/assets/styles/views/order/_welfare-order-product-page.scss');
</style>
