<script setup lang="ts">
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'

interface Props {
  title: string
  data: WelfareUnitProductModel[]
}

const props = defineProps<Props>()
</script>
<template>
  <div class="wf-pl-16">
    <h3 class="wf-font_17--bold wf-color--g-111 wf-mb-20">{{ title }}</h3>
    <div class="wf_overflow-x-auto wf_overflow-y-hidden wf_flex wf-pr-16 wf-space-x-10">
      <div v-for="(item, index) in props.data" :key="index">
        <WelfareProductItem class="wf_width-140 wf_height-238 wf-space-x-12" type="md" :data="item" />
      </div>
    </div>
  </div>
</template>
