<script setup lang="ts">
import { defineProps } from 'vue'

interface MyPageFileInputProps {
  label: string
  id?: string
  type?: string
  isDisabled?: boolean
}

const { label, id, type, isDisabled } = withDefaults(defineProps<MyPageFileInputProps>(), { id: 'default', type: 'image' })

const emits = defineEmits<(e: 'handleImgUpload', file: File) => void>()

const handleFileInput = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files

  if (fileList) {
    for (let i = 0; i < fileList.length; i++) {
      emits('handleImgUpload', fileList[i])
    }
  }
}
</script>
<template>
  <div class="file-box" :class="{ disabled: isDisabled }">
    <label :htmlFor="id">{{ label }}</label>
    <input
      type="file"
      :id="id"
      :disabled="isDisabled"
      @change="handleFileInput"
      :multiple="type === 'image'"
      :accept="type === 'image' ? 'image/jpeg, image/png' : 'video/mp4, video/quicktime'"
    />
  </div>
</template>

<style scoped lang="scss">
.file {
  &-box {
    &.disabled {
      background-color: #f5f5f5;
      border: 1px solid #e7e7e7;
      color: #9d9d9d;
      pointer-events: none;
    }

    color: #333333;
    border: 1px solid #111111;
    background: #ffffff;
    width: 84px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;

    &:hover,
    &:active {
      color: #ffffff;
      border: 1px solid #111111;
      background-color: #111111;
    }

    cursor: pointer;
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 0.9375rem;
      line-height: 100%;
      height: 41px;
      letter-spacing: -1px;
      font-weight: 600;
      cursor: pointer;
    }
    input {
      position: absolute;
      left: -9999em;
    }
  }
}
</style>
