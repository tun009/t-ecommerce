<script lang="ts" setup>
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'

interface ProductDetailConfirmSubmitModalProps {
  title: string
  content?: string
  confirmContent?: string
  onCancel: () => void
  isConfirm?: boolean
  onConfirm?: () => void
  successContent?: string
}
const props = defineProps<ProductDetailConfirmSubmitModalProps>()
</script>
<template>
  <div v-if="props.isConfirm" class="wf_modal-confirm wf-pb-20">
    <WelfareTitleModal :title="props.title" class="wf-pb-14" classIcon="wf-mt--4" classTitle=" wf_letter-spacing--0745" @close="props.onCancel" />
    <div class="wf_flex wf_flex-col wf_justify-center wf-space-y-6 wf_width-full wf-font_15--reg wf-color--g-333 wf-mt--6">
      <div class="wf_flex wf_items-center wf_justify-center wf-space-x-4">
        <div class="wf_text-truncate">{{ props.content }}</div>
      </div>
      <div v-if="confirmContent" class="wf_flex wf_items-center wf_justify-center wf_width-full wf-space-x-4">
        {{ props.confirmContent }}
      </div>
    </div>
    <div class="wf_width-full wf_flex wf_items-center wf_justify-between wf-mt--6 wf-space-x-10">
      <WelfareButtonLine @click="props.onCancel" type="lg" class="wf_flex-1" lg-state="grey-line" :text="$t('button.cancel')" />
      <WelfareButtonLine type="lg" class="wf_flex-1" :text="$t('productDetail.productReview.declaration')" @click="props.onConfirm" />
    </div>
  </div>
  <div v-else class="wf_modal-confirm wf-pb-20">
    <WelfareTitleModal :title="props.title" class="wf-pb-14" classIcon="wf-mt--4" classTitle=" wf_letter-spacing--0745" @close="props.onCancel" />
    <div class="wf_flex wf_flex-col wf-space-y-6 wf_width-full wf-font_15--reg wf-color--g-333 wf-mt--6">
      <div class="wf_flex wf_items-center wf_justify-center wf_width-full wf-space-x-4">{{ props.successContent }}</div>
    </div>
    <WelfareButtonLine type="lg" class="wf_width-full wf-mt--8" :text="$t('button.check')" @click="props.onCancel" />
  </div>
</template>
