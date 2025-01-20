<script setup lang="ts">
import WelfareFooterWrapper from '@/components/layout/WelfareFooterWrapper.vue'
</script>

<template>
  <div id="wf-root-scroll-y" class="wf_min-height-screen wf_flex wf_flex-col">
    <router-view></router-view>
    <WelfareFooterWrapper />
  </div>
</template>
