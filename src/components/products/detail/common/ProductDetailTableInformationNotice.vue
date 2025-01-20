<script setup lang="ts">
interface ProductDetailTableInfoProps {
  infos?: { productInfoProvisionItemContents: string; productInfoProvisionContents: string }[]
}
defineProps<ProductDetailTableInfoProps>()
</script>

<template>
  <div class="wf-br-t-1 wf-br-b-1 wf-br--g-bbb" v-if="$props.infos" :class="$props.class">
    <div
      class="wf_flex wf-font_13--reg wf_letter-spacing--1"
      :class="index < $props.infos.length - 1 && 'wf-br-b-1 wf-br--g-e-7'"
      v-for="(info, index) in infos"
      v-bind:key="index"
    >
      <div class="wf_flex wf_items-center wf-px-15 wf-bg--g-f-5-f-5-f wf-pt-14 wf-pb-12">
        <p
          class="wf-color--g-333 wf_text-wrap wf_min-width-100 wf_max-width-100"
          :class="`${index === $props.infos.length - 1 ? 'wf-pt-10 wf-pb-8' : ''}`"
        >
          {{ info.productInfoProvisionItemContents }}
        </p>
      </div>
      <div
        class="wf-pl-20 wf-color--g-555 wf-pr-15 wf-pt-14 wf-pb-12"
        :class="`${index === $props.infos.length - 1 ? 'wf-pt-10 wf-pb-10 wf-font_13-reg--lh130' : ''}`"
      >
        {{ info.productInfoProvisionContents }}
      </div>
    </div>
  </div>
</template>
