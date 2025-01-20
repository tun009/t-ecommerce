<script setup lang="ts">
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { ConfirmModalProps } from '@/models/widgets/modal'

withDefaults(defineProps<ConfirmModalProps>(), {
  content: '',
  type: 'default',
  buttonCancelLabel: '취소',
  buttonConfirmLabel: '확인',
  onCancel: () => {},
  onConfirm: () => {}
})
</script>

<template>
  <div class="wf_modal-confirm wf-space-y-30">
    <slot />
    <div class="wf_flex wf-space-x-11 wf_width-full">
      <WelfareButtonLine lg-state="grey-line" type="lg" class="wf_flex-1" :text="$props.buttonCancelLabel" @click="$props.onCancel" />
      <WelfareButtonLine type="lg" class="wf_flex-1" :text="$props.buttonConfirmLabel" @click="$props.onConfirm" />
    </div>
  </div>
</template>
