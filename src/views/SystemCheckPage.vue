<script setup lang="ts">
import IconLogoPlay from '@/components/icons/IconLogoPlay.vue'
import IconFaceSystemCheck from '@/components/icons/IconFaceSystemCheck.vue'
</script>
<template>
  <div class="wf-error-container">
    <div class="wf-error-main">
      <IconLogoPlay />
      <div class="wf-error-main-content wf-mt-40">
        <IconFaceSystemCheck />
        <div class="wf-font_19--semi wf-error-title wf-space-y-7 wf-mt-16">
          <p>{{ $t('systemCheck.titleOne') }}</p>
          <p>{{ $t('systemCheck.titleTwo') }}</p>
        </div>
        <div class="wf-font_14-reg--lh130 wf-mt-12 wf-color--g-555555">
          <p v-html="$t('systemCheck.content')"></p>
        </div>
      </div>
    </div>
    <div class="error-action wf_flex-col wf_flex wf-space-y-8 wf-mt-19 wf_w-full">
      <div class="wf-font_13--reg">
        <div class="wf-sysCheck-group-row">
          <p class="wf-sysCheck-group-row-title">{{ $t('systemCheck.date') }}</p>
          <p class="wf-sysCheck-group-row-content">2024. 11. 3 (목) 13:00~19:00 (6시간)</p>
        </div>
        <div class="wf-sysCheck-group-row wf-sysCheck-group-row--end">
          <p class="wf-sysCheck-group-row-title">{{ $t('systemCheck.detail') }}</p>
          <p class="wf-sysCheck-group-row-content">주문배송조회등 온라인 서비스 점검</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/_welfare-system-check.scss');
</style>
