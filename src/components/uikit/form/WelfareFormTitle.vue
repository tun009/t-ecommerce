<script setup lang="ts">
interface WelfareFormTitleProps {
  title: string
  required?: boolean
}

defineProps<WelfareFormTitleProps>()
</script>

<template>
  <span class="wf-font_15--bold wf-color--g-333">{{ $props.title }} <span class="wf-color--red-ff-3-b-4-f" v-if="$props.required">*</span></span>
</template>
