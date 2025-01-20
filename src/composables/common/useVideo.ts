import { exitFullscreen, isAppleDevice, openFullscreen } from "@/commons"
import { onMounted, ref, watch } from "vue"
import { useOrientationDevice } from "./useOrientationDevice"

export const useVideo = (emitFullscreenChange?: any) => {
  const elementWrapVideo = ref<any>()
  const videoRef = ref<any>()
  const videoProgressRef = ref<any>()
  const isFullPage = ref(false)
  const isPlay = ref(false)
  const isMute = ref(false)
  const percentVideo = ref(0)
  const durationVideo = ref(0)
  const isRotate = useOrientationDevice()

  onMounted(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        handleFullscreenClose()
      }
    })
  })

  const handleChangePlay = (play: boolean) => {
    isPlay.value = play
    if (play) {
      videoRef.value.play()
      if (isAppleDevice) {
        videoRef.value.webkitExitFullscreen()
      }
    } else {
      videoRef.value.pause()
    }
  }

  const handleChangeMute = (mute: boolean) => {
    isMute.value = mute
    videoRef.value.muted = mute
  }

  const handleOpenFullPage = () => {
    isFullPage.value = true
    if (isAppleDevice) {
      if (videoRef.value.webkitSupportsFullscreen) {
        videoRef.value.webkitEnterFullscreen()
      } else {
        videoRef.value.requestFullscreen()
      }

    } else {
      openFullscreen(elementWrapVideo.value)
    }
    setStyleProgress(percentVideo.value)
  }

  const handleFullscreenClose = () => {
    isFullPage.value = false
    exitFullscreen()
  }

  const onLoadedMetaData = (e: any) => {
    durationVideo.value = e.target.duration
  }

  const onPause = () => {
    handleChangePlay(false)
  }

  const onPlay = () => {
    handleChangePlay(true)
  }

  const onPlaying = () => {
    setStyleProgress(videoRef.value.currentTime * 100 / durationVideo.value)
    if (percentVideo.value >= 100) onPause()
  }

  const onProgressChange = (range: any) => {
    setStyleProgress(range.target.value)
    videoRef.value.currentTime = percentVideo.value / 100 * durationVideo.value
  }

  const onVolumeChange = (e: any) => {
    handleChangeMute(e.target.muted || e.target.volume === 0)
  }

  const setStyleProgress = (percent: number) => {
    percentVideo.value = percent
    videoProgressRef.value?.style?.setProperty("--progress-bar-range", percentVideo.value + "%")
  }

  watch(isFullPage, (newFullscreen) => {
    emitFullscreenChange?.(newFullscreen)
  })

  return {
    isRotate,
    elementWrapVideo,
    isFullPage,
    videoRef,
    videoProgressRef,
    isPlay,
    isMute,
    percentVideo,
    durationVideo,
    onLoadedMetaData,
    onPlaying,
    onPause,
    onPlay,
    onProgressChange,
    onVolumeChange,
    handleChangePlay,
    handleChangeMute,
    handleOpenFullPage,
    handleFullscreenClose
  }
}