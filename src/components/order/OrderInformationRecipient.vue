<script setup lang="ts">
interface InformationRecipientProps {
  nameTitle: string
  name: string
  phone: string
  describe: string
  isBorderBottom?: boolean
}
defineProps<InformationRecipientProps>()
</script>
<template>
  <div :class="`wf-pb-15 wf-font_14--reg wf-color--g-777 wf_letter-spacing-0 ${isBorderBottom ? 'wf-br--f0 wf-border-width-b-1' : ''} `">
    <span class="wf-font_17--bold wf-color--g-111 wf_line-height-17">{{ $props.nameTitle }}</span>
    <span class="wf-ml-10">{{ $props.name }}</span> <line class="wf-ml-6">|</line>
    <span class="wf-color--g-333 wf-ml-7 wf_letter-spacing--04">{{ $props.phone }}</span>
    <p class=" wf-pt-13 wf_line-height-17-8 wf_letter-spacing--1" v-html="$props.describe"></p>
  </div>
</template>
