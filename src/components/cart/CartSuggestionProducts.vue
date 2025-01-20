<script setup lang="ts">
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import { useCartSuggestionProducts } from '@/composables/cart/useCartSuggestionProducts'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import { useI18n } from 'vue-i18n'

const { suggestionProducts } = useCartSuggestionProducts()
const { t } = useI18n()
// TODO: note 9 in SB slide 30
</script>

<template>
  <WelfareLineHorizontal />
  <div class="wf-pl-16 wf-bg--white wf-py-20">
    <h3 class="wf-font_17--bold wf-color--g-111 wf-mb-20">{{ t('cart.suggestionProduct.title') }}</h3>
    <div class="wf_overflow-x-auto wf_overflow-y-hidden wf_flex wf-pr-16 wf-space-x-10">
      <div v-for="(product, index) in suggestionProducts" :key="index">
        <WelfareProductItem class="wf_width-140 wf_height-238 wf-space-x-12" type="md" :data="product" />
      </div>
    </div>
  </div>
</template>
