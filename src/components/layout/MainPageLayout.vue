<script setup lang="ts">
import { useMainPageLayout } from '@/composables/widgets/layout/useMainPageLayout'
import WelfareHeaderNavigation from '../uikit/navigation/WelfareHeaderNavigation.vue'

const { isDart, refDivTarget, listConvertGNB, currentActiveTab, handleChangeTab, defaultTab } = useMainPageLayout()
</script>

<template>
  <!-- APP Download Notice Banner (Use Only on Mobile web) -->
  <!-- GNB -->
  <div class="wf_flex wf_flex-col wf_height-full">
    <WelfareHeaderNavigation
      :data="listConvertGNB"
      :currentActiveTab="defaultTab"
      :class="isDart ? 'bg-header' : ''"
      :is-dark="isDart"
      @change-tab="handleChangeTab"
    />

    <div ref="refDivTarget" class="wf-relative wf_rounded-tl-16 wf_rounded-tr-16 wf-pb-40 wf-bg--white wf_zIndex-2">
      <!-- slot: content -->
      <slot name="content" :type="currentActiveTab?.gnbGroupType" :id="currentActiveTab?.gnbGroupKey"></slot>
    </div>

    <!-- BNB: Tab Bar -->
    <!-- <WelfareNavigation /> -->
    <!-- <FloatBottomButton :bannerFloat="bannerFloat"/> -->
    <!-- <WelfareFooter :is-hide-navigation="false" class="wf-pb-93"/> -->
  </div>
</template>

<style lang="scss" scoped>
@import url('@/assets/styles/views/home/_welfare-main-page-layout.scss');
</style>
