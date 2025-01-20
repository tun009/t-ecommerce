<script setup lang="ts">
import { useNavigation } from '@/composables/uikits/useNavigation'
import WelfareNavigationItem from './WelfareNavigationItem.vue'

const { listNavigation, currentIndex } = useNavigation()
</script>

<template>
  <div id="bottom-bar" class=" mz-bottom-navbar wf-bottom-fixed">
    <div class="mz-bottom-list">
      <WelfareNavigationItem
        v-for="(item, index) in listNavigation"
        :is-active="currentIndex === index"
        :data="item"
        :key="index"
      />
      <div class="wf-bottom_nav-indicator-container">
        <div class="wf-bottom_nav-indicator" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-navigation.scss');
</style>
