<script lang="ts" setup>
interface WelfareViewPercentProps {
  percent: number
  class?: string
  classPercent?: string
  type: 'sm' | 'lg'
}
withDefaults(defineProps<WelfareViewPercentProps>(), {
  type: 'lg'
})
</script>

<template>
  <p
    v-if="percent"
    class="wf-color--red-4f-3b wf_flex wf_items-center"
    :class="[{ ' wf-font_15--bold': type === 'lg', ' wf-font_13--bold': type === 'sm' }, $props.class ?? '']"
  >
    <span :class="[{ ' wf-font_23--bold': type === 'lg', ' wf-font_15--bold': type === 'sm' }, $props.class ?? '']">{{
      `${+((1 - percent) * 100).toFixed()}%`
    }}</span>
  </p>
</template>
