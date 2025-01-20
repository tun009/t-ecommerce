<script lang="ts" setup>
import { formatNumberDot } from '@/commons'
interface WelfarePriceColumnProps {
  price: number
  title: string
  priceClass?: string
}
defineProps<WelfarePriceColumnProps>()
</script>

<template>
  <div class="wf_flex wf_flex-col wf_flex-1 wf_justify-center wf_items-center wf-space-y-4 wf-color--g-111">
    <span class="wf-font_13--mid">{{ $props.title }}</span>
    <span :class="`wf-font_14--semi ${priceClass}`">{{ formatNumberDot($props.price) }}<span class="wf-font_14--reg">{{ $t("common.won") }}</span></span>
  </div>
</template>
