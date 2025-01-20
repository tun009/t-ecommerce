<script setup lang="ts">
import WelfareButtonTap from '@/components/uikit/button/WelfareButtonTap.vue'
import WelfareRadio from '@/components/uikit/input/WelfareRadio.vue'
import { ref } from 'vue'

const radioRef = ref(true)

const getClass = (value: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}
</script>

<template>
  <div class="wf-mx-auto wf_width-full wf-mt-12">
    <div class="wf_flex wf_flex-col wf-space-y-21 wf-px-16">
      <div class="wf_flex wf-space-x-5">
        <WelfareButtonTap type="tapCircleArrow" text="인기상품순" />
        <WelfareButtonTap type="tapCircleArrow" :active="true" text="이미지" />
        <WelfareButtonTap type="tapCircleArrow" text="혜택" />
      </div>
      <div class="">
        <div class="wf_grid-span-2 wf_flex wf_items-start wf_justify-between wf-space-x-26 wf-py-17 wf-border-width-b-1 wf-br--g-e-6 wf-color--g-333">
          <span :class="getClass(radioRef)">이미지로 보기</span>
          <WelfareRadio name="radio1" v-model="radioRef" :value="true" />
        </div>
        <div class="wf-mt-2 wf_grid-span-2 wf_flex wf_items-start wf_justify-between wf-space-x-26 wf-py-17 wf-border-width-b-1 wf-br--g-e-6">
          <span :class="getClass(!radioRef)">리스트로 보기</span>
          <WelfareRadio name="radio1" v-model="radioRef" :value="false" />
        </div>
      </div>
    </div>
  </div>
</template>
