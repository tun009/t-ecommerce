<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
interface Props {
  count: number | string
  textCount: string
  isShowArrow?: boolean
  path? :string
}

withDefaults(defineProps<Props>(), {
  isShowArrow: true
})
</script>
<template>
  <div class="wf_flex-1 wf_flex">
    <router-link class="wf_flex wf_flex-1 wf_flex-col wf-pl-1 wf_items-center" :to="path ?? ''">
      <span class="wf-font_19--bold wf-color--g-111">{{ count }}</span>
      <span class="wf-font_13--reg wf-color--g-555 wf-mt-13">{{ $t(textCount) }}</span>
    </router-link>
    <span v-if="isShowArrow" class="wf-mt-4 wf-mr--3 wf_flex wf_items-start">
      <IconArrowRight :color="defaultColor.gray_bb" />
    </span>
  </div>
</template>
