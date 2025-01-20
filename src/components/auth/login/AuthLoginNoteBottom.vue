<script setup lang="ts">
import IconDot from '@/components/icons/IconDot.vue'

interface AuthLoginNoteBottomProps {
  note: string
}

defineProps<AuthLoginNoteBottomProps>()
</script>

<template>
  <div class="wf-pt-15 wf-br--g-e-7 wf-br-t-1 wf_flex wf_items-center wf-space-x-4 wf_justify-center">
    <IconDot />
    <span class="wf-color--g-555 wf-font_13--reg">{{ $props.note }}</span>
  </div>
</template>
