<!-- FO_MC_MA011800 -->
<script setup lang="ts">
import IconLogoPlay from '@/components/icons/IconLogoPlay.vue'
import IconMoveToApp from '@/components/icons/IconMoveToApp.vue'
</script>
<template>
  <div class="wf-move-to-app wf-space-y-9">
    <IconMoveToApp />
    <div class="wf-move-to-app-content wf-font_19-semi--lh130 wf-mt-4 wf-color--g-333" v-html="$t('moveToApp.content')">
    </div>
    <div class="wf-mt-19">
        <IconLogoPlay />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url('@/assets/styles/views/_welfare-move-to-app.scss');
</style>
