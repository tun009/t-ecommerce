import { MODAL_PROVIDE } from '@/commons'
import { ModalContainerProps, ModalMutationProps, ModalProvideProps } from '@/models/widgets/modal'
import router from '@/router'
import { inject, provide, reactive, markRaw, watch } from 'vue'

export const useModalProvide = () => {
  const modalData = reactive<ModalProvideProps>({
    modals: []
  })

  function showModal(params: ModalContainerProps<any>) {
    modalData.modals.push({
      ...params,
      component: markRaw(params.component)
    })
  }
  const closeAllModal = () => {
    modalData.modals = []
  }

  const closeModalByPop = () => {
    modalData.modals.pop()
  }

  const closeModalByIndex = (index: number | number[]) => {
    try {
      if (modalData.modals?.length) {
        if (typeof index === 'number') {
          modalData.modals.splice(index, 1)
        } else {
          modalData.modals = modalData.modals.filter((_item, _index) => !index.includes(_index))
        }
      }
    } catch (error) {
      //
    }
  }

  const replaceModal = (params: ModalContainerProps<any>, index = 0) => {
    if (modalData.modals?.length && index < modalData.modals?.length) {
      modalData.modals[index] = {
        ...params,
        component: markRaw(params.component)
      }
    }
  }

  watch(modalData, (newModals) => {
    if (newModals.modals.length > 0) {
      document.documentElement.style.overflowY = 'hidden'
      document.documentElement.style.overscrollBehavior = 'none'
    } else {
      const bottomSheet = document.querySelector('.bottom-sheet') as HTMLDivElement
      if (!bottomSheet) {
        document.documentElement.style.overflowY = 'auto'
        document.documentElement.style.removeProperty('overscroll-behavior')
      }
    }
  })

  provide(MODAL_PROVIDE, {
    closeAllModal,
    showModal,
    closeModalByPop,
    closeModalByIndex,
    replaceModal
  })

  router.beforeEach(async () => {
    closeAllModal()
  })

  return modalData
}

export function useModal<T>() {
  const mutationModal = inject<ModalMutationProps<T>>(MODAL_PROVIDE)
  return { ...mutationModal }
}
