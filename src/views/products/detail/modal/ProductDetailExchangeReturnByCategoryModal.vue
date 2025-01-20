<!-- FO_MC_IT011019P -->

<script lang="ts" setup>
import ProductDetailListInfo from '@/components/products/detail/common/ProductDetailListInfo.vue'
import ProductDetailTitle from '@/components/products/detail/common/ProductDetailTitle.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'

interface ProductDetailExchangeReturnByCategoryModalProps {
  onCancel: () => void
  clothes?: string[]
  cosmetics?: string[]
  stuff?: string[]
  householdGoods?: string[]
  homeAppliances?: string[]
  otherNotes?: string[]
}

const props = defineProps<ProductDetailExchangeReturnByCategoryModalProps>()
</script>
<template>
  <div class="wf_modal-confirm wf-product-detail-scroll-modal">
    <WelfareTitleModal
      :title="$t('productDetail.exchangeReturnByCategory.title')"
      class="wf-pb-14"
      classIcon="wf-mt--4"
      classTitle=" wf_letter-spacing--0745"
      @close="props.onCancel"
    />
    <div class="wf_flex wf_flex-col wf-space-y-10 wf_width-full">
      <ProductDetailTitle :title="$t('productDetail.exchangeReturnByCategory.clothes')" class="wf-mt-1" />
      <ProductDetailListInfo v-if="props.clothes" :infos="props.clothes" class="wf-pr-12 wf-mt--1" />
      <ProductDetailTitle :title="$t('productDetail.exchangeReturnByCategory.cosmetics')" class="wf-mt-1" />
      <ProductDetailListInfo v-if="props.cosmetics" :infos="props.cosmetics" class="wf-pr-12 wf-mt--1" />
      <ProductDetailTitle :title="$t('productDetail.exchangeReturnByCategory.stuff')" class="wf-mt-1" />
      <ProductDetailListInfo v-if="props.stuff" :infos="props.stuff" class="wf-pr-12 wf-mt--1" />
      <ProductDetailTitle :title="$t('productDetail.exchangeReturnByCategory.householdGoods')" class="wf-mt-1" />
      <ProductDetailListInfo v-if="props.householdGoods" :infos="props.householdGoods" class="wf-pr-12 wf-mt--1" />
      <ProductDetailTitle :title="$t('productDetail.exchangeReturnByCategory.homeAppliances')" class="wf-mt-1" />
      <ProductDetailListInfo v-if="props.homeAppliances" :infos="props.homeAppliances" class="wf-pr-12 wf-mt--1" />
      <ProductDetailTitle :title="$t('productDetail.exchangeReturnByCategory.otherNotes')" class="wf-mt-1" />
      <ProductDetailListInfo v-if="props.otherNotes" :infos="props.otherNotes" class="wf-pr-12 wf-mt--1" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-Interest-free-installment-month-information.scss');
</style>
