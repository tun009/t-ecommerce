<script setup lang="ts">
import IconVolumeDown from '@/components/icons/IconVolumeDown.vue'
import IconFullPageOff from '@/components/icons/IconFullPageOff.vue'
import IconMute from '@/components/icons/IconMute.vue'
import IconFullPage from '@/components/icons/IconFullPage.vue'

interface ProductDetailVideoMediaProps {
  fullPage?: boolean
  isMute?: boolean
}

interface ProductDetailVideoMediaEmit {
  (e: 'onChangeMute', value: boolean): void
  (e: 'onClickFullPage'): void
  (e: 'onCloseFullscreen'): void
}

defineProps<ProductDetailVideoMediaProps>()
defineEmits<ProductDetailVideoMediaEmit>()
</script>
<template>
  <div class="wf_flex wf_justify-center wf_items-center wf-space-x-10">
    <div @click="() => $emit('onChangeMute', !$props.isMute)">
      <IconVolumeDown v-if="!$props.isMute" />
      <IconMute v-else />
    </div>
    <button>
      <IconFullPage v-if="!$props.fullPage" @click.stop="$emit('onClickFullPage')" />
      <IconFullPageOff v-else @click.stop="$emit('onCloseFullscreen')" />
    </button>
  </div>
</template>
