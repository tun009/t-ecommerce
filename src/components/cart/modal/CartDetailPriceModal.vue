<!-- FO_MC_CT011004P -->
<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import { CartDetailPriceModel } from '@/models/views/cart/modal/CartDetailPriceModel'
import { formatNumberDot } from '../../../commons'

interface CartDetailPriceModalProps {
  closeModalByPop: () => void
  detailPrice: CartDetailPriceModel
}
const props = defineProps<CartDetailPriceModalProps>()
</script>

<template>
  <div class="wf_modal-width wf_modal-max-height wf-bg--g-fff wf_flex wf_flex-col wf-px-16 wf-pt-10 wf-pb-30 wf-space-y-20 wf-pb-20-important">
    <WelfareTitleModal
      class="wf-pt-10 wf-pb-15"
      classTitle=" wf_letter-spacing--0745 "
      :title="props.detailPrice.productName"
      @close="props.closeModalByPop"
    />
    <div class="wf_w-full wf_flex wf_justify-between wf-color--g-111">
      <span class="wf-font_15--bold">{{ $t('cart.detailPriceModal.price') }}</span>
      <span>{{ formatNumberDot(props.detailPrice.totalPrice) }} {{ $t('common.won') }}</span>
    </div>
    <div v-if="props.detailPrice.discountPrograms.length > 0" class="wf-bg--3-f-5-f-6-fa wf-px-20 wf-py-24">
      <div class="wf-font_13--bold wf-mb-20">{{ $t('cart.detailPriceModal.instantDiscount') }}</div>
      <div class="wf_flex wf_flex-col wf-space-y-12">
        <div
          v-for="(program, index) in props.detailPrice.discountPrograms"
          :key="index"
          class="wf-font_13--reg wf-color--g-555 wf_justify-between wf_flex"
        >
          <span>{{ program.promotionName }}</span>
          <span>- {{ formatNumberDot(program.amount) }} {{ $t('common.won') }}</span>
        </div>
      </div>
    </div>
    <div class="wf_w-full wf_flex wf_justify-between">
      <span class="wf-font_15--bold">{{ $t('cart.detailPriceModal.totalDiscountAmount') }}</span>
      <span class="wf-color--f-95729 wf-font_15--mid">- {{ formatNumberDot(props.detailPrice.totalDiscountAmount) }} {{ $t('common.won') }}</span>
    </div>
    <div class="wf-border-top-absolute"></div>
    <div class="wf-font_15--bold wf-color--g-111 wf_flex wf_items-start wf_justify-between">
      <span>{{ $t('cart.detailPriceModal.expectedPurchasePrice') }}</span>
      <span class="wf-font_23--bold">{{ formatNumberDot(props.detailPrice.expectedPurchasePrice) }} {{ $t('common.won') }}</span>
    </div>
    <div class="wf-font_13--reg wf-color--g-555">{{ $t('cart.detailPriceModal.description') }}</div>
    <WelfareButtonLine type="lg" :text="$t('button.check')" @click="props.closeModalByPop" />
  </div>
</template>
