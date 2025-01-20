<script lang="ts" setup>
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareProductDetail from '@/components/uikit/product/WelfareProductDetail.vue'
</script>
<template>
  <WelfareContainer>
    <div class="wf-pb-20 wf-br-b-1 wf-br--g-bbb">
      <p class="wf-font_16--bold"><span class="wf-font_23--bold">Product details</span> / 가격 노출 유형 디자인</p>
    </div>
    <div class="wf_width-343">
      <WelfareProductDetail />
    </div>
  </WelfareContainer>
</template>
