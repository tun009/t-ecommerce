<script setup lang="ts">
import WelfareHeaderNavigation from '@/components/uikit/navigation/WelfareHeaderNavigation.vue'
import WelfareNavigationLayout from '@/components/uikit/navigation/WelfareNavigationLayout.vue'
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'

const dataTab = [
  {
    id: '1',
    label: '홈'
  },
  {
    id: '2',
    label: '제습&쿨링',
    slot: true
  },
  {
    id: '3',
    label: '떠나요바캉스'
  },
  {
    id: '4',
    label: '오늘의 특가'
  },
  {
    id: '5',
    label: '랭킹'
  },
  {
    id: '6',
    label: '패션'
  },
  {
    id: '7',
    label: '복지안내'
  }
]
</script>

<template>
  <div class="wf-navigation-scroll wf_flex wf_items-center">
    <WelfareHeaderNavigation :data="dataTab" />
    <div class="wf-px-16 wf_width-375 wf-navigation-header">
      <WelfareNavigationLayout :is-logo="false" :is-back="true" title="식품" />
      <div class="wf-mt-30">
        <WelfareTab :items="dataTab" type="line" :default="dataTab[0]" name="2" />
      </div>
      <div class="wf-mt-20">
        <WelfareTab :items="dataTab" type="round" :default="dataTab[0]" name="3" />
      </div>
    </div>
    <!-- <WelfareNavigation /> -->
  </div>
</template>
