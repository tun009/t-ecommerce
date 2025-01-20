<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
</script>
<template>
  <div class="wf-px-14 wf-py-11 wf-br-1 wf-br--g-e-7 wf_flex wf_justify-between wf_height-41">
    <span class="wf-font_15--reg wf-color--g-333 wf-mt-2">옵션을 선택하세요.</span>
    <div class="wf_rotate-180 wf_flex wf_items-center">
      <IconArrowDown :color="defaultColor.gray3" />
    </div>
  </div>
</template>
