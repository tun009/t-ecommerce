import PopupNotification from '@/components/widgets/modal/popup/PopupNotification.vue'
import { useModal } from '@/composables/common/useModal'
import { NotificationModalProps } from '@/models/widgets/modal'

export const useModalNotification = () => {
  const modal = useModal<NotificationModalProps>()

  const openModal = (options: NotificationModalProps) => {
    modal.showModal?.({
      component: PopupNotification,
      props: {
        ...options,
        onAccept: options?.onAccept ? options.onAccept : modal.closeModalByPop,
        onClose: options?.onClose ? options.onClose : modal.closeModalByPop
      }
    })
  }

  const replaceModalNotification = (options: NotificationModalProps, index = 0) => {
    modal.replaceModal?.(
      {
        component: PopupNotification,
        props: {
          ...options,
          onAccept: options?.onAccept ? options.onAccept : modal.closeModalByPop,
          onClose: options?.onClose ? options.onClose : modal.closeModalByPop
        }
      },
      index
    )
  }
  return { openModal, replaceModalNotification, ...modal }
}
