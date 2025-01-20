<script setup lang="ts">
import WelfareButtonSimple from '@/components/uikit/button/WelfareButtonSimple.vue'
import { useLocalization } from '@/composables/common/useLocalization'

const { changeToEnglish, changeToKorea } = useLocalization()
</script>

<template>
  <div class="wf_flex wf_flex-col wf-space-y-30">
    <WelfareButtonSimple @click="changeToEnglish()" text="English"></WelfareButtonSimple>
    <WelfareButtonSimple @click="changeToKorea()" text="한국어"></WelfareButtonSimple>

    <p>{{ $t('hello') }}</p>
    <p>{{ $t('welcome') }}</p>
  </div>
</template>
