<script setup lang="ts">
interface ProductDetailTableInfoProps {
  infos?: { title: string; value: string }[]
  class?: string
}

defineProps<ProductDetailTableInfoProps>()
</script>

<template>
  <div class="wf-br-t-1 wf-br-b-1 wf-br--g-bbb" :class="$props.class" v-if="$props.infos">
    <div
      class="wf_flex wf_items-center wf-font_13--reg wf_letter-spacing--1"
      :class="index < $props.infos.length - 1 && 'wf-br-b-1 wf-br--g-e-7'"
      v-for="(info, index) in infos"
      v-bind:key="index"
    >
      <div class="wf-pl-15 wf_min-width-100 wf-bg--g-f-5-f-5-f wf-pt-14 wf-pb-13">
        <p class="wf-color--g-333">{{ info.title }}</p>
      </div>
      <div class="wf-pl-20 wf-color--g-555">{{ info.value }}</div>
    </div>
  </div>
</template>
