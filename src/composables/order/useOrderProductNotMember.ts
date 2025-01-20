import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useModal } from '../common/useModal'
import OrderTermAndConditionModal from '@/views/order/modal/OrderTermAndConditionModal.vue'
import OrderConfirmPersonalInformationModal from '@/views/order/modal/OrderConfirmPersonalInformationModal.vue'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { useRoute, useRouter } from 'vue-router'
import { useBuildLink } from '../common/useBuildLink'
import { ORDER_CERTIFICATION } from '@/commons'

export const useOrderProductNotMember = () => {
  const { showModal, closeModalByPop } = useModal()
  const { openModal } = useModalNotification()
  const route = useRoute()
  const router = useRouter()
  const { processLink } = useBuildLink()
  const cartStore = useCartStore()
  const { cartProducts: productCustomerList } = storeToRefs(cartStore)
  const policy = ref({
    termUse: false,
    allowInfo: false
  })

  const showModalTermUse = () => {
    showModal?.({
      component: OrderTermAndConditionModal,
      events: {
        onClose: closeModalByPop
      }
    })
  }

  const showModalAllowInfo = () => {
    showModal?.({
      component: OrderConfirmPersonalInformationModal,
      events: {
        onClose: closeModalByPop
      }
    })
  }

  const handleSave = () => {
    if (!policy.value.termUse) {
      openModal?.({
        content: '이용동의 후 주문이 가능합니다.',
        onAccept: closeModalByPop
      })
      return
    }

    if (!policy.value.allowInfo) {
      openModal?.({
        content: '수집이용 동의 후 주문이 가능합니다.',
        onAccept: closeModalByPop
      })
      return
    }
    router.push(processLink(ORDER_CERTIFICATION))
  }

  onMounted(() => {
    handleShowModalPreview()
  })

  const handleShowModalPreview = () => {
    const modal = route.query.modal
    if (modal === 'terms_of_use') {
      showModalTermUse()
    } else if (modal === 'terms_and_conditions') {
      showModalAllowInfo()
    }
  }

  return {
    productCustomerList,
    policy,
    showModalTermUse,
    showModalAllowInfo,
    handleSave
  }
}
