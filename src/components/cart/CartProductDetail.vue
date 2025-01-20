<script setup lang="ts">
import { useCartProductDetail } from '@/composables/cart/useCartProductDetail'
import WelfareUnitCard from '@/components/uikit/unit/WelfareUnitCard.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareProductAmountWithInput from '@/components/widgets/common/WelfareProductAmountWithInput.vue'
import { CartProductModel } from '@/models/views/cart/CartProductModel'
import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'

export interface CartProductDetailProps {
  dataProduct: CartProductModel
}

export type CartProductDetailEmits = {
  (e: 'refresh-cart'): void
  (e: 'toggle-select', product: CartProductModel): void
}
const props = defineProps<CartProductDetailProps>()
const emits = defineEmits<CartProductDetailEmits>()
const { handleShowModalDetailPrice, handleShowModalChangeOptions, handleUpdateQuantity, handlePurchaseItemProduct, handleDeleteProduct } =
  useCartProductDetail(props, emits)
</script>

<template>
  <div v-if="dataProduct" class="wf-py-20">
    <WelfareUnitCard
      v-if="props.dataProduct"
      :is-check-box="props.dataProduct.state == ProductDetailSaleStatus.onSale"
      :is-show-delete="true"
      :is-show-money="true"
      :product="props.dataProduct"
      :checked="props.dataProduct.isSelect"
      :is-show-config-description="false"
      @update:checked="emits('toggle-select', props.dataProduct)"
      @click:question-icon="handleShowModalDetailPrice"
      @click:delete-icon="handleDeleteProduct"
    />
    <template v-if="props.dataProduct.state == ProductDetailSaleStatus.onSale">
      <div class="wf_flex wf_w-full wf_justify-between wf-mt-12">
        <WelfareProductAmountWithInput
          :quantity="props.dataProduct.quantity ?? 0"
          @update:quantity="handleUpdateQuantity"
          :min="props.dataProduct.minimumPurchaseQuantity"
          :max="props.dataProduct.maximumPurchaseQuantity"
          class="wf_items-center"
        />
        <div class="wf_flex wf_justify-end wf_w-full">
          <WelfareButtonLine
            v-if="props.dataProduct.productOptionResponses && props.dataProduct.productOptionResponses.length > 0"
            type="sm"
            :text="$t('cart.productDetail.changeOptionBtn')"
            class="wf-mr-7"
            @click="handleShowModalChangeOptions"
          />
          <WelfareButtonLine
            @click="() => handlePurchaseItemProduct(dataProduct.cartKey, [dataProduct.cartProductKey])"
            type="sm"
            :text="$t('cart.productDetail.buyNowBtn')"
          />
        </div>
      </div>
    </template>
  </div>
</template>
