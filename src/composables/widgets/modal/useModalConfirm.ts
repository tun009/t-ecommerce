import PopupConfirmText from '@/components/widgets/modal/popup/PopupConfirmText.vue'
import { useModal } from '@/composables/common/useModal'
import { ConfirmModalProps } from '@/models/widgets/modal'

export const useModalConfirm = () => {
  const modal = useModal<ConfirmModalProps>()

  const openModal = (options: ConfirmModalProps) => {
    modal.showModal?.({
      component: PopupConfirmText,
      props: {
        ...options,
        onCancel: options?.onCancel ? options.onCancel : modal.closeModalByPop,
        onConfirm: options?.onConfirm ? options.onConfirm : modal.closeModalByPop
      }
    })
  }
  const replaceModalConfirm = (options: ConfirmModalProps, index = 0) => {
    modal.replaceModal?.(
      {
        component: PopupConfirmText,
        props: {
          ...options,
          onCancel: options?.onCancel ? options.onCancel : modal.closeModalByPop,
          onConfirm: options?.onConfirm ? options.onConfirm : modal.closeModalByPop
        }
      },
      index
    )
  }
  return { ...modal, openModal, replaceModalConfirm }
}
