<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface WelfareListItemsProps {
  class?: string
  items: string[]
  activeItem?: string
  disabledClickIndex?: number
  isI18nText?: boolean
  formatItem?: (item: any) => any
}

type WelfareListItemsEmits = (e: 'update', value: any) => void

const props = defineProps<WelfareListItemsProps>()
defineEmits<WelfareListItemsEmits>()
const { t } = useI18n()

const format = (item: string) => {
  const itemFotmated = props.formatItem ? props.formatItem(item) : item
  return props.isI18nText ? t(itemFotmated) : itemFotmated
}
</script>

<template>
  <div class="wf_flex wf-space-x-12 wf_overflow-x-auto wf_width-full" :class="$props.class">
    <template v-for="(item, index) in $props.items" v-bind:key="index">
      <span
        class="wf-transition-03 wf_white-space--nowrap"
        :class="$props.activeItem === item ? 'wf-color--g-111 wf-font_15--bold wf_letter-spacing--1' : 'wf-color--g-999 wf-font_15--reg wf-pointer'"
        @click="$props.disabledClickIndex !== index && $emit('update', item)"
      >
        {{ format(item) }}
      </span>
      <span v-if="index < $props.items.length - 1" class="wf_width-1 wf_height-15 wf-bg--g-2-e-7-e-7 wf_flex-shrink-0"></span>
    </template>
  </div>
</template>
