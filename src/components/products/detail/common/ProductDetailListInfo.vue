<script setup lang="ts">
interface ProductDetailListInfoProps {
  infos: string[]
  class?: string
}

defineProps<ProductDetailListInfoProps>()
</script>

<template>
  <div class="wf_flex wf_flex-col wf-space-y-10" :class="$props.class">
    <p class="wf_flex wf_items-start wf-font_13--reg wf-color--g-555 wf-ml--3" v-for="(text, index) in infos" v-bind:key="index">
      <span class="wf-mr-4 wf-color--g-bbb">&#x2022;</span>
      <span :class="'wf_line-height-17'" v-html="text" />
    </p>
  </div>
</template>
