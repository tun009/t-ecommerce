<script setup lang="ts">
import { useSearchResultPage } from '@/composables/search/useSearchResultPage'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import SearchResultListProduct from '@/components/search/SearchResultListProduct.vue'
import WelfareTitleSearchStickyTop from '@/components/search/WelfareTitleSearchStickyTop.vue'
import SearchRelatedSearchTerms from '@/components/search/SearchRelatedSearchTerms.vue'
import SearchSpecialExhibitionEventImages from '@/components/search/SearchSpecialExhibitionEventImages.vue'
import { useI18n } from 'vue-i18n'
import SearchResultGroupProduct from '@/components/search/SearchResultGroupProduct.vue'
import WelfareBannerImage from '@/components/uikit/banner/WelfareBannerImage.vue'
import { openWindowWithNewTab } from '@/commons'

const {
  firstLoadedItems,
  bannerResult,
  recommendProducts,
  productsResult,
  mostPurchasedProducts,
  productsSimilar,
  productsPurchased,
  searchRelatedProducts,
  specialExhibitionEventImages,
  displayType,
  isLoadMore,
  hasMore,
  loadInfinite,
  currentBenefits,
  currentSortSearch,
  currentBrands,
  currentRange,
  currentCategories,
  isExpanded,
  keyword,
  relatedTerms,
  size,
  handleChangeToSearchPage,
  changeMethodDisplay,
  toggleExpandImg
} = useSearchResultPage()
const { t } = useI18n()
</script>

<template>
  <!--  In case has results-->
  <div v-if="!firstLoadedItems || firstLoadedItems.length > 0" class="wf-relative">
    <!--    Search text-->
    <div @click="handleChangeToSearchPage(keyword)">
      <WelfareTitleSearchStickyTop
        class="wf-pb-20-important"
        :searchText="keyword"
        hide-border
        @on-change-text="(text) => handleChangeToSearchPage(text)"
        @click-search-input="(text) => handleChangeToSearchPage(text)"
      />
    </div>
    <!--    Related search terms (1)-->
    <SearchRelatedSearchTerms
      :related-terms="relatedTerms"
      @on-change="
        (value) => {
          handleChangeToSearchPage(value.label)
        }
      "
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
    <!--    Recommend Product-->
    <SearchResultGroupProduct class="wf-my-30" :title="t('search.sections.recommend')" :data="recommendProducts" />
    <WelfareLineHorizontal />
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
    <WelfareLineHorizontal />
    <!--    Product similar-->
    <SearchResultGroupProduct class="wf-my-30" :title="t('search.sections.similar')" :data="productsSimilar" />
    <!--    Product purchased-->
    <SearchResultGroupProduct class="wf-my-30" :title="t('search.sections.purchased')" :data="productsPurchased" />
    <!--   Product most purchased-->
    <SearchResultGroupProduct class="wf-my-30" :title="t('search.sections.mostPurchased')" :data="mostPurchasedProducts" />
    <WelfareLineHorizontal />
    <!--    Result list product (2)-->
    <SearchResultListProduct :data="productsResult" class-image="wf-pt-30 wf-space-y-21" :display-type="displayType" />
    <WelfareLineHorizontal />
    <!--    Related search terms (2)-->
    <div class="wf-mt-10 wf-mb--20">
      <SearchRelatedSearchTerms :related-terms="relatedTerms" />
    </div>
    <!--    Result list product (3)-->
    <SearchResultListProduct
      :show-tap="false"
      :data="productsResult"
      @update-display-type:method-display="changeMethodDisplay"
      :display-type="displayType"
    />
    <WelfareLineHorizontal />
    <!--    Special exhibition event images-->
    <SearchSpecialExhibitionEventImages
      :is-expanded="isExpanded"
      :search-related-products="searchRelatedProducts"
      :size="size"
      :special-exhibition-event-images="specialExhibitionEventImages"
      @toggle-expand="toggleExpandImg"
    />
    <!--    Related product -->
    <SearchResultListProduct
      class="wf-mt-28"
      class-image="wf-space-y-21 wf-pt-20-i"
      :title="t('search.sections.related')"
      :keyword="keyword"
      :name="keyword"
      :list-box-tab="relatedTerms"
      :data="searchRelatedProducts"
      :display-type="displayType"
    />
    <WelfareLineHorizontal />
    <!--    Result list product (4)-->
    <SearchResultListProduct :data="productsResult" class-image="wf-pt-20-i" :display-type="displayType" />
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
        <span class="wf-color--f-95729--i">'{{ keyword }}'</span> {{ t('search.emptyResult.title') }}
      </div>
      <div class="wf-font_13-reg--lh130 wf-color--g-333 wf_text-center">
        <div>{{ t('search.emptyResult.subTitle1') }}</div>
        <div>{{ t('search.emptyResult.subTitle2') }}</div>
        <div>{{ t('search.emptyResult.subTitle3') }}</div>
        <div>{{ t('search.emptyResult.subTitle4') }}</div>
      </div>
    </div>
    <WelfareLineHorizontal />
    <!--    Recommend Product-->
    <SearchResultGroupProduct class="wf-my-30" :title="t('search.sections.recommend')" :data="recommendProducts" />
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/search/-welfare-search-page-result.scss');
</style>
