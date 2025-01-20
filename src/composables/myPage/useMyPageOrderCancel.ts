import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { orderApi } from '@/services/api/order/OrderApi'
import { useForm } from 'vee-validate'
import {
  MyPageOrderCancelModel,
  MyPageOrderCancelModelForm,
  MyPageOrderCancelProductOption,
  MyPageTicketClaimReceiver
} from '@/models/views/myPage/MyPageOrderCancelModel'
import { useBuildLink } from '../common/useBuildLink'
import { MYPAGE_ORDER_DELIVERY_INQUIRY, getImageProduct } from '@/commons'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { useModalConfirm } from '../widgets/modal/useModalConfirm'
import { useI18n } from 'vue-i18n'
import { useCheckbox } from '../common/useCheckBox'

export const useMyPageOrderCancelApply = () => {
  const orderData = ref<MyPageOrderCancelProductOption[]>([])
  const deliveryDetailAddress = ref<string>()
  const listAmountPayment = ref<MyPageOrderCancelModel>()
  const refExpander = ref()
  const welfarePointPaymentMethod = ref<number>()
  const creditCardPaymentMethod = ref<number>()
  const route = useRoute()
  const router = useRouter()
  const { processLink } = useBuildLink()
  const { t } = useI18n()

  const { openModal: openNotify, closeAllModal } = useModalNotification()
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()

  const orderKey = route.query.orderKey?.toString()

  const reasonButtonRefs = ref<Array<Element>>([])

  const mergeAddress = (streetAddress?: string | null, detailAddress?: string | null) => {
    return `${streetAddress ? streetAddress : ''} ${detailAddress ? detailAddress : ''}`
  }

  const isCheckedAgree = ref<boolean>(false)
  const listDefaultValues = ref<MyPageTicketClaimReceiver[]>([])
  const productCancelAmount = ref<number>(0)
  const additionalShippingCosts = ref<number>(0)
  const cancellationShippingFee = ref<number>(0)
  const refundAmount = computed(() => {
    return productCancelAmount.value + cancelShippingCost.value - additionalShippingCosts.value
  })
  const expectedCancellationAmount = computed(() => {
    return productCancelAmount.value + cancellationShippingFee.value
  })
  const orderShippingCost = ref<number>(0)
  const cancelShippingCost = ref<number>(0)
  const listId = computed(() => {
    return orderData.value.map((item) => item.orderDeliveryProductKey?.toString() ?? '') ?? []
  })
  const { listChecked, isCheckboxAll, handleCheckAll, handleChangeCheckBoxItem } = useCheckbox(listId)

  const onChangeCheckbox = (value: boolean) => {
    isCheckedAgree.value = value
  }
  const { setFieldValue, values } = useForm<MyPageOrderCancelModelForm>({
    initialValues: {
      cancelFee: 0,
      deliveryClaims: '',
      orderKey: orderKey,
      ticketClaimReceivers: listDefaultValues.value
    }
  })

  onMounted(() => {
    if (orderKey) {
      orderApi
        .getOrderCancel(orderKey)
        .then((response) => {
          listAmountPayment.value = response.data
          deliveryDetailAddress.value = mergeAddress(
            response.data.orderCancelProductResponses?.[0].orderEntryResponses[0].streetAddress,
            response.data.orderCancelProductResponses?.[0].orderEntryResponses[0].detailAddress
          )
          response.data.orderCancelProductResponses.forEach((dataPros) => {
            dataPros.orderEntryResponses.forEach((orderEntry) => {
              listDefaultValues.value?.push({
                receiverProductOrderKey: orderEntry.orderDeliveryProductKey.toString(),
                cancelMemo: '',
                cancelReasonCode: ''
              })
              orderData.value?.push({
                productOptions: `${orderEntry.optionLargeName}${orderEntry.optionMediumName}${orderEntry.optionSmallName}`,
                orderDeliveryProductKey: orderEntry?.orderDeliveryProductKey ?? 0,
                productName: dataPros.productResponse.productName ?? '',
                pricePromotion: dataPros.productResponse.productPrice ?? 0,
                productImage: getImageProduct(dataPros.productResponse.attachfilePathName, dataPros.productResponse.attachfileName),
                quantity: orderEntry.quantity ?? 0
              })
            })
          })
        })
        .catch(() => {})
    }
  })

  const handleReasonChange = (index: number, field: keyof MyPageTicketClaimReceiver, value: string) => {
    setFieldValue(`ticketClaimReceivers.${index}.${field}`, value)
  }

  watch(listDefaultValues.value, (newValue) => {
    setFieldValue('ticketClaimReceivers', newValue)
  })

  watch(listChecked, (newList) => {
    productCancelAmount.value = 0
    newList.forEach((_, index) => {
      productCancelAmount.value += orderData.value[index].pricePromotion ?? 0
    })
  })

  const handleLinkToDeliveryInquiry = () => {
    router.push(processLink(MYPAGE_ORDER_DELIVERY_INQUIRY))
  }

  const handlePutOrderCancel = () => {
    const filterListChecked = values.ticketClaimReceivers.filter((item) => listChecked.value.includes(item.receiverProductOrderKey as string))
    let isReason = false
    const newForm: MyPageOrderCancelModelForm = {
      ...values,
      ticketClaimReceivers: filterListChecked
    }
    if (filterListChecked.length > 0) {
      reasonButtonRefs.value = []
      filterListChecked.forEach((item) => {
        if (!item.cancelReasonCode) {
          const button = document.querySelector(`#reasonButton-${item.receiverProductOrderKey}`)
          if (button) {
            reasonButtonRefs.value.push(button)
          }
          isReason = false
        } else {
          isReason = true
        }
      })
      if (!isReason) {
        openNotify?.({
          content: t('myPage.orderCancel.chooseAReasonNotify'),
          onAccept: () => {
            scrollToUnselectedReason(reasonButtonRefs.value[0])
            closeModalByPop?.()
          }
        })
      }

      if (isReason) {
        openConfirm?.({
          content: !isCheckedAgree.value ? t('myPage.orderCancel.orderCancelNotAgree') : t('myPage.orderCancel.confirmPut'),
          onConfirm() {
            closeAllModal?.()
            onPutCancelOrder(newForm)
          },
          onCancel() {
            closeModalByPop?.()
          }
        })
      }
    } else {
      openNotify?.({
        content: t('myPage.orderCancel.notItem')
      })
      return
    }
  }

  const onPutCancelOrder = (formData: MyPageOrderCancelModelForm) => {
    const newFormData: MyPageOrderCancelModelForm = {
      ...formData,
      cancelFee: refundAmount.value
    }
    orderApi
      .putOrderCancel(newFormData)
      .then(() => {
        openNotify?.({
          content: 'myPage.orderCancel.putSuccess',
          onAccept() {
            router.push(processLink(MYPAGE_ORDER_DELIVERY_INQUIRY))
            closeAllModal?.()
          }
        })
      })
      .catch(() => {})
  }

  const scrollToUnselectedReason = (view: Element) => {
    if (view) {
      view.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return {
    orderKey,
    orderData,
    refExpander,
    deliveryDetailAddress,
    handleLinkToDeliveryInquiry,
    values,
    handlePutOrderCancel,
    onChangeCheckbox,
    isCheckedAgree,
    isCheckboxAll,
    handleCheckAll,
    handleChangeCheckBoxItem,
    handleReasonChange,
    listChecked,
    productCancelAmount,
    reasonButtonRefs,
    additionalShippingCosts,
    refundAmount,
    welfarePointPaymentMethod,
    creditCardPaymentMethod,
    orderShippingCost,
    cancelShippingCost,
    expectedCancellationAmount,
    listAmountPayment
  }
}
