import { numberRegex } from '@/commons'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { YesNoEnum } from '@/models/common'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { DeliveryAddressCodeEnum, DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { BaseApplyCouponConfirmModalEmits } from '@/models/widgets/modal'
import { orderModalApi } from '@/services/api/order/OrderModalApi'
import { OrderAddDeliveryAddressModalProps } from '@/views/order/modal/OrderAddDeliveryAddressModal.vue'
import { useForm } from 'vee-validate'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface OrderAddDeliveryAddressForm {
  deliveryAddressCode: DeliveryAddressCodeEnum
  deliveryAddressName: string
  deliveryZipCode: string
  loadNameAddress: string
  detailedAddress: string
  preTel: any
  tel: string
  preContact: any
  contact: string
}

export const useOrderAddDeliveryAddress = (props: OrderAddDeliveryAddressModalProps, emits: BaseApplyCouponConfirmModalEmits) => {
  const { t } = useI18n()
  const { openModal } = useModalNotification()
  const isSetDefault = ref(false)

  const codeTelList = ref<WelfareSelectDataModel[]>()

  const codeContactList = ref<WelfareSelectDataModel[]>()

  const deliveryLoadLotBasedAddress = ref('')
  const deliveryLoadNameAddress = ref('')
  const deliveryDetailedAddress = ref('')
  const refSearchAddress = ref()

  const { values, setFieldValue } = useForm<OrderAddDeliveryAddressForm>({
    initialValues: {
      deliveryAddressCode: DeliveryAddressCodeEnum.HOME,
      deliveryAddressName: '',
      deliveryZipCode: '',
      loadNameAddress: '',
      detailedAddress: '',
      preTel: {},
      preContact: {}
    }
  })

  const getDataFromForm = (values: OrderAddDeliveryAddressForm) => {
    return {
      deliveryAddressCode: values.deliveryAddressCode ?? '',
      deliveryAddressBaseYn: isSetDefault.value ? YesNoEnum.Y : YesNoEnum.N,
      deliveryAddressName: values.deliveryAddressName ?? '',
      address: {
        basicRoad: deliveryLoadNameAddress.value ?? '',
        basicJibun: deliveryLoadLotBasedAddress.value ?? '',
        zipCode: values.deliveryZipCode ?? '',
        detail: values.detailedAddress ?? ''
      },
      deliveryTelNumber: values?.contact ? values?.preContact?.value + values.contact?.replaceAll('-', '') : '',
      deliveryCellphoneNumber: values?.tel ? values?.preTel?.value + values.tel?.replaceAll('-', '') : ''
    }
  }

  const onSubmit = async () => {
    const dataRequest = getDataFromForm(values)
    let message = ''
    if (values.deliveryAddressName.length === 0) {
      message = t('order.modal.receive') + t('error.required')
    } else if (deliveryLoadNameAddress.value.length === 0 || deliveryLoadLotBasedAddress.value.length === 0 || values.detailedAddress.length === 0) {
      message = t('order.modal.address') + t('error.required')
    } else if (!values.preTel.value || !values.tel) {
      message = t('order.modal.tel') + t('error.required')
    }
    if (message) {
      openModal?.({
        content: message
      })
      return
    }

    try {
      if (props.isEdit) {
        await orderModalApi.editAddress(dataRequest, props.item.deliveryAddressKey ?? 0)
      } else {
        await orderModalApi.createNewAddress(dataRequest)
      }
      emits('onAccept')
    } catch (error: any) {
      let messageError = error?.data?.message
      if (error.data.errors?.length > 0) {
        messageError = error.data.errors[0].message
      }
      if (message.length === 0) {
        openModal?.({
          content: messageError
        })
      }
    }
  }

  onBeforeMount(() => {
    const promises = [orderModalApi.getCodeTelList(), orderModalApi.getCodeContactList()]
    Promise.all(promises)
      .then(([dataTel, dataContact]) => {
        codeTelList.value = dataTel.data
        codeContactList.value = dataContact.data
      })
      .catch(() => {})
  })

  onMounted(() => {
    if (props.isEdit) {
      const data = props.item
      deliveryDetailedAddress.value = data.address?.detail ?? ''
      deliveryLoadNameAddress.value = data.address?.basicRoad ?? ''
      deliveryLoadLotBasedAddress.value = data.address?.basicJibun ?? ''
      setFieldData(data)
    }
  })

  const setFieldData = (data: DeliveryAddressModel) => {
    isSetDefault.value = data?.deliveryAddressBaseYn === YesNoEnum.Y
    setFieldValue('deliveryAddressName', data.deliveryAddressName ?? '')
    setFieldValue('deliveryAddressCode', data.deliveryAddressCode ?? DeliveryAddressCodeEnum.COMPANY)
    setFieldValue('deliveryZipCode', data.address?.zipCode ?? '')
    setFieldValue('loadNameAddress', data.address?.basicRoad ?? '')
    setFieldValue('detailedAddress', data.address?.detail ?? '')
    const partsCellphone = data?.deliveryCellphoneNumber?.split('-') ?? []
    const partsContact = data?.deliveryTelNumber?.split('-') ?? []
    setFieldValue('preTel', { label: partsCellphone?.[0]?.toString(), value: partsCellphone?.[0]?.toString() })
    setFieldValue('tel', partsCellphone.slice(1).join('').replace(numberRegex, ''))
    setFieldValue('preContact', { label: partsContact?.[0]?.toString(), value: partsContact?.[0]?.toString() })
    setFieldValue('contact', partsContact.slice(1).join('').replace(numberRegex, ''))
  }

  const changeAddress = (data: DeliveryAddressModel) => {
    deliveryDetailedAddress.value = data?.address?.detail ?? ''
    deliveryLoadNameAddress.value = data?.address?.basicRoad ?? ''
    deliveryLoadLotBasedAddress.value = data?.address?.basicJibun ?? ''
    setFieldValue('deliveryZipCode', data?.address?.zipCode ?? '')
    setFieldValue('loadNameAddress', `${data?.address?.basicRoad}`)
    setFieldValue('detailedAddress', `${data?.address?.detail ?? ''}`)
  }

  return { values, setFieldValue, onSubmit, isSetDefault, codeTelList, codeContactList, refSearchAddress, changeAddress }
}
