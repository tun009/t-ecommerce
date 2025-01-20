<script lang="ts" setup>
import { IcInfo } from '@/assets/icons'

interface ExhibitionInformationTitleProps {
  title: string
}

type ExhibitionInformationTitleEmits = (e: 'click') => void

defineProps<ExhibitionInformationTitleProps>()
const emits = defineEmits<ExhibitionInformationTitleEmits>()
</script>

<template>
  <div @click="emits('click')" class="wf_flex wf_items-center wf_justify-between wf-py-10 wf-pointer">
    <div class="wf_flex wf-space-x-6">
      <img :src="IcInfo" class="wf_width-13" />
      <p class="wf-font_15--mid wf-color-grey-55 wf-mt-3">{{ $t($props.title) }}</p>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
