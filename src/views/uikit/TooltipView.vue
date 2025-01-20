<script setup lang="ts">
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareTitleInfo from '@/components/uikit/WelfareTitleInfo.vue'
import WelfareTooltip from '@/components/uikit/tooltip/WelfareTooltip.vue'
</script>

<template>
  <WelfareContainer title="COMPONENT">
    <WelfareTitleInfo
      title="Tolltip"
      des="활용법"
      subDes="기능에 대한 부가설명을 툴팁 아이콘을 통해 표현할 수 있습니다. Touch시 툴팁 내용이 노출됩니다. 툴팁의 최대 가로폭은 따로 명시되어 있지
            않으나 주변에 배치된 Component를 사용하기에 불편함 없는 크기를 권장하고 상세 내용이 5줄이상이 되지 않도록 내용을 정리하는 것을 권장합니다."
    />

    <div class="wf_grid wf_grid-cols-4 wf-color--g-333 wf-mt-60">
      <span class="wf-font_16--bold">Bottom </span>
      <div class="wf_flex wf_items-center wf-space-x-8">
        <span class="wf-font_15--reg wf-color--g-999">Left</span>
        <div class="wf_flex wf_justify-center wf_items-center wf_width-fit wf-space-x-5 wf-font_15--bold">
          텍스트 <WelfareTooltip text="툴팁텍스트" :type="'bottom'" :position="'left'" visible />
        </div>
      </div>
      <div class="wf_flex wf_items-center wf-space-x-8">
        <span class="wf-font_15--reg wf-color--g-999">Center</span>
        <div class="wf_flex wf_justify-center wf_items-center wf_width-fit wf-space-x-5 wf-font_15--bold">
          텍스트 <WelfareTooltip text="툴팁텍스트" :type="'bottom'" visible />
        </div>
      </div>
      <div class="wf_flex wf_items-center wf-space-x-8">
        <span class="wf-font_15--reg wf-color--g-999">Right</span>
        <div class="wf_flex wf_justify-center wf_items-center wf_width-fit wf-space-x-5 wf-font_15--bold">
          텍스트 <WelfareTooltip text="툴팁텍스트" :type="'bottom'" :position="'right'" visible />
        </div>
      </div>
    </div>

    <div class="wf_grid wf_grid-cols-4 wf-color--g-333 wf-mt-111">
      <span class="wf-font_16--bold">Top </span>
      <div class="wf_flex wf_items-center wf-space-x-8">
        <span class="wf-font_15--reg wf-color--g-999">Left</span>
        <div class="wf_flex wf_justify-center wf_items-center wf_width-fit wf-space-x-5 wf-font_15--bold">
          텍스트 <WelfareTooltip text="툴팁텍스트" :type="'top'" :position="'left'" visible />
        </div>
      </div>
      <div class="wf_flex wf_items-center wf-space-x-8">
        <span class="wf-font_15--reg wf-color--g-999">Center</span>
        <div class="wf_flex wf_justify-center wf_items-center wf_width-fit wf-space-x-5 wf-font_15--bold">
          텍스트 <WelfareTooltip text="툴팁텍스트" :type="'top'" visible />
        </div>
      </div>
      <div class="wf_flex wf_items-center wf-space-x-8">
        <span class="wf-font_15--reg wf-color--g-999">Right</span>
        <div class="wf_flex wf_justify-center wf_items-center wf_width-fit wf-space-x-5 wf-font_15--bold">
          텍스트 <WelfareTooltip text="툴팁텍스트" :type="'top'" :position="'right'" visible />
        </div>
      </div>
    </div>

   
    <div class="wf_grid wf_grid-cols-4 wf-color--g-333 wf-mt-60">
      <span class="wf-font_16--bold">Left </span>
      <div class="wf_flex wf_items-center wf-space-x-8">
        <span class="wf-font_15--reg wf-color--g-999"></span>
        <div class="wf_flex wf_justify-center wf_items-center wf_width-fit wf-space-x-5 wf-font_15--bold">
          텍스트 <WelfareTooltip text="툴팁텍스트" :type="'left'" visible />
        </div>
      </div>
    </div>

    <div class="wf_grid wf_grid-cols-4 wf-color--g-333 wf-mt-60">
      <span class="wf-font_16--bold">Right </span>
      <div class="wf_flex wf_items-center wf-space-x-8">
        <span class="wf-font_15--reg wf-color--g-999"></span>
        <div class="wf_flex wf_justify-center wf_items-center wf_width-fit wf-space-x-5 wf-font_15--bold">
          텍스트 <WelfareTooltip text="툴팁텍스트" :type="'right'" visible />
        </div>
      </div>
    </div>
  </WelfareContainer>
</template>
