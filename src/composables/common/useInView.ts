import { onMounted, onUnmounted, ref } from 'vue'

export function useInView<T>(isListening = false) {
  const isInView = ref(false)
  const refTag = ref<T>()
  let observer: IntersectionObserver

  onMounted(() => {
    const rf = refTag.value as HTMLElement
    observer = new IntersectionObserver((entries) => {
      if (isListening || entries[0].isIntersecting) {
        isInView.value = entries[0].isIntersecting
      }
    })

    if (refTag.value) observer.observe(rf)
  })

  onUnmounted(() => {
    const rf = refTag.value as HTMLElement
    if (rf && observer) observer.unobserve(rf)
  })

  return { isInView, refTag }
}

export default useInView
