<script setup lang="ts">
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'

interface SearchRelatedSearchTermsProps {
  relatedTerms: WelfareTabDataType[]
}

type SearchRelatedSearchTermEmits = (e: 'on-change', item: WelfareTabDataType) => void
const props = defineProps<SearchRelatedSearchTermsProps>()
const emit = defineEmits<SearchRelatedSearchTermEmits>()
</script>

<template>
  <WelfareTab @on-change="emit('on-change', $event)" :items="props.relatedTerms" class="wf-pl-16 wf-pb-21" name="search-tab-1" type="round" />
</template>
