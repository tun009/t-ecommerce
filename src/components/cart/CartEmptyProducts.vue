<script setup lang="ts">
import IconCart from '@/components/icons/IconCart.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { HOMEPAGE_ROUTER } from '@/commons'
import { useBuildLink } from '@/composables/common/useBuildLink'
const { processLink } = useBuildLink()
</script>

<template>
  <div class="wf_height-416 wf-bg--white wf-border-width-b-1 wf_flex wf_justify-center wf_items-center">
    <div class="wf_flex wf_items-center wf_flex-col">
      <IconCart :width="60" :height="60" />
      <div class="wf-mt-20">{{ $t('cart.empty.description') }}</div>
      <router-link :to="processLink(HOMEPAGE_ROUTER)">
        <WelfareButtonLine class="wf-mt-40" lg-state="black-line" type="lg" :text="$t('cart.empty.buttonText')" />
      </router-link>
    </div>
  </div>
</template>
