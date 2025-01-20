import { ref } from 'vue'

export const useExpander = (defaultValue = false) => {
  const isExpander = ref(defaultValue)
  const handleToggleExpander = () => {
    isExpander.value = !isExpander.value
  }
  const handleHideExpander = () => {
    isExpander.value = false
  }
  const handleShowExpander = () => {
    isExpander.value = true
  }
  return {
    handleToggleExpander,
    handleHideExpander,
    handleShowExpander,
    isExpander
  }
}
