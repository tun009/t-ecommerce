<script setup lang="ts">
interface WelfareNoteTextProps {
  text: string
  mt?: string | number
}
withDefaults(defineProps<WelfareNoteTextProps>(), {
  mt: 10
})
</script>
<template>
  <div :class="`wf_flex wf-space-x-2 wf-mt-${mt} wf-font_13--reg wf-color--g-555`">
    <span class="wf-color--g-bbb">•</span><span>{{ $t($props.text) }}</span>
  </div>
</template>
