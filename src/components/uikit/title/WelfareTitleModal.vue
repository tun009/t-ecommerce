<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'

interface WelfareTitleModalProps {
  title: string
  class?: string
  classTitle?: string
  classIcon?: string
  widthIcon?: number
  colorIcon?: string
}

type WelfareTitleModalEmit = (e: 'close') => void

withDefaults(defineProps<WelfareTitleModalProps>(), {
  widthIcon: 16,
  colorIcon: defaultColor.gray1
})
defineEmits<WelfareTitleModalEmit>()
</script>

<template>
  <div :class="`wf_flex wf_justify-between wf_width-full wf-br-b-1 wf-br--g-primary ${$props.class ?? ' wf-pb-15 '}`">
    <div :class="`wf_width-${$props.widthIcon}`"></div>
    <div :class="`wf-font_21--bold wf-color--g-111 ${$props.classTitle}`">{{ $props.title }}</div>
    <div :class="`wf-pointer ${$props.classIcon}`" @click="$emit('close')">
      <IconClose :color="$props.colorIcon" :width="$props.widthIcon" :height="$props.widthIcon" />
    </div>
  </div>
</template>
