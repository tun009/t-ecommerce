<script setup lang="ts">

interface GroupBillingInformationTitle {
  isBorderBottom?: boolean
  method: string
  cardCompany: string
}
defineProps<GroupBillingInformationTitle>()
</script>
<template>
  <div :class="`wf-pt-16 wf-pb-18 wf_flex wf_flex-col wf-space-y-10  ${isBorderBottom ? 'wf-br--f0 wf-border-width-b-1' : ''}`">
    <div class="wf_flex wf_items-center wf_justify-between">
      <span class="wf-font_15--reg wf-color--g-333">결제수단</span>
      <span class="wf-font_15--reg wf-color--g-333">{{ $props?.method }}</span>
    </div>
    <div class="wf_flex wf_items-center wf_justify-between" >
      <span class="wf-font_15--reg wf-color--g-333">카드사</span>
      <span class="wf-font_15--reg wf-color--g-333">{{ $props?.cardCompany }}</span>
    </div>
  </div>
</template>
