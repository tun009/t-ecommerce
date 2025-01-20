<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconArrowSquare from '@/components/icons/IconArrowSquare.vue'
import IconArrowTop from '@/components/icons/IconArrowTop.vue'
import IconPlusNavigation from '@/components/icons/navigation/IconPlusNavigation.vue'

const scrollTop = () => {
  document.documentElement.scrollTop = 0
}
</script>

<template>
  <div id="wf-float-button-navigation" class="wf_flex-row wf_justify-between wf_items-end wf-space-y-12 wf-float-button-navigation">
    <div class="wf-float-button-navigation-item wf_flex wf_flex-col wf-space-y-12">
      <button class="wf-item-float-button-item wf-float-button-navigation-hide">
        <IconPlusNavigation :color="defaultColor.gray1" />
      </button>
      <button class="wf-item-float-button-item wf-float-button-navigation-hide">
        <IconArrowSquare />
      </button>
      <button @click="scrollTop" class="wf-item-float-button-item wf-float-button-navigation-hide">
        <IconArrowTop />
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-float-button.scss');
</style>
