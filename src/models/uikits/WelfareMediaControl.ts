export interface MediaControlGalleryProps {
  activeItem?: number
  total: number
  changeDuration?: number
  autoPlay?: boolean
  classTotal?: any
}

export interface MediaControlGalleryEmits {
  (e: 'onClickPause', value: boolean): void
  (e: 'onUpdateItem', item: number): void
  (e: 'preSlide'): void
  (e: 'nextSlide'): void
}
