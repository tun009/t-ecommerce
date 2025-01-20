<script setup lang="ts">
interface MyPageWelfarePointTitleProps {
  title: string
  subTitle?: string
  value?: string
  unit?: string
  normal?: boolean
}

defineProps<MyPageWelfarePointTitleProps>()
</script>

<template>
  <div class="wf_flex wf_items-center wf_justify-between wf-pl-15 wf-pr-16 wf-pb-17 wf-br-t-1 wf-br-b-1 wf-br--g-e-7 wf-bg--g-f-5-f-6-fa" :class="`${$props.normal ? 'wf-pt-17 ' : 'wf-pt-18'}`">
    <div class="wf-color--g-333">
      <span :class="`wf_letter-spacing--1 ${$props.normal ? 'wf-font_14--semi ' : 'wf-font_15--semi'}`" >{{ $props.title }}</span>
      <span  v-if="$props.subTitle" class="wf-font_13--reg">{{ $props.subTitle }}</span>
    </div>
    <div :class="`${$props.normal ? 'wf-color--g-333' : 'wf-color_blue'}`">
      <span :class="`${$props.normal ? 'wf-font_14--semi wf_letter-spacing--1' : 'wf-font_21--bold wf_letter-spacing--0-8'}`">{{ $props.value }}</span>
      <span v-if="$props.unit" :class="`${$props.normal ? 'wf-font_14--reg' : 'wf-font_17--semi'}`">{{ $props.unit }}</span>
    </div>
  </div>
</template>
