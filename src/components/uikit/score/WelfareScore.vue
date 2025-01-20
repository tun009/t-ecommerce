<script setup lang="ts">
import { computed } from 'vue'
import { DEFAULT_NUMBER_OF_STAR } from '@/commons/constants'
import IconStarHalf from '@/components/icons/IconStarHalf.vue'
import IconStar from '@/components/icons/IconStar.vue'

interface WelfareScoreProps {
  value: number
  number?: number
  small?: boolean
  boldText?: boolean
  centerText?: boolean
}

const props = withDefaults(defineProps<WelfareScoreProps>(), {
  number: DEFAULT_NUMBER_OF_STAR
})

const classText = computed(() => {
  if (props.number != DEFAULT_NUMBER_OF_STAR) return 'wf-font_14--mid wf-color--g-555'
  return 'wf-color--g-333 ' + (props.small ? ' wf-font_15--reg ' : ' wf-font_23--bold ') + (props.boldText && ' wf-font-weight--700 ')
})

const spaceText = computed(() => {
  if (props.number != DEFAULT_NUMBER_OF_STAR) return 'wf-space-x-4'
  return props.small ? 'wf-space-x-7' : 'wf-space-x-10'
})
</script>

<template>
  <div :class="`wf_flex  wf_justify-center ${spaceText} wf_width-fit ${props.centerText ? ' wf_items-center ' : ' wf_items-end '}`">
    <div :class="`wf_flex wf_items-center wf_justify-center ${props.small ? 'wf-space-x-1' : 'wf-space-x-2'} wf_width-fit`">
      <div class="" v-for="item in props.number" v-bind:key="item">
        <IconStarHalf v-if="item - value > 0 && item - value < 1" :small="props.small" />
        <IconStar v-else :empty="item > value" :small="props.small" />
      </div>
    </div>
    <div :class="classText">
      {{ props.value.toFixed(1) }}
    </div>
  </div>
</template>
