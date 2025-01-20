<script setup lang="ts">
import HTMListItem from '@/components/htmlList/HTMListItem.vue'
import { useHTMLListData } from '@/composables/htmlList/useHTMLListData'

const { items } = useHTMLListData()
</script>
<template>
  <div class="wf-html-content wf-px-16 wf-pt-16">
    <HTMListItem
      v-for="(item, index) in items"
      :key="index"
      :title="`${index + 1}.&nbsp;${item.title}`"
      :contents="item.contents"
      :visible="item.visible"
    />
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/commons/_welfare-html-list-local.scss');
</style>
