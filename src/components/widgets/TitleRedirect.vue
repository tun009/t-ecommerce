<script setup lang="ts">
import { useBuildLink } from '@/composables/common/useBuildLink'
import IconArrowRight from '../icons/IconArrowRight.vue'

interface TitleRedirectProps {
  class?: string
  title: string
  path: string
}
const props = defineProps<TitleRedirectProps>()
const { processLink } = useBuildLink()
</script>
<template>
  <div :class="`wf_flex wf_justify-between wf_items-end wf-space-x-4 wf-pl-16 wf-pr-14 ${props.class}`">
    <h3 class="wf-font_17--bold wf-color--g-111">{{ props.title }}</h3>
    <router-link :to="processLink(props.path)" class="wf_flex wf_items-center wf-link-hover wf-space-x-5 wf-mt-1">
      <span class="wf-font_14--reg wf-color--g-333">{{ $t('productSpecialPrice.seeMore') }}</span>
      <span class="wf-link-icon"><IconArrowRight /></span>
    </router-link>
  </div>
</template>
