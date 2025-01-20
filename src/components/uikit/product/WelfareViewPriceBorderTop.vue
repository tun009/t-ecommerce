<script lang="ts" setup>
import { formatNumberDot } from '@/commons'
interface WelfareViewPriceProps {
  price: number
  class?: string
  isLineThrough?: boolean
}
defineProps<WelfareViewPriceProps>()
</script>

<template>
  <p
    class="wf-color--g-bbb wf_width-fit wf wf-text"
    :class="`${$props.class ?? 'wf-font_13--reg  wf-mt-2 '} ${$props.isLineThrough ? 'wf-text-line-through' : 'wf-border-top-absolute'}`"
  >
    {{ formatNumberDot(price) }}원
  </p>
</template>
