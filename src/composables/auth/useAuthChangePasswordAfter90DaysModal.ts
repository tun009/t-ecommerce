import { useModalBottomSheet } from "@/composables/common/useModalBottomSheet"
import { AuthResetPasswordAfter90DaysModalProps } from "@/models/auth/AuthModel"
import { ModalBottomSheetType } from "@/models/widgets/modal"
import AuthResetPasswordAfter90DaysModal from "@/views/auth/resetPassword/AuthResetPasswordAfter90DaysModal.vue"

export const useAuthChangePasswordAfter90DaysModal = () => {
  const { showModal, closeModal } = useModalBottomSheet()

  const openModal = (props: AuthResetPasswordAfter90DaysModalProps) => {
    showModal?.({
      type: ModalBottomSheetType.swipeFitContent,
      component: AuthResetPasswordAfter90DaysModal,
      hideHeader: true,
      props
    })
  }
  return { openModal, closeModal }
}