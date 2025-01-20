<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'
import { ConfirmModalProps } from '@/models/widgets/modal'
import PopupConfirm from './PopupConfirm.vue'

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
  <PopupConfirm v-bind="$props">
    <div class="wf_flex wf_flex-col wf-space-y-16 wf_width-full wf-bp-1">
      <div class="wf-ml-auto wf-pointer" @click="$props.onCancel"><IconClose :width="16" :height="16" /></div>
      <div
        class="wf_modal-confirm-content wf-space-y-5 wf-px-16"
        :class="{
          'wf_modal-confirm-content--warning': $props.type === 'warning'
        }"
        v-html="$props.content"
      ></div>
    </div>
  </PopupConfirm>
</template>
