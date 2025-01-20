<script setup lang="ts">
import IconFullPage from '@/components/icons/IconFullPage.vue'
import IconFullPageOff from '@/components/icons/IconFullPageOff.vue'
import IconMute from '@/components/icons/IconMute.vue'
import IconPause from '@/components/icons/IconPause.vue'
import IconPlayVideo from '@/components/icons/IconPlayVideo.vue'
import IconVolumeDown from '@/components/icons/IconVolumeDown.vue'

interface MediaControlVideoProps {
  muted?: boolean
  play?: boolean
  fullPage?: boolean
}

interface MediaControlVideoEmits {
  (e: 'onVolumeChange', value: boolean): void
  (e: 'onClickPlay', value: boolean): void
  (e: 'onClickFullPage', value: boolean): void
}

const props = defineProps<MediaControlVideoProps>()
const emit = defineEmits<MediaControlVideoEmits>()
</script>

<template>
  <div class="wf_flex wf-pl-23 wf-pr-20 wf-py-13 wf-opacity-40 wf-bg--g-111">
    <button class="" @click.stop="emit('onVolumeChange', !props.muted)">
      <IconVolumeDown v-if="!props.muted" />
      <IconMute v-else />
    </button>
    <button class="wf-pl-23" @click.stop="emit('onClickPlay', !props.play)">
      <IconPlayVideo :width="24" :height="16" v-if="!props.play" />
      <IconPause :width="24" :height="14" v-else />
    </button>
    <button class="wf-pl-27" @click.stop="emit('onClickFullPage', !props.fullPage)">
      <IconFullPage v-if="!props.fullPage" />
      <IconFullPageOff v-else />
    </button>
  </div>
</template>
