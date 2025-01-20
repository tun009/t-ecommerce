<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import { useCartHeader } from '@/composables/cart/useCartHeader'
import { CartProductModel } from '@/models/views/cart/CartProductModel'
import { useI18n } from 'vue-i18n'

export interface CartHeaderProps {
  isSelectAll: boolean
  selectedProducts: CartProductModel[]
  allProducts: CartProductModel[]
  handleGetOrderCart: () => void
}

export interface CartHeaderEmits {
  (e: 'select-all-product'): () => void
  (e: 'refresh-cart'): () => void
}
const props = defineProps<CartHeaderProps>()
const emits = defineEmits<CartHeaderEmits>()
const { t } = useI18n()
const { handleRemoveSelectedProduct, handleRemoveAllProductExpired } = useCartHeader(props, emits)
</script>

<template>
  <div class="wf_flex wf_items-center wf_justify-between wf-py-12 wf-px-15 wf_w-full wf-border-width-b-1">
    <div class="wf_inline-flex wf_items-center">
      <WelfareCheckbox :model-value="props.isSelectAll" @update:model-value="emits('select-all-product')" />
      <span class="wf-ml-4">{{ t('cart.header.selectAll') }}</span>
    </div>
    <div class="wf_inline-flex">
      <WelfareButtonLine
        @click="handleRemoveSelectedProduct"
        type="sm"
        lg-state="grey-line"
        :text="t('cart.header.deleteSelected')"
        class="wf-mr-4"
      />
      <WelfareButtonLine @click="handleRemoveAllProductExpired" type="sm" lg-state="grey-line" :text="t('cart.header.deleteExpired')" />
    </div>
  </div>
</template>
