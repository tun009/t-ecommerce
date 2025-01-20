<script setup lang="ts">
import WelfareButtonTap from '@/components/uikit/button/WelfareButtonTap.vue'
import { useAlert } from '@/composables/common/useAlert'

const { pushAlertInformation, pushAlertError, pushAlertSuccess } = useAlert()
</script>
<template>
  <div class="wf_flex wf-space-x-30 wf_items-center wf_height-screen wf_justify-center">
    <WelfareButtonTap
      @click="
        () =>
          pushAlertInformation?.({
            message: '텍스트가 들어갑니다.',
            onClosed: () => {
              // handle closed
            }
          })
      "
      text="INFORMATION"
    />
    <WelfareButtonTap
      @click="() => pushAlertError?.({ message: `<p>텍스트가 들어갑니다. <a href='#' class='wf-text-underline wf-ml-10'>돌아가기</a></p>` })"
      text="ERROR"
    />
    <WelfareButtonTap @click="() => pushAlertSuccess?.({ message: `<p>텍스트가 들어갑니다.</p>` })" text="SUCCESS" />
  </div>
</template>
