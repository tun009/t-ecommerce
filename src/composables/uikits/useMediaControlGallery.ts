import { MediaControlGalleryEmits, MediaControlGalleryProps } from '@/models/uikits/WelfareMediaControl'

export const useMediaControlGallery = (props: MediaControlGalleryProps, events: MediaControlGalleryEmits) => {
  const handleClickLeft = () => {
    events('preSlide')
  }

  const handleClickRight = () => {
    events('nextSlide')
  }

  const handleClickPause = () => {
    events('onClickPause', !props.autoPlay)
  }

  return { handleClickLeft, handleClickRight, handleClickPause }
}
