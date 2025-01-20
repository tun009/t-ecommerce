import { MyPageDeliveryOrderItemModel, MyPageStatusDeliveryOrderProps } from '@/models/views/myPage/MyPageStatusOrderModal'
import { mainMember } from '@/services/api/myPage/MainMemberApi'
import { onBeforeMount, ref } from 'vue'
import { useModal } from '../common/useModal'
import MyPageStatusDeliveryModal from '@/views/myPage/modal/MyPageStatusDeliveryModal.vue'

export const useMyPageListDeliveryModal = (props: MyPageStatusDeliveryOrderProps) => {
  const isLoading = ref(false)
  const { showModal, closeModalByPop } = useModal()

  const data = ref<MyPageDeliveryOrderItemModel[]>()
  onBeforeMount(() => {
    isLoading.value = true
    mainMember
      .getListDelivery(props.id)
      .then((result) => {
        data.value = result.data
      })
      .catch(() => {
        //
      })
      .finally(() => {
        isLoading.value = false
      })
  })

  const handleShowStatusDeliveryModal = (id: string | number) => {
    showModal?.({
      component: MyPageStatusDeliveryModal,
      props: {
        id
      },
      events: {
        onClose: closeModalByPop
      }
    })
  }

  return {
    isLoading,
    data,
    handleShowStatusDeliveryModal
  }
}
