import { onMounted, ref } from "vue"

export const useOrientationDevice = () => {
  const isRotate = ref()

  onMounted(() => {
    isRotate.value = !window.matchMedia('(orientation: portrait)').matches

    window.matchMedia('(orientation: portrait)').addEventListener('change', (m) => {
      isRotate.value = !m.matches
    })
  })

  return isRotate
}