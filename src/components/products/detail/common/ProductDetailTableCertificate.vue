-
<script setup lang="ts">
import { IcSafeCertificate } from '@/assets/icons'
import IconArrowRightLink from '@/components/icons/IconArrowRightLink.vue';

interface ProductDetailTableInfoProps {
  infos: {
    icon: any
    contents: {
      title: string
      value: string
    }[]
  }[]
  class?: string
}

defineProps<ProductDetailTableInfoProps>()
</script>

<template>
  <div v-for="(cert, index) in infos" :key="`cert_${index}`" class="wf_flex wf_flex-row wf-br-t-1 wf-br-b-1 wf-br--g-bbb" :class="$props.class">
    <div class="wf_flex wf_items-center wf-px-35 wf_min-width-100 wf-bg--g-f-5-f-5-f">
      <img :src="IcSafeCertificate" alt="cert" />
    </div>
    <div class="wf_width-full wf_height-full">
      <div
        class="wf_flex wf_flex-row wf-font_13--reg wf_letter-spacing--1 wf_height-full"
        :class="`${indexCert !== cert.contents.length - 1 ? 'wf-br-b-1 wf-br--g-bbb' : ''}`"
        v-for="(info, indexCert) in cert.contents"
        v-bind:key="indexCert"
      >
        <div class="wf-pl-20 wf-pb-30 wf-pt-32 wf_flex wf_flex-col wf_justify-center wf_width-full wf-color--g-555 wf-font_13-reg--lh140">
          <div>{{ info.title }}</div>
          <div class="wf_flex wf_flex-row wf_width-full wf_items-center wf-space-x-7">
            <div>{{ info.value }}</div>
            <IconArrowRightLink class="wf_width-6" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>