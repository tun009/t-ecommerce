<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { MyPageStatusDeliveryOrder, myPageListMessageStatusDelivery } from '@/models/views/myPage/MyPageMainMemberModel'

interface MyPageSyntheticProductOrderProps {
  class?: string
  product: ProductModel
  finalOrderStatus: MyPageStatusDeliveryOrder
  showTextReturn?: boolean
  showButtonStatusDelivery?: boolean
}

interface MyPageSyntheticProductOrderEmit {
  (e: 'clickButtonStatusDelivery'): void
  (e: 'clickWithDrawOrder'): void
  (e: 'clickExchangeRequest'): void
  (e: 'clickReturnRequest'): void
  (e: 'clickWriteProductReview'): void
}

const props = defineProps<MyPageSyntheticProductOrderProps>()
const emit = defineEmits<MyPageSyntheticProductOrderEmit>()
</script>

<template>
  <div :class="$props.class">
    <div class="wf_height-31 wf_flex wf_items-center wf-mb-10 wf_justify-between">
      <span class="wf-color--f-95729 wf-font_15--mid">{{ myPageListMessageStatusDelivery[props.finalOrderStatus] }}</span>
      <WelfareButtonLine
        v-if="
          $props.showButtonStatusDelivery &&
          (props.finalOrderStatus == MyPageStatusDeliveryOrder.DELIVERY ||
            props.finalOrderStatus == MyPageStatusDeliveryOrder.DELIVERY_COMPLETE ||
            props.finalOrderStatus == MyPageStatusDeliveryOrder.EXCHANGE_DELIVERY)
        "
        class="wf_width-62"
        type="sm"
        :text="$t('myPage.orderDetail.deliveryStatus')"
        @click="() => emit('clickButtonStatusDelivery')"
      />
      <WelfareButtonLine
        v-else-if="props.finalOrderStatus == MyPageStatusDeliveryOrder.EXCHANGE_RECEIPT"
        class="wf_width-62"
        type="sm"
        :text="$t('myPage.orderDetail.btnExchangeProduct')"
      />
      <WelfareButtonLine
        v-else-if="
          props.finalOrderStatus == MyPageStatusDeliveryOrder.EXCHANGE_PRODUCT_PICKUP_COMPLETE ||
          props.finalOrderStatus == MyPageStatusDeliveryOrder.RETURN_PICKUP
        "
        class="wf_width-62"
        type="sm"
        :text="$t('myPage.orderDetail.btnRecoveredProduct')"
      />
    </div>
    <WelfareUnitCard :isDeliveryPage="true" :product="$props.product">
      <template #footer>
        <div class="wf-mt-10" v-if="$props.showTextReturn">
          <p class="wf-font_13--reg wf-color--g-999">{{ $t('myPage.orderDetail.productReturn') }}</p>
        </div>
        <div
          class="wf_flex wf_justify-end wf-space-x-6"
          v-if="
            props.finalOrderStatus === MyPageStatusDeliveryOrder.PAYMENT_COMPLETE ||
            props.finalOrderStatus === MyPageStatusDeliveryOrder.PRODUCT_PREPARATION ||
            props.finalOrderStatus === MyPageStatusDeliveryOrder.ISSUE_FAIL ||
            props.finalOrderStatus === MyPageStatusDeliveryOrder.ISSUE_COMPLETE
          "
        >
          <WelfareButtonLine
            class="wf_width-69 wf-mt-16 wf-font_15-important"
            @click="() => emit('clickWithDrawOrder')"
            smSate
            type="sm"
            :text="$t('myPage.orderDetail.withDrawOrder')"
          />
        </div>
        <div class="wf_flex wf_justify-end wf-space-x-6" v-if="props.finalOrderStatus === MyPageStatusDeliveryOrder.DELIVERY_COMPLETE">
          <WelfareButtonLine
            class="wf_width-69 wf-mt-16 wf-font_15-important"
            @click="() => emit('clickExchangeRequest')"
            smSate
            type="sm"
            :text="$t('myPage.orderDetail.exchangeRequest')"
          />
          <WelfareButtonLine
            class="wf_width-69 wf-mt-16 wf-font_15-important"
            @click="() => emit('clickReturnRequest')"
            smSate
            type="sm"
            :text="$t('myPage.orderDetail.returnRequest')"
          />
          <WelfareButtonLine
            class="wf_width-81 wf-mt-16 wf-font_15-important"
            @click="() => emit('clickWriteProductReview')"
            smSate
            type="sm"
            :text="$t('myPage.orderDetail.writeProductReivew')"
          />
        </div>
      </template>
    </WelfareUnitCard>
  </div>
</template>
