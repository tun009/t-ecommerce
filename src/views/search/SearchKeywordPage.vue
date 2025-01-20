<!-- FO_MC_SE011000, FO_MC_SE011001, FO_MC_SE011002, FO_MC_SE011003P, FO_MC_SE022000, FO_MC_SE022001 -->
<script setup lang="ts">
import SearchRecentlyGroup from '@/components/search/SearchRecentlyGroup.vue'
import WelfareTitleSearchStickyTop from '@/components/search/WelfareTitleSearchStickyTop.vue'
import { useSearchKeywordPage } from '@/composables/search/useSearchKeywordPage'

const {
  keyword,
  recentlyItems,
  handleSearch,
  handleDeleteAllRecentlySearch,
  isSaveSearch,
  handleChangeStatusSave,
  deleteItemMode,
  handleDeleteItemSearch,
  handleChangeDeleteItemMode,
  handleChangeSearchText,
  highlightWord,
  suggestedWords,
  handleClickOldItemSearch,
  handleChangeToResultPage,
  isLoading,
  inputRef
} = useSearchKeywordPage()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleSearchStickyTop
      ref="inputRef"
      :hideBorder="true"
      :searchText="keyword"
      @click-icon-search="handleSearch"
      @on-change-text="handleChangeSearchText"
    />

    <div class="wf-px-16 wf_flex wf_flex-col wf-space-y-30 wf-pb-30">
      <!-- Result search -->
      <!-- Suggested Words-->
      <div v-if="keyword && suggestedWords.length > 0 && !isLoading" class="wf_flex wf_flex-col">
        <div
          v-for="(sentence, index) in suggestedWords"
          :key="index"
          class="wf-br-b-1 wf-br--g-e-7 wf_height-48 wf_flex wf_justify-start wf_items-center"
        >
          <span v-html="highlightWord(sentence, keyword)" @click="() => handleChangeToResultPage(sentence)"></span>
        </div>
      </div>

      <!-- Search Recently -->
      <SearchRecentlyGroup
        v-if="!keyword"
        :class="'wf-mt-16'"
        :items="recentlyItems ?? []"
        :isSaveSearch="isSaveSearch"
        :deleteItemMode="deleteItemMode"
        @on-delete-all="handleDeleteAllRecentlySearch"
        @on-status-save-change="handleChangeStatusSave"
        @on-delete="handleDeleteItemSearch"
        @on-delete-mode="handleChangeDeleteItemMode"
        @on-search="handleClickOldItemSearch"
      />
      <!-- Search Popular - SPEC-OUT -->
      <!-- <SearchPopularGroup :currentDate="currentDate" :items="popularItems" @on-click-item="handleClickOldItemSearch" /> -->
    </div>
  </div>
</template>
