<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { NotificationModalProps } from '@/models/widgets/modal'

withDefaults(defineProps<NotificationModalProps>(), {
  content: '',
  type: 'default',
  buttonLabel: '확인',
  onAccept: () => {},
  onClose: () => {}
})
</script>

<template>
  <div class="wf_modal-notification">
    <div class="wf_flex wf_flex-col wf-space-y-15 wf_width-full">
      <div class="wf-ml-auto wf-pointer wf_height-16 wf_flex wf_items-center" @click="$props.onClose">
        <span><IconClose :width="16" :height="16" :color="defaultColor.gray1" /></span>
      </div>
      <div
        class="wf_modal-notification-content wf-space-y-5"
        :class="{
          'wf_modal-notification-content--warning': $props.type === 'warning'
        }"
        v-html="$props.content"
      ></div>
    </div>
    <WelfareButtonLine type="lg" class="wf_width-full" :text="$props.buttonLabel" @click="$props.onAccept" />
  </div>
</template>
