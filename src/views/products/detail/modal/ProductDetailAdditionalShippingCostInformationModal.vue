<!-- FO_MC_IT011005P -->
<script lang="ts" setup>
import { formatNumberDot } from '@/commons'
import IconDot from '@/components/icons/IconDot.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'

interface ProductDetailAdditionalShippingCostInformationModalProps {
  onCancel: () => void
  islandOne?: number
  islandTwo?: number
}

const props = defineProps<ProductDetailAdditionalShippingCostInformationModalProps>()
</script>

<template>
  <div class="wf_modal-confirm wf-space-y-30 wf-pb-24">
    <WelfareTitleModal
      :title="$t('productDetail.additionalShippingCostInformation.title')"
      class="wf-pb-14"
      classIcon="wf-mt--4"
      classTitle=" wf_letter-spacing--0745"
      @close="props.onCancel"
    />
    <div class="wf_flex wf_flex-col wf-space-y-10 wf_width-full wf-br-b-1 wf-br--g-e-7 wf-pb-20">
      <div class="wf_flex wf_flex-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div class="wf_align-self-center">
          <IconDot />
        </div>
        <div>{{ `도서지역 : ${islandOne ? `${formatNumberDot(islandOne)}원` : '배송불가'}` }}</div>
      </div>
      <div class="wf_flex wf_flex-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div class="wf_align-self-center">
          <IconDot />
        </div>
        <div>{{ `제주지역 : ${islandTwo ? `${formatNumberDot(islandTwo)}원` : '배송불가'}` }}</div>
      </div>
    </div>
    <div class="wf_flex wf_flex-col wf-space-y-10 wf_width-full">
      <div class="wf_flex wf_flex-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div>도서지역 기준은 택배사마다 상이할 수 있습니다.</div>
      </div>
    </div>
    <WelfareButtonLine type="lg" class="wf_width-full" :text="$t('button.check')" @click="props.onCancel" />
  </div>
</template>
