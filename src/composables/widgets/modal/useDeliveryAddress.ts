import { useModal } from '@/composables/common/useModal'
import { DeliveryAddressCodeEnum, DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModalConfirm } from './useModalConfirm'
import { useLoading } from '@/composables/common/useLoading'
import OrderAddDeliveryAddressModalVue from '@/views/order/modal/OrderAddDeliveryAddressModal.vue'
import { orderModalApi } from '@/services/api/order/OrderModalApi'

export const useDeliveryAddress = (isMyPage?: boolean) => {
  const items = ref<DeliveryAddressModel[]>([])
  const { t } = useI18n()
  const { showModal, closeModalByPop } = useModal()
  const { loading, setLoading } = useLoading()
  const { openModal, closeModalByPop: closeModalConfirmByPop } = useModalConfirm()
  const onShowModalHandleAddress = ({ isEdit, item = {} as DeliveryAddressModel }: { isEdit?: boolean; item?: DeliveryAddressModel }) => {
    showModal?.({
      component: OrderAddDeliveryAddressModalVue,
      props: {
        isEdit,
        item,
        classWrapper: isMyPage ? (!isEdit ? 'wf-my-page-delivery-address' : 'wf-my-page-delivery-edit-address') : undefined,
        title: isMyPage ? (isEdit ? 'myPage.deliveryAddress.editTitle' : 'myPage.deliveryAddress.addTitle') : undefined
      },
      events: {
        onClose: () => closeModalByPop?.(),
        onAccept: async () => {
          try {
            setLoading?.(true)
            await fetchData()
          } catch (error) {
            /* empty */
          } finally {
            setLoading?.(false)
          }
        }
      }
    })
  }

  const onEditAddress = (item: DeliveryAddressModel) => {
    onShowModalHandleAddress({ isEdit: true, item })
  }
  const onAddAddress = () => {
    onShowModalHandleAddress({})
  }
  const fetchData = async (close = true) => {
    try {
      setLoading?.(true)
      const result = await orderModalApi.getListAddressData()
      items.value = result.data
      if (close) closeModalByPop?.()
    } catch {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  }

  const onDeleteAddress = async (deliveryAddressKey: string | number) => {
    openModal?.({
      content: t('myPage.deliveryAddress.deleteConfirmMessage'),
      onConfirm: async () => {
        try {
          setLoading?.(true)
          await orderModalApi.deleteAddress(deliveryAddressKey)
          closeModalConfirmByPop?.()
          fetchData()
        } catch (error) {
          /* empty */
        } finally {
          setLoading?.(false)
        }
      }
    })
  }

  onMounted(async () => {
    fetchData(false)
  })

  const handleDisplayDeliveryAddressCode = (code: DeliveryAddressCodeEnum | undefined) => {
    if (code === DeliveryAddressCodeEnum.HOME) return t('order.modal.home')
    if (code === DeliveryAddressCodeEnum.COMPANY) return t('order.modal.office')
    return t('order.modal.others')
  }

  return { items, onEditAddress, onAddAddress, onDeleteAddress, handleDisplayDeliveryAddressCode, loading, closeModalByPop }
}
