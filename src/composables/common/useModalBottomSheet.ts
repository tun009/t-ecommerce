import { MODAL_BOTTOM_SHEET_PROVIDE } from '@/commons'
import { ModalBottomSheetContainerProps, ModalBottomSheetMutationProps } from '@/models/widgets/modal'
import { ref, inject, provide, markRaw } from 'vue'

export const useModalBottomSheetProvide = () => {
  const bottomSheetRef = ref()
  const isShow = ref(false)
  const modalData = ref<ModalBottomSheetContainerProps<any>>()

  function showModal(params: ModalBottomSheetContainerProps<any>) {
    if (!params.onCloseModalBottom) {
      params.onCloseModalBottom = () => {
        isShow.value = false
        modalData.value = undefined
      }
    }
    modalData.value = {
      ...params,
      component: markRaw(params.component)
    }
    isShow.value = true
  }

  const closeModal = () => {
    bottomSheetRef?.value?.close?.()
  }

  provide(MODAL_BOTTOM_SHEET_PROVIDE, {
    isShow,
    showModal,
    closeModal
  })

  return { bottomSheetRef, modal: modalData as ModalBottomSheetContainerProps<any> }
}

export function useModalBottomSheet<T>() {
  const mutationModal = inject<ModalBottomSheetMutationProps<T>>(MODAL_BOTTOM_SHEET_PROVIDE)
  return { ...mutationModal }
}
