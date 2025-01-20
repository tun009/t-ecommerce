<script setup lang="ts">
import IconDot from '@/components/icons/IconDot.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconVideo from '@/components/icons/IconVideo.vue'
import { BaseModalEmits } from '@/models/widgets/modal'

interface modalPropsType extends BaseModalEmits {
  (e: 'onChange', file: File): void
}

const emit = defineEmits<modalPropsType>()

const handleFileInput = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files
  if (fileList) {
    for (let i = 0; i < fileList.length; i++) {
      emit('onChange', fileList[i])
    }
  }
  emit('onClose')
}
</script>

<template>
  <div class="wf_modal-confirm wf-space-y-30 wf-pb-20-important">
    <WelfareTitleModal
      :title="$t('myPage.fileUpload.inquiryTitle')"
      class="wf-pt-10 wf-pb-15"
      classTitle=" wf_letter-spacing--0745 "
      @close="$emit('onClose')"
    />
    <div class="wf_flex wf_flex-col wf-space-y-20 wf_width-full wf-mt-2">
      <div class="wf_flex wf_flex-col wf-space-y-10 wf-mb-1">
        <div class="wf_flex wf_items-center wf-space-x-5 wf-font_13--reg wf-color--g-777 notice-margin">
          <span>
            <IconDot />
          </span>
          <span class="wf-mt-10">{{ $t('myPage.fileUpload.inquiryNotice') }}</span>
        </div>
      </div>
    </div>
    <div class="wf_flex wf-space-x-11 wf_width-full uplpad-btn">
      <label htmlFor="imgUpload">
        <div class="btn line-btn line-btn-51 normal wf_flex-1">
          <IconCamera class="icon-svg" />
          {{ $t('myPage.fileUpload.photoBtn') }}
        </div>
      </label>
      <input class="wf_file_upload" type="file" id="imgUpload" @change="handleFileInput" :multiple="false" accept="image/jpeg, image/png" />
    </div>
    <div class="wf_flex wf-space-x-11 wf_width-full uplpad-btn btn-margin">
      <label htmlFor="videoUpload">
        <div class="btn line-btn line-btn-51 normal wf_flex-1">
          <IconVideo class="icon-svg" />
          {{ $t('myPage.fileUpload.videoBtn') }}
        </div>
      </label>
      <input class="wf_file_upload" type="file" id="videoUpload" @change="handleFileInput" :multiple="false" accept="video/mp4, video/quicktime" />
    </div>
  </div>
</template>

<style scoped>
input {
  position: absolute;
  left: -9999em;
}
label {
  width: 100%;
}
.wf_modal-confirm {
  row-gap: 20px;

  .notice-margin {
    margin-top: -10px;
  }
}
.icon-svg {
  margin-right: 0.6rem;
}
.uplpad-btn {
  .btn {
    width: 100%;
    color: #ffffff;
    border: 1px solid #1f1f1f;
    background: #111111;
    padding: 8px 6px;
    font-size: 15px;
    line-height: 100%;
    height: 51px;
    letter-spacing: -1px;
    font-weight: 700;
    min-width: 120px;
  }
  &.btn-margin {
    margin-top: -10px;
  }
}
</style>
