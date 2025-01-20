<script setup lang="ts">
import IconReloadSearch from '@/components/icons/IconReloadSearch.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'

interface SearchDetailedGroupButtonProps {
  buttonTitle: string
  onClickReset: () => void
  onClickButton: () => void
  classButton?: string
}
defineProps<SearchDetailedGroupButtonProps>()
</script>

<template>
  <div class="wf_flex wf_width-full wf-space-x-10 wf-bg--white wf-mt-19">
    <IconReloadSearch @click="$props.onClickReset" class="wf-border-button-reload" />
    <WelfareButtonLine @click="$props.onClickButton" class="wf_flex-1" :class="classButton" :text="$props.buttonTitle" type="lg" />
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/categories/_welfare-category-search-detail-benefits.scss');
</style>
