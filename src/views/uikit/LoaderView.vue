<script setup lang="ts">
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareTitleInfo from '@/components/uikit/WelfareTitleInfo.vue'
import WelfareLoader from '@/components/uikit/loader/WelfareLoader.vue'
</script>

<template>
  <WelfareContainer>
    <WelfareTitleInfo
      title="Loader"
      des="활용법"
      subDes="Big 사이즈는 전체 화면전환시 데이터 불러오는 시간차이가 날 때 사용을 권장합니다. Small 사이즈는 부분 영역 내에서 로딩시 사용을 권장합니다."
    />
    <div class="wf-bg--g-f-3-f-3 wf_flex wf_justify-center wf_items-start wf-space-x-20 wf-py-20">
      <div class="">
        <div class="wf-font_14--reg wf-mb-20">BIG</div>
        <WelfareLoader />
      </div>
      <div class="wf-ml-12">
        <div class="wf-font_14--reg wf-mb-20">SMALL</div>
        <WelfareLoader small />
      </div>
    </div>
  </WelfareContainer>
</template>
