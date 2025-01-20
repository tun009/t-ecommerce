<script lang="ts" setup>
import { formatNumberDot } from '@/commons'
interface WelfareViewPriceProps {
  price: number
  type?: 'sm' | 'lg'
  class?: string
  classPrice?: string
  classMinus?: string
  isMinus?: boolean
}
withDefaults(defineProps<WelfareViewPriceProps>(), {
  type: 'lg'
})
</script>

<template>
  <p class="wf-color--g-111 wf_flex wf_items-center wf-space-x-2" :class="$props.class ?? 'wf-font_13--reg'">
    <span :class="[{ 'wf-font_15--bold wf_letter-spacing--1': type === 'sm', 'wf-font_23--bold wf_letter-spacing--1': type === 'lg' }, $props.classPrice]"
      ><span v-if="$props.isMinus" class="wf-color--f-95729" :class="$props.classMinus">- </span>{{ formatNumberDot(price) }}
    </span>
    {{  $t('common.won') }}
  </p>
</template>
