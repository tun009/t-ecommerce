<!-- FO_MC_MA011500 -->
<script setup lang="ts">
import IconLogoPlay from '@/components/icons/IconLogoPlay.vue'
import IconFaceNotFound from '@/components/icons/IconFaceNotFound.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { useRouter } from 'vue-router'
import { HOMEPAGE_ROUTER } from '@/commons'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useBuildLink } from '@/composables/common/useBuildLink'
const router = useRouter()
const { openModal: openNotification } = useModalNotification()
const openModalComingSoon = (text: string) => {
  openNotification({
    content: text
  })
}
const { processLink } = useBuildLink()
</script>
<template>
  <div class="error-container">
    <div class="error-main">
      <IconLogoPlay />
      <div class="error-main-content wf-mt-40">
        <IconFaceNotFound />
        <div class="wf-font_19--semi wf-color--f-95729 wf-error-title wf-space-y-7 wf-mt-16">
          <p>{{ $t('errorNotFound.sorry') }}</p>
          <p>{{ $t('errorNotFound.title') }}</p>
        </div>
        <p class="wf-font_15-reg--lh140 wf-mt-11 wf-error-desc wf-color--g-555555">{{ $t('errorNotFound.content') }}.</p>
      </div>
    </div>
    <div class="error-action wf_flex-col wf_flex wf-space-y-8 wf-mt-37">
      <WelfareButtonLine
        class="custom-button"
        type="md"
        :text="$t('errorNotFound.customService')"
        @click="openModalComingSoon($t('errorNotFound.comingSoon'))"
      />
      <WelfareButtonLine :active="true" @click="router.push(processLink(HOMEPAGE_ROUTER))" type="md" :text="$t('errorNotFound.goToMain')" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/_welfare-error-page.scss');
</style>
