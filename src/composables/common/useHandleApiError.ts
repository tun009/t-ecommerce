import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { ref } from 'vue'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import router from '@/router'

export const useHandleApiError = () => {

  router.beforeEach(async () => {
    isShowed.value = false
  })

  const { openModal, closeModalByPop } = useModalNotification()
  const isShowed = ref(false)
  const handleError = (error?: BaseModelErrorResponse, message?: string, callback?: () => void) => {

    if (!isShowed.value) {
      isShowed.value = true
      let errorMessage = error?.message
      if (errorMessage === undefined || errorMessage === null) {
        errorMessage = message ?? ''
      }
      openModal?.({
        content: errorMessage,
        onAccept: () => {
          closeModalByPop?.()
          isShowed.value = false
          callback?.()
        }
      })
    }
  }

  return { handleError }
}
