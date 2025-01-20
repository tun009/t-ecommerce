<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'

interface MyPageProductOrderWrapProps {
  class?: string
  product: ProductModel
  deliveryStatus: string
  showTextReturn?: boolean
  showButtonStatusDelivery?: boolean
  showButtonChangeOptions?: boolean
  showButtonReturnRequest?: boolean
  showButtonNewReview?: boolean
}

interface MyPageProductOrderWrapEmits {
  (e: 'withdraw-order'): void
}

defineEmits<MyPageProductOrderWrapEmits>()

defineProps<MyPageProductOrderWrapProps>()
</script>

<template>
  <div :class="$props.class">
    <div class="wf_height-31 wf_flex wf_items-center wf-mb-10 wf_justify-between">
      <span class="wf-color--f-95729 wf-font_15--mid">{{ $props.deliveryStatus }}</span>
      <WelfareButtonLine v-if="$props.showButtonStatusDelivery" class="wf_width-62" type="sm" text="배송현황" />
    </div>
    <WelfareUnitCard :isDeliveryPage="true" :product="$props.product">
      <template #footer>
        <div class="wf-mt-10" v-if="$props.showTextReturn">
          <p class="wf-font_13--reg wf-color--g-999">{{ $t('myPage.orderDetail.productReturn') }}</p>
        </div>
        <div class="wf_flex wf_justify-end wf-space-x-6">
          <WelfareButtonLine
            v-if="$props.showButtonChangeOptions"
            class="wf_width-69 wf-mt-16 wf-font_15-important"
            smSate
            type="sm"
            text="옵션변경"
          />
          <WelfareButtonLine
            v-if="$props.showButtonReturnRequest"
            class="wf_width-69 wf-mt-16 wf-font_15-important"
            @click="$emit('withdraw-order')"
            smSate
            type="sm"
            text="주문취소"
          />
          <WelfareButtonLine v-if="$props.showButtonNewReview" class="wf_width-81 wf-mt-16 wf-font_15-important" smSate type="sm" text="상품평작성" />
        </div>
      </template>
    </WelfareUnitCard>
  </div>
</template>
