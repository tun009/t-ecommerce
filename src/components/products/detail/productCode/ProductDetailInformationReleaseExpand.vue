<!-- FO_MC_IT012016 -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareExpander from '@/components/widgets/common/WelfareExpander.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import { useRoute } from 'vue-router'
import { ProductDetailInformationReleaseModel } from '@/models/services/responses/products/detail/ProductDetailProductCodeResponse'
import ProductDetailTitle from '../common/ProductDetailTitle.vue'
import { productDetailProductCodeTabApi } from '@/services/api/products/detail/ProductDetailProductCodeTabApi'

const refExpander = ref()

interface ProductDetailInformationReleaseProps {
  title: string
}
const props = defineProps<ProductDetailInformationReleaseProps>()
const router = useRoute()
const productInformationRelease = ref<ProductDetailInformationReleaseModel>()
onMounted(() => {
  if (router.query?.productKey) {
    productDetailProductCodeTabApi
      .getProductInformationRelease(Number(router.query.productKey))
      .then((res) => {
        productInformationRelease.value = res.data
      })
      .catch(() => {
        //hanlde error
      })
  }
})
</script>
<template>
  <WelfareBox :is-padding-horizontal="false" :is-padding-vertical="false" class="wf-pt-16">
    <WelfareExpander ref="refExpander">
      <template #button="{ isExpander }">
        <OrderProductOrderTitle
          classTitle="wf-font_15--mid"
          class="wf-px-16 wf-pb-16 wf-br-b-1 wf-br--g-e-7"
          @click="refExpander?.handleToggleExpander"
          :title="props.title"
        >
          <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
            <IconArrowDown />
          </div>
        </OrderProductOrderTitle>
      </template>
      <div class="wf-pt-21 wf-px-16 wf_flex wf_flex-col wf-space-y-20 wf-mb-16">
        <ProductDetailTitle title="교환/반품 기간" class="wf-mt-1" />
        <div
          v-html="productInformationRelease?.exchangeReturnPeriodContents"
          class="wf-pr-12 wf-mt--1 wf_line-height-18 wf-font_13--reg wf-color--g-555"
        ></div>
        <ProductDetailTitle title="교환/반품 안내" class="wf-mt-1" />
        <div
          v-html="productInformationRelease?.exchangeReturnWarningContents"
          class="wf-pr-12 wf-mt--1 wf_line-height-18 wf-font_13--reg wf-color--g-555"
        ></div>
        <ProductDetailTitle title="교환/반품 불가 안내" class="wf-mt-1" />
        <div
          v-html="productInformationRelease?.exchangeReturnContents"
          class="wf-pr-12 wf-mt--1 wf_line-height-18 wf-font_13--reg wf-color--g-555"
        ></div>
      </div>
    </WelfareExpander>
  </WelfareBox>
</template>
