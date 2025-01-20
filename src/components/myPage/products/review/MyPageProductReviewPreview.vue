<script setup lang="ts">
import IconPlayVideoCircle from '@/components/icons/IconPlayVideoCircle.vue'
import MypageFileUploadDetail from '@/components/myPage/common/MypageFileUploadDetail.vue'
import { useModal } from '@/composables/common/useModal'
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import { isAndroid, isIos } from '@/commons'
const { showModal, closeModalByPop } = useModal()

interface PreviewDataType {
  src: string
  type: string
}

interface MyPageFileInputProps {
  data?: PreviewDataType[]
  isEdit: boolean
}

const props = defineProps<MyPageFileInputProps>()

const emits = defineEmits<(e: 'removeFile', index: number) => void>()
const isMobile = isAndroid || isIos

const showLargeImage = (index: number) => {
  showModal?.({
    component: MypageFileUploadDetail,
    props: {
      activeItem: index,
      medias: props.data?.map((v) => ({ src: v.src, type: v.type.includes('image') ? 'image' : 'video' }))
    },
    events: {
      onClose: () => closeModalByPop?.()
    }
  })
}

const handleRemoveFile = (i: number) => {
  emits('removeFile', i)
}
</script>
<template>
  <div class="prd-media-preview wf_flex wf-space-x-5">
    <div v-for="(media, index) in props.data" :key="index">
      <div class="wf_relative wf_width-80 wf_height-80">
        <div
          v-if="!props.isEdit"
          class="btn-delete wf_absolute wf_flex wf-px-4 wf-py-4 wf_items-center wf_justify-center wf-top-0 wf-right-0 wf_width-20 wf_height-20 wf-box-circle wf-bg-black-06 wf_zIndex-1001"
          @click="handleRemoveFile(index)"
        >
          <IconClose :width="16" :height="16" :color="defaultColor.white" />
        </div>
        <video
          v-if="media.type.includes('video')"
          class="wf_width-80 wf_height-80 wf_image--cover"
          alt="media product"
          preload="none"
          playsinline="false"
          :autoplay="false"
          :poster="isMobile ? media?.src : ''"
          @click="() => showLargeImage(index)"
          :src="media?.src"
        ></video>
        <img v-else class="wf_width-80 wf_height-80 wf_image--cover" :src="media.src" alt="media product" @click="() => showLargeImage(index)" />
        <div
          v-if="media?.type?.includes('video')"
          class="wf_absolute wf-top-0 wf-bottom-0 wf-left-0 wf-right-0 wf_flex wf_items-center wf_justify-center wf-pointer"
          @click="() => showLargeImage(index)"
        >
          <IconPlayVideoCircle />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.prd-media {
  &-preview {
    overflow-x: auto;
    padding-top: 2.6rem;
    gap: 0.875rem;
    display: flex;

    .btn-delete {
      transform: translate(40%, -40%);
    }
  }
}
</style>
