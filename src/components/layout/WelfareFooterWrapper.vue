<script setup lang="ts">
import WelfareFooter from '@/components/layout/WelfareFooter.vue'
import WelfareNavigation from '@/components/uikit/navigation/WelfareNavigation.vue'
import FloatBottomButton from '../widgets/FloatBottomButton.vue'
import { useWelfareFooterWrapper } from '@/composables/layout/useWelfareFooterWrapper'

const { showNavigationBar, isHomePage, bannerFloat, showFooterNavigation, showFooter } = useWelfareFooterWrapper()
</script>

<template>
  <div class="wf-mt-auto">
    <WelfareNavigation v-if="showNavigationBar" />
    <FloatBottomButton :bannerFloat="isHomePage ? bannerFloat : []" v-if="showNavigationBar" />
    <WelfareFooter :is-hide-navigation="!showFooterNavigation" v-if="showFooter" />
  </div>
</template>
