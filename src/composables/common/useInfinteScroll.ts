import { ref, watchEffect, Ref } from 'vue'

const useInfiniteScroll = (targetRef: Ref<HTMLElement | null>) => {
  const intersecting = ref(false)
  let observer: IntersectionObserver | null = null

  const getObserver = () => {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        intersecting.value = entries.some((entry) => entry.isIntersecting)
      })
    }
    return observer
  }

  watchEffect(() => {
    const target = targetRef.value

    if (target) {
      getObserver().observe(target)
    }

    return () => {
      if (observer && target) {
        observer.unobserve(target)
      }
    }
  })

  return intersecting
}

export default useInfiniteScroll
