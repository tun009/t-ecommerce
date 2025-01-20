<script setup lang="ts">
import WelfareMediaControlVideo from '@/components/uikit/mediaControl/WelfareMediaControlVideo.vue'
import { useModal } from '@/composables/common/useModal'
import { useVideo } from '@/composables/common/useVideo'
import ProductDetailEnlargeVideo from './ProductDetailEnlargeVideo.vue'

interface ProductDetailVideoProps {
  video: string
}

const props = defineProps<ProductDetailVideoProps>()

const { showModal, closeModalByPop } = useModal()
const { videoRef, isPlay, isMute, handleChangePlay, handleChangeMute } = useVideo()

const handleClickFullPage = () => {
  handleChangePlay(false)
  showModal?.({
    component: ProductDetailEnlargeVideo,
    props: {
      video: props.video
    },
    events: {
      onClose: closeModalByPop
    }
  })
}
</script>

<template>
  <div class="wf_width-full wf_height-full wf_flex wf_justify-center wf_items-center">
    <video ref="videoRef" class="wf_width-full wf_height-full" alt="media product" :src="$props.video"></video>
    <div class="wf_absolute wf-top-0 wf-bottom-0 wf-left-0 wf-right-0 wf_flex wf_items-center wf_justify-center">
      <WelfareMediaControlVideo
        :play="isPlay"
        :muted="isMute"
        @on-click-play="handleChangePlay"
        @on-volume-change="handleChangeMute"
        @on-click-full-page="handleClickFullPage"
      />
    </div>
  </div>
</template>
