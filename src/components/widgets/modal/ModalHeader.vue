<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import { BaseModalEmits, BaseModalProps } from '@/models/widgets/modal'

defineProps<BaseModalProps>()
defineEmits<BaseModalEmits>()
</script>
<template>
  <div class="wf_flex wf_justify-center wf-relative wf_width-full wf-br-b-1 wf-br--111 wf-pb-15">
    <div class="wf-font_21--bold wf-color--g-111 wf_text-center">{{ $t($props.title) }}</div>
    <div class="wf-absolute wf-right-0">
      <button @click="$emit('onClose')" class="wf_flex wf_items-start">
        <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
      </button>
    </div>
  </div>
</template>
