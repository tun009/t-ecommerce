<!-- FO_MC_IT011004P -->
<script lang="ts" setup>
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'

interface ProductDetailPointInfoModalProps {
  onCancel: () => void
}

const props = defineProps<ProductDetailPointInfoModalProps>()
</script>
<template>
  <div class="wf_modal-confirm wf-pb-20">
    <WelfareTitleModal
      :title="$t('productDetail.pointInfo.title')"
      class="wf-pb-14"
      classIcon="wf-mt--4"
      classTitle=" wf_letter-spacing--0745"
      @close="props.onCancel"
    />
    <div class="wf_flex wf_flex-col wf-space-y-15 wf_width-full">
      <div class="wf_flex wf_items-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div>해당 상품 결제완료 후에 적립금이 추가로 지급됩니다.</div>
      </div>
      <div class="wf_flex wf_items-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div>미리주문 추가 적립금은 익월 15일경 별도 지급됩니다.</div>
      </div>
      <div class="wf_flex wf_items-center wf-font_15--reg wf-color--g-333 wf_width-full wf-space-x-4">
        <div class="wf_line-height-18">
          <div>적립금은 주문서 작성시 사용하시는 할인 혜택에 따라</div>
          <div>다시 계산되므로 현재 보이는 적립금과 다를 수 있습니다.</div>
        </div>
      </div>
    </div>
    <WelfareButtonLine type="lg" class="wf_width-full" :text="$t('button.check')" @click="props.onCancel" />
  </div>
</template>
