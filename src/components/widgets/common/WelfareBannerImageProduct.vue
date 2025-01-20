<script setup lang="ts">
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'
interface Props {
  image: any
  title: string
  description: string
}

const props = defineProps<Props>()
</script>
<template>
  <div class="wf-relative">
    <WelfareImage class-group="wf-banner-image" :dataSrc="props.image" alt="hello" />
    <div class="wf-relative wf-absolute wf_inset-0 wf-pt-24 wf-pl-20 wf-color--g-111">
      <h4 class="wf-font_16--mid">{{ props.title }}</h4>
      <p class="wf-mt-12 wf-font_12--reg wf_letter-spacing--1">{{ props.description }}</p>
    </div>
  </div>
</template>
