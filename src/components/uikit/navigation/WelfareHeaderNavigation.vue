<script setup lang="ts">
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
import WelfareTab from '../tabs/WelfareTab.vue'
import WelfareNavigationLayout from './WelfareNavigationLayout.vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { ref } from 'vue'
interface Props {
  isDark?: boolean
  class?: string
  data: WelfareTabDataType[]
  currentActiveTab?: WelfareTabDataType
}

type WelfareHeaderNavigationEmit = (e: 'change-tab', item: WelfareTabDataType) => void

const props = defineProps<Props>()
const emits = defineEmits<WelfareHeaderNavigationEmit>()
const tabRef = ref()
const route = useRoute()
watch(
  () => route.query?.idx,
  () => {
    if(tabRef.value) {
      tabRef.value.setSelectTab(props.data[Number(route.query?.idx ?? 0)])
    }
  }
)
</script>
<template>
  <div>
    <div id="wf-header-navigation" class="wf-navigation-header mz-header" :class="[{ 'wf-bg--g-fff': !isDark }, props.class]">
      <div class="wf-px-16">
        <WelfareNavigationLayout :is-dark="props.isDark" />
      </div>
      <div class="wf-mt-15 wf-px-10">
        <WelfareTab
          ref="tabRef"
          v-if="props.data && props.currentActiveTab"
          @on-change="(item) => emits('change-tab', item)"
          :items="props.data"
          :type="props.isDark ? 'line-white' : 'line'"
          :default="props.currentActiveTab"
          name="main-header-navigation"
          class="wf-tab-big wf-pt-14"
        >
          <!-- <template #2>
            <span class="wf-font_12--bold wf-color--f-95729 wf-tab-sub-label"
              >5<span class="wf-font_9--bold">%</span>&nbsp;+&nbsp;5<span class="wf-font_9--bold">%</span></span
            >
          </template> -->
        </WelfareTab>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-header.scss');
</style>
