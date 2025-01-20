import { Swiper } from 'swiper/types'
import { ref } from 'vue'

export const useSwiper = (defaultAutoPlay = false) => {
  const autoPlay = ref(defaultAutoPlay)
  const currentIndexActive = ref(0)
  const refSwipe = ref<Swiper>()

  const onActiveIndexChange = (swiper: Swiper) => {
    currentIndexActive.value = swiper.realIndex
  }

  const onSwiper = (swiper: Swiper) => {
    refSwipe.value = swiper
  }

  const onPre = () => {
    refSwipe?.value?.slidePrev?.()
  }

  const onNext = () => {
    console.log({
      refSwipe
    })
    refSwipe?.value?.slideNext?.()
  }

  const slideToIndex = (index: number) => {
    refSwipe?.value?.slideTo?.(index)
  }

  const onPause = () => {
    refSwipe?.value?.autoplay.stop?.()
  }

  const onPlay = () => {
    refSwipe?.value?.autoplay.start?.()
  }

  const handleAutoPlay = (value: boolean) => {
    autoPlay.value = value
    if (value) {
      onPlay()
      return
    }
    onPause()
  }

  return {
    currentIndexActive,
    onActiveIndexChange,
    onSwiper,
    slideToIndex,
    onPre,
    onNext,
    onPause,
    onPlay,
    handleAutoPlay,
    autoPlay
  }
}
