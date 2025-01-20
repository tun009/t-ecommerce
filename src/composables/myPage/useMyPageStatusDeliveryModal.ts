import { MyPageStatusDeliveryOrderDataModel, MyPageStatusDeliveryOrderProps } from '@/models/views/myPage/MyPageStatusOrderModal'
import { mainMember } from '@/services/api/myPage/MainMemberApi'
import { onBeforeMount, ref } from 'vue'

export const useMyPageStatusDeliveryModal = (props: MyPageStatusDeliveryOrderProps) => {
  const isLoading = ref(false)

  const data = ref<MyPageStatusDeliveryOrderDataModel>()

  onBeforeMount(() => {
    isLoading.value = true
    mainMember
      .getInfoStatusDelivery(props.id)
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

  return {
    isLoading,
    data
  }
}
