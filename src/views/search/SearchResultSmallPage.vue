<!-- FO_MC_SE033000, FO_MC_SE033002, FO_MC_SE033003 -->
<script setup lang="ts">
import { useSearchResultPage } from '@/composables/search/useSearchResultPage'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import SearchResultListProduct from '@/components/search/SearchResultListProduct.vue'
import WelfareTitleSearchStickyTop from '@/components/search/WelfareTitleSearchStickyTop.vue'
import WelfareBannerImage from '@/components/uikit/banner/WelfareBannerImage.vue'
import { openWindowWithNewTab } from '@/commons'

const {
  firstLoadedItems,
  bannerResult,
  productsResult,
  keyword,
  handleChangeToSearchPage,
  changeMethodDisplay,
  displayType,
  isLoadMore,
  hasMore,
  loadInfinite,
  currentBenefits,
  currentSortSearch,
  currentBrands,
  currentRange,
  currentCategories
} = useSearchResultPage()
</script>

<template>
  <!--  In case has results-->
  <div v-if="!firstLoadedItems || firstLoadedItems.length > 0" class="wf-relative">
    <WelfareTitleSearchStickyTop
      class="wf-pb-20-important"
      :searchText="keyword"
      hide-border
      @on-change-text="(text) => handleChangeToSearchPage(text)"
      @click-search-input="(text) => handleChangeToSearchPage(text)"
    />

    <WelfareLineHorizontal />

    <!--    Banner-->
    <div v-if="bannerResult && bannerResult.length > 0" class="wf-px-16 wf-pt-20">
      <div class="wf_overflow-hidden wf_height-80 wf-search-banner">
        <WelfareBannerImage
          :allowSlideNext="true"
          :allowSlidePrev="true"
          :loop="true"
          :images="bannerResult.map((b) => b.imageUrl)"
          autoPlay
          @click-image="(index: number) => bannerResult[index].linkUrl && openWindowWithNewTab(bannerResult[index].linkUrl ?? '')"
        />
      </div>
    </div>

    <!--    Result list product (1)-->
    <SearchResultListProduct
      show-tap
      :data="productsResult"
      @update-display-type:method-display="changeMethodDisplay"
      :display-type="displayType"
      :has-more="hasMore"
      :isLoadMore="isLoadMore"
      :load-infinite="loadInfinite"
      @saveBenefits:methodBenefits="(value) => (currentBenefits = value)"
      @updateSort:methodSortSearch="(value) => (currentSortSearch = value)"
      @saveBrands:methodBrands="(value) => (currentBrands = value)"
      @saveRange:methodRange="(value) => (currentRange = value)"
      @saveCategories:methodCategory="(value) => (currentCategories = value)"
    />
  </div>
  <!--  In case don't have results-->
  <div v-else class="wf-relative">
    <WelfareTitleSearchStickyTop
      :searchText="keyword"
      hide-border
      @on-change-text="(text) => handleChangeToSearchPage(text)"
      @click-search-input="(text) => handleChangeToSearchPage(text)"
    />

    <WelfareLineHorizontal />
    <div class="wf-py-30">
      <div class="wf-font_19--bold wf-color--g-111 wf-pb-20-important wf_text-center">
        <span class="wf-color--f-95729--i">'{{ keyword }}'</span> {{ $t('search.emptyResult.title') }}
      </div>
      <div class="wf-font_13-reg--lh130 wf-color--g-333 wf_text-center">
        <div>{{ $t('search.emptyResult.subTitle1') }}</div>
        <div>{{ $t('search.emptyResult.subTitle2') }}</div>
        <div>{{ $t('search.emptyResult.subTitle3') }}</div>
        <div>{{ $t('search.emptyResult.subTitle4') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/search/-welfare-search-page-result.scss');
</style>
