<script setup lang="ts">
import { VueDaumPostcode, VueDaumPostcodeCompleteResult } from 'vue-daum-postcode'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'

interface WelfareModalContentProps {
  title: string
}

type WelfareModalContentEmits = {
  (e: 'onClose'): void
  (e: 'onDone', address: VueDaumPostcodeCompleteResult): void
}

defineProps<WelfareModalContentProps>()
const emit = defineEmits<WelfareModalContentEmits>()

const onComplete = (address: VueDaumPostcodeCompleteResult) => {
  emit('onDone', address)
  emit('onClose')
}
</script>

<template>
  <WelfareTitleModal class="wf_width-auto wf-pb-15 wf-pt-29 wf-mx-16" :title="$props.title" @close="() => $emit('onClose')" classIcon="wf-mt-2" />
  <div class="wf_flex wf_flex-col wf-px-16 wf-pt-26 wf-pb-10-important">
    <VueDaumPostcode @complete="onComplete" />
  </div>
</template>
