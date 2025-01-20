<script setup lang="ts">
import MainPageLayout from '@/components/layout/MainPageLayout.vue'
import { HomeGNBType } from '@/models/views/home/HomeGnbProductModel'
import HomePage from './HomePage.vue'
import ProductTodaySpecialPricePage from '../preview/ProductTodaySpecialPricePage.vue'
import ProductRankedListOfBestPage from '../preview/ProductRankedListOfBestPage.vue'
const listComponentRender = {
  [HomeGNBType.MAIN]: HomePage,
  [HomeGNBType.TIMEDEAL]: ProductTodaySpecialPricePage,
  [HomeGNBType.BEST]: ProductRankedListOfBestPage,
  [HomeGNBType.EVENT]: ProductTodaySpecialPricePage,
  [HomeGNBType.PLANSHOP]: ProductTodaySpecialPricePage,
  [HomeGNBType.THEME]: ProductTodaySpecialPricePage
}
</script>
<template>
  <MainPageLayout>
    <template #content="{ type, id }">
      <KeepAlive v-if="type">
        <component :is="listComponentRender[type]" :id="id" />
      </KeepAlive>
    </template>
  </MainPageLayout>
</template>
