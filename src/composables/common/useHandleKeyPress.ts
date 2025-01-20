import { ENTER_KEY, hideKeyboard } from '@/commons'
import { onMounted, onUnmounted } from 'vue'
import { useDebounce } from './useDebounce'
export const useHandleKeyPress = (callback: (event?: KeyboardEvent) => void, autoHideKeyboard = true, key: string = ENTER_KEY) => {
  const { debounce } = useDebounce()
  onMounted(() => {
    window.addEventListener('keydown', handleEnterPress)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEnterPress)
  })
  const handleEnterPress = (event: KeyboardEvent) => {
    const isEnterKey = event?.key === key || event?.code === key
    if (isEnterKey) {
      debounce(() => {
        if (autoHideKeyboard) hideKeyboard(event)
        return callback(event)
      })
    }
  }
}
