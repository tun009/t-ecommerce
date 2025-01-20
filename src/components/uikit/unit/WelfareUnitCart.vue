<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import WelfareProductAmount from '@/components/widgets/common/WelfareProductAmount.vue'

interface WelfareUnitCartProps {
  name: string
  price: string
  discount?: number
}

defineProps<WelfareUnitCartProps>()
</script>

<template>
  <div class="wf-px-14 wf-py-14 wf-bg--g-f-5-f-6-fa">
    <div class="wf-mb-18 wf_flex wf_justify-between">
      <span class="wf-font_15--mid wf-color--g-333">{{ $props.name }}</span>
      <div class="">
        <IconClose :width="18" :height="18" :color="defaultColor.gray5" />
      </div>
    </div>
    <div class="wf_flex wf_justify-between wf_items-center">
      <WelfareProductAmount />
      <div class="wf-color--g-111">
        <span v-if="$props.discount" class="wf-font_17--bold wf-color--f-95729 wf-mr-4">
          {{ $props.discount }}<span class="wf-font_13--bold">% </span>
        </span>
        <span class="wf-font_17--bold"> {{ $props.price }} </span>
        <span class="wf-font_15--reg"> 원</span>
      </div>
    </div>
  </div>
</template>
