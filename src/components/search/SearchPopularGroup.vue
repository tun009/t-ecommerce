<script setup lang="ts">
import { DEFAULT_DATE_TIME_FORMAT_DOT, formatTime } from '@/commons'

interface SearchPopularGroupProps {
  currentDate: string | Date
  items: string[]
}

type SearchPopularGroupEmits = (e: 'on-click-item', word: string) => void

defineProps<SearchPopularGroupProps>()
defineEmits<SearchPopularGroupEmits>()
</script>

<template>
  <div>
    <div class="wf_flex wf_justify-between wf_items-center">
      <span class="wf-font_17--bold wf-color--g-111">{{ $t('search.searchPage.titleSearchPopular') }}</span>
      <span class="wf-font_15--reg wf-color--g-999">
        {{ formatTime($props.currentDate, DEFAULT_DATE_TIME_FORMAT_DOT) + ' ' + $t('search.searchPage.timeSearchPopular') }}
      </span>
    </div>
    <div class="wf-mt-16">
      <div class="wf_flex wf-space-x-4 wf-space-y-8 wf_flex-wrap">
        <div
          class="wf-font_15--reg wf-px-20 wf-py-10 wf-br-1 wf-br--g-e-7 wf-pointer"
          v-for="(item, index) in $props.items"
          v-bind:key="index"
          @click="$emit('on-click-item', item)"
        >
          <span class="wf-color_i--f-95729">{{ index + 1 }}</span>
          <span class="wf-color--g-111 wf-pl-8">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
