<script setup lang="ts">
import { useBuildLink } from '@/composables/common/useBuildLink'

interface Props {
  title: string
  icon?: any
  count: number | string
  textCount: string
  path: string
  classCount?: string
  classTextCount?: string
}

const props = defineProps<Props>()
const { processLink } = useBuildLink()
</script>
<template>
  <router-link :to="processLink(props.path)" class="wf_flex wf_flex-col wf_items-center">
    <div class="wf_flex wf-px-14 wf_items-center wf-space-x-6">
      <component :is="props.icon" v-if="props.icon" />
      <span class="wf-font_15--reg wf-color--g-333">{{ $t(props.title) }}</span>
    </div>
    <p class="wf-font_17--bold wf-mt-10 wf-color--g-111" :class="props.classCount">
      {{ props.count }}<span class="wf-font_17--mid" :class="props.classTextCount">{{ $t(props.textCount) }}</span>
    </p>
  </router-link>
</template>
