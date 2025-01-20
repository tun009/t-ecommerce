<!-- FO_MC_IT012011 -->
<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareExpander from '@/components/widgets/common/WelfareExpander.vue'
import { ref } from 'vue'
import ProductDetailTitle from '../common/ProductDetailTitle.vue'
import ProductDetailListInfo from '../common/ProductDetailListInfo.vue'
import { SellerCompanyShipmentModel } from '@/models/views/member/SellerCompanyShipment'

interface ProductDetailDeliveryExchangeReturnRefundInfoProps {
  tableInfo?: { title: string; value: string }[]
  deliveryInfo?: string[]
  exchangeReturnInfo?: string[]
  reasonExchangeReturnInfo?: string[]
  exchangeReturnNote?: string[]
  listSellerShipments?: SellerCompanyShipmentModel
}

defineProps<ProductDetailDeliveryExchangeReturnRefundInfoProps>()

const refExpander = ref()
</script>
<template>
  <div>
    <WelfareBox :is-padding-horizontal="false" :is-padding-vertical="false" class="wf-pt-16">
      <WelfareExpander ref="refExpander">
        <template #button="{ isExpander }">
          <OrderProductOrderTitle
            classTitle="wf-font_15--mid"
            class="wf-px-16 wf-pb-16 wf-br-b-1 wf-br--g-e-7"
            @click="refExpander?.handleToggleExpander"
            title="productDetail.deliveryExchangeReturnRefund.title"
          >
            <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
              <IconArrowDown />
            </div>
          </OrderProductOrderTitle>
        </template>
        <div class="wf-pt-21 wf-px-16 wf_flex wf_flex-col wf-space-y-20">
          <!-- <ProductDetailTitle :title="$t('productDetail.deliveryExchangeReturnRefund.title')" />
          <ProductDetailTitle :title="$t('productDetail.deliveryExchangeReturnRefund.shippingReturnUse')" normal />

          <ProductDetailTableInfo class="wf-mt--1" :infos="tableInfoByListSellerShipments" /> -->

          <ProductDetailTitle :title="$t('productDetail.deliveryExchangeReturnRefund.deliveryInfo')" class="wf-mt-1" />
          <ProductDetailListInfo v-if="$props.deliveryInfo" :infos="$props.deliveryInfo" class="wf-pr-12 wf-mt--1" />
          <div
            v-if="$props.listSellerShipments?.deliveryShipment?.deliveryGuideContent"
            class="wf_flex wf_items-center wf_justify-between wf_white-space--pre-line wf_line-height-18 wf-font_13--reg wf-color--g-555"
            v-html="$props.listSellerShipments?.deliveryShipment.deliveryGuideContent ?? ''"
          ></div>

          <ProductDetailTitle :title="$t('productDetail.deliveryExchangeReturnRefund.exchangeReturnInfo')" class="wf-mt-1" />
          <ProductDetailListInfo v-if="$props.exchangeReturnInfo" :infos="$props.exchangeReturnInfo" class="wf-pr-12 wf-mt--1" />
          <div
            v-if="$props.listSellerShipments?.exchangeShipment.periodInfo || $props.listSellerShipments?.returnShipment.periodInfo"
            class="wf_flex wf_items-center wf_justify-between wf_white-space--pre-line wf_line-height-18 wf-font_13--reg wf-color--g-555"
            v-html="
              `${$props.listSellerShipments?.exchangeShipment.periodInfo ? $props.listSellerShipments?.exchangeShipment.periodInfo + '\n' : ''}${$props.listSellerShipments?.returnShipment.periodInfo ?? ''}`
            "
          ></div>

          <ProductDetailTitle :title="$t('productDetail.deliveryExchangeReturnRefund.reasonExchangeReturnInfo')" class="wf-mt-1" />
          <ProductDetailListInfo v-if="$props.reasonExchangeReturnInfo" :infos="$props.reasonExchangeReturnInfo" class="wf-pr-12 wf-mt--1" />

          <div
            v-if="
              $props.listSellerShipments?.exchangeShipment.deliveryGuideContent || $props.listSellerShipments?.returnShipment.deliveryGuideContent
            "
            class="wf_flex wf_items-center wf_justify-between wf_white-space--pre-line wf_line-height-18 wf-font_13--reg wf-color--g-555"
            v-html="
              `${$props.listSellerShipments?.exchangeShipment.deliveryGuideContent ? $props.listSellerShipments?.exchangeShipment.deliveryGuideContent + '\n' : ''}${$props.listSellerShipments?.returnShipment.deliveryGuideContent ?? ''}`
            "
          ></div>

          <!-- <ProductDetailTitle :title="$t('productDetail.deliveryExchangeReturnRefund.exchangeReturnNote')" class="wf-mt-1" />
          <ProductDetailListInfo v-if="$props.exchangeReturnNote" :infos="$props.exchangeReturnNote" class="wf-pr-12 wf-mt--3" /> -->
        </div>
      </WelfareExpander>
    </WelfareBox>
  </div>
</template>
