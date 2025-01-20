import { ref, Ref, computed } from 'vue'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useI18n } from 'vue-i18n'

export interface PreviewFileType {
  src: string
  type: string
}

export const useFileUploader = () => {
  const { t } = useI18n()
  const { openModal } = useModalNotification()

  const files: Ref<File[]> = ref([])
  const previewFilesData: Ref<PreviewFileType[]> = ref([])
  const acceptedImageTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg']
  const acceptedVideoTypes: string[] = ['video/mp4', 'video/quicktime']
  const maxImageSize: number = 10 * 1024 * 1024 // 10MB
  const maxVideoSize: number = 300 * 1024 * 1024 // 300MB
  const maxImageCount: number = 5
  const maxVideoCount: number = 1

  const previewFiles = computed(() => previewFilesData.value)

  // 파일 업로드 벨리데이션
  const validateFile = (file: File) => {
    const { type, size } = file
    let validFlag = false
    const isImg = acceptedImageTypes.includes(type)
    const isVideo = acceptedVideoTypes.includes(type)
    const imgCount = (files.value || []).reduce((a, c) => {
      const check = acceptedImageTypes.includes(c.type) ? 1 : 0
      return a + check
    }, 0)
    const videoCount = (files.value || []).reduce((a, c) => {
      const check = acceptedVideoTypes.includes(c.type) ? 1 : 0
      return a + check
    }, 0)
    const isImgSize = isImg && size > maxImageSize // 이미지 파일 사이즈 체크
    const isVideoSize = isVideo && size > maxVideoSize // 동영상 파일 사이즈 체크
    const isImgCount = isImg && imgCount >= maxImageCount // 이미지 갯수 체크
    const isVideoCount = isVideo && videoCount >= maxVideoCount // 비디오 갯수 체크

    if ((!isImg && !isVideo) || isImgSize || isVideoSize || isImgCount || isVideoCount) validFlag = true

    if (validFlag) {
      openModal({
        content: t('myPage.fileUpload.notice')
      })
      return false
    }
    return true
  }

  // 리뷰 파일 업로드 이벤트
  const uploadReviewFile = (file: File): FormData | void => {
    if (file && validateFile(file)) {
      files.value.push(file)
      previewFilesData.value.push({ src: URL.createObjectURL(file), type: file.type })
    }
  }

  // 리뷰 파일 제거 이벤트
  const removeFile = (index: number): void => {
    files.value.splice(index, 1)
    previewFilesData.value.splice(index, 1)
  }

  // 리뷰 파일 form-data 형식 변환 이벤트
  const getFilesFormData = (): FormData => {
    const formData = new FormData() as FormData

    if (files.value && files.value.length > 0) {
      files.value.forEach((file, index) => {
        formData.append(`${file.type.includes('image') ? 'image' + (index + 1) : 'video'} `, file)
      })
    }

    return formData
  }

  return { files, previewFiles, uploadReviewFile, removeFile, getFilesFormData, validateFile }
}
