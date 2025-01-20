<script setup lang="ts">
import OrderProductOrderTitle from '@/components/order/OrderProductOrderTitle.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import MyPageECouponInformationDelivery from '@/components/myPage/MyPageECouponInformationDelivery.vue'

interface MyPageProductECouponWrapProps {
  class?: string
  product: ProductModel
  index: number
  deliveryStatus: string
  showTextReturn: boolean
  showButtonStatusDelivery?: boolean
  showButtonDetailReturn?: boolean
  showButtonReturnRequest?: boolean
  orderName: string
  senderMessage: string
  phoneNumber: string
  receiverName: string
}

defineProps<MyPageProductECouponWrapProps>()
</script>

<template>
  <p class="wf-font_17--bold wf-color--g-111 wf-pt-20">{{ `${$t('myPage.orderDetail.product')} ${$props.index + 1}` }}</p>
  <div :class="$props.class">
    <div class="wf_flex wf_items-center wf-mb-10 wf_justify-between">
      <span class="wf-color--f-95729 wf-font_15--mid wf-mb-8">{{ $props.deliveryStatus }}</span>
      <WelfareButtonLine v-if="$props.showButtonStatusDelivery" class="wf_width-62" type="sm" text="반품현황" />
    </div>
    <WelfareUnitCard :isDeliveryPage="false" :product="$props.product">
      <template #footer>
        <div class="wf-mt-10" v-if="$props.showTextReturn">
          <p class="wf-font_13--reg wf-color--g-999">{{ $t('myPage.orderDetail.productReturn') }}</p>
        </div>
        <div class="wf_flex wf_justify-end wf-space-x-6">
          <WelfareButtonLine
            v-if="$props.showButtonDetailReturn"
            class="wf_width-69 wf-mt-16 wf-font_15-important"
            smSate
            type="sm"
            text="반품내역"
          />
          <WelfareButtonLine
            v-if="$props.showButtonReturnRequest"
            class="wf_width-69 wf-mt-16 wf-font_15-important"
            smSate
            type="sm"
            text="반품취소"
          />
        </div>
      </template>
    </WelfareUnitCard>
    <WelfareLineHorizontal class="wf-mb-20 wf-mt-20" />
    <WelfareBox>
      <div class="wf_flex wf_justify-between wf_items-center wf-mb-20">
        <OrderProductOrderTitle :title="`${$t('myPage.eCouponOrderDetail.titleInformationDelivery')} ${$props.index + 1}`" rawText/>
      </div>
      <MyPageECouponInformationDelivery
        :order-name="$props.orderName"
        :sender-message="$props.senderMessage"
        :phone-number="$props.phoneNumber"
        :receiver-name="$props.receiverName"
      />
    </WelfareBox>
    <WelfareLineHorizontal class="wf-mt-20" />
  </div>
</template>
