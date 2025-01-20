<script setup lang="ts">
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import { useCartPaymentInformation } from '@/composables/cart/useCartPaymentInformation'
import { CartProductModel } from '@/models/views/cart/CartProductModel'
import { formatNumberDot } from '@/commons'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'

export interface CartPaymentInformationProps {
  totalProductAmount: number
  totalDiscountAmount: number
  totalShippingCost: number
  totalPayment: number
  totalPaymentWithoutShippingCost: number
  selectedProducts: CartProductModel[]
  sticky?: boolean
}
const props = defineProps<CartPaymentInformationProps>()
const { handleClickOrderProducts } = useCartPaymentInformation(props)
</script>

<template>
  <WelfareBox v-if="!sticky">
    <div class="wf-font_17--bold">{{ $t('cart.payment.title') }}</div>
    <div class="wf_flex wf-mt-20 wf_width-full wf_items-center wf_justify-between wf-pb-20">
      <div class="wf-font_15--reg">{{ $t('cart.payment.totalProduct') }}</div>
      <div class="wf-font_15--bold">{{ formatNumberDot(props.totalProductAmount) ?? 0 }} {{ $t('common.won') }}</div>
    </div>
    <div class="wf_flex wf_width-full wf_items-center wf_justify-between wf-pb-20">
      <div class="wf-font_15--reg">{{ $t('cart.payment.totalDiscount') }}</div>
      <div class="wf-font_15--bold wf-color--f-95729">- {{ formatNumberDot(props.totalDiscountAmount) ?? 0 }} {{ $t('common.won') }}</div>
    </div>
    <div class="wf_flex wf_width-full wf_items-center wf_justify-between">
      <div class="wf-font_15--reg">{{ $t('cart.payment.totalShippingCost') }}</div>
      <div class="wf-font_15--bold">{{ formatNumberDot(props.totalShippingCost) ?? 0 }} {{ $t('common.won') }}</div>
    </div>
  </WelfareBox>
  <div
    v-if="sticky"
    class="wf_flex-order-999 wf_index-2 wf-bg-white wf-sticky-bottom wf-br-t-1 wf-br--g-e-7 wf-bg--white wf-px-16 wf-py-20 wf_flex wf_justify-between wf_items-center wf-bg--white wf_w-full wf_height-80"
  >
    <div>
      <div class="wf-color--f-95729">
        <span class="wf-font_23--bold">{{ formatNumberDot(props.totalPayment) ?? 0 }}</span> {{ $t('common.won') }}
      </div>
      <div class="wf-mt-9 wf-color--g-555" v-if="props.totalShippingCost">
        {{ $t('cart.payment.paymentShippingCost') }} : {{ formatNumberDot(props.totalShippingCost) }} {{ $t('common.won') }}
        {{ $t('cart.payment.include') }}
      </div>
    </div>
    <div>
      <WelfareButtonLine
        :disabled="props.selectedProducts.length === 0"
        @click="
          () =>
            handleClickOrderProducts(
              selectedProducts[0].cartKey,
              selectedProducts.map((item) => item.cartProductKey)
            )
        "
        lg-state="default"
        type="lg"
        :text="$t('cart.payment.orderSelectedProduct')"
      />
    </div>
  </div>
</template>
