<script setup lang="ts">
import IconClear from '../icons/IconClear.vue'
import WelfareListItems from '../widgets/common/WelfareListItems.vue'
import { ref, computed } from 'vue'

interface SearchRecentlyGroupProps {
  deleteItemMode?: boolean
  items: string[]
  isSaveSearch?: boolean
}

interface SearchRecentlyGroupEmits {
  (e: 'on-delete-all'): void
  (e: 'on-delete-mode', status: boolean): void
  (e: 'on-status-save-change', status: boolean): void
  (e: 'on-delete', item: any): void
  (e: 'on-search', item: string): void
}

const props = defineProps<SearchRecentlyGroupProps>()
const emit = defineEmits<SearchRecentlyGroupEmits>()

const featureItems = computed(() => {
  return ['선택삭제', '전체삭제', !props.isSaveSearch ? '저장안함' : '저장함']
})
const activeItem = ref('')
const showFeature = ref(false)
const handleClickItem = (item: string) => {
  activeItem.value = item
  showFeature.value = false
  if (item === featureItems.value[0]) {
    activeItem.value = !props.deleteItemMode ? item : ''
    emit('on-delete-mode', !props.deleteItemMode)
  } else if (item === featureItems.value[1]) {
    activeItem.value = ''
    emit('on-delete-all')
    emit('on-delete-mode', false)
  } else {
    emit('on-status-save-change', !props.isSaveSearch)
    emit('on-delete-mode', false)
  }
}
</script>

<template>
  <div class="">
    <div class="wf_relative wf_flex wf_justify-between wf_items-center">
      <span class="wf-font_17--bold wf-color--g-111">{{ $t('search.searchPage.titleSearchRecently') }}</span>
      <!-- <div class="" @click.stop="() => (showFeature = true)">
        <IconFeatureSearch class="wf-pointer" v-if="$props.items.length > 0" />
      </div> -->
      <WelfareListItems
        v-click-outside="() => (showFeature = false)"
        v-if="showFeature && $props.items.length > 0"
        class="wf-search-recently-feature wf-font_15--reg wf-color--g-333"
        :items="featureItems"
        :active-item="activeItem"
      >
        <template #item="{ item, active }">
          <div :class="`wf-search-recently-feature--item wf-pointer wf-px-16 wf-py-8 ${active && 'wf-active'}`" @click="() => handleClickItem(item)">
            {{ item }}
          </div>
        </template>
      </WelfareListItems>
    </div>
    <div class="wf-mt-16">
      <span class="wf-font_15--reg wf-color--g-999" v-if="$props.items.length === 0">
        {{ $t('search.searchPage.emptySearchRecently') }}
      </span>
      <div class="wf_flex wf-space-x-4 wf-space-y-4 wf_width-full wf_flex-nowrap wf_overflow-x-auto" v-else>
        <div
          class="wf-font_15--reg wf-px-20 wf-py-10 wf-br-1 wf-br--g-e-7 wf_flex wf_items-center wf-space-x-6 wf_flex-nowrap wf_height-38 wf-pointer"
          v-for="(item, index) in $props.items"
          v-bind:key="index"
          @click.stop="$emit('on-search', item)"
        >
          <span class="wf-color--g-111 wf_white-space--nowrap">{{ item }}</span>
          <IconClear v-if="$props.deleteItemMode" @click.stop="$emit('on-delete', item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/search/_welfare-search-recently.scss');
</style>
