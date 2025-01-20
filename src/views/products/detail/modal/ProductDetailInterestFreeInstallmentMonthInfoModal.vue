<!-- FO_MC_IT011007P -->
<script lang="ts" setup>
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'

interface ProductDetailInterestFreeInstallmentMonthInfoModalProps {
  onCancel: () => void
  islandOne?: string
  islandTwo?: string
}

const props = defineProps<ProductDetailInterestFreeInstallmentMonthInfoModalProps>()
</script>

<template>
  <div class="wf_modal-confirm">
    <WelfareTitleModal
      :title="$t('productDetail.interestFreeInstallmentMonthInfo.title')"
      class="wf-pb-14"
      classIcon="wf-mt--4"
      classTitle=" wf_letter-spacing--0745"
      @close="props.onCancel"
    />
    <div class="wf-product-info-about-payments wf_flex wf_width-full wf-br-b-1 wf-br--g-e-7 wf-pb-5">
      <div class="wf_flex wf_flex-center">카드사</div>
      <div class="wf_flex wf_flex-center">구매조건</div>
      <div class="wf_flex wf_flex-center">무이자 개월</div>
    </div>
    <div class="wf-product-info-about-payments wf_flex wf_width-full wf-br-b-1 wf-br--g-e- wf-pb-5" v-for="(_, index) in [1, 2, 3]" :key="index">
      <div class="wf_flex wf_flex-center">국민카드</div>
      <div class="wf_flex wf_flex-center">5만원 이상</div>
      <div class="wf_flex wf_flex-center">최대 3개월</div>
    </div>
    <WelfareButtonLine type="lg" class="wf_width-full" :text="$t('button.check')" @click="props.onCancel" />
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-Interest-free-installment-month-information.scss');
</style>
