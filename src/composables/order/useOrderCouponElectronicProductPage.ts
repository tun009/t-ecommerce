import {
  FO_BANK_PAYMENT,
  ORDER_E_PRODUCT_ROUTER,
  ORDER_PRODUCT_COMPLETED_ROUTER,
  buildUriFromBaseUri,
  getImageProduct,
  getNumberMoney,
  openContactDevice,
  storage
} from '@/commons'
import { RequestPayParams, usePayment } from '@/composables/payment/usePayment'
import { ORDER_CHANNEL, PayMethod, YesNoEnum } from '@/models/common'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { SellerCompanyShipmentDeliveryStatus } from '@/models/views/member/SellerCompanyShipment'
import {
  OrderCartGroupDeliveryAddressModel,
  OrderCartProductModel,
  OrderInfoPeopleSendProductModel,
  OrderProductTicket,
  OrderTicketProductFormModel,
  orderProductListDataCountPeople
} from '@/models/views/order/OrderProductPageModel'
import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'
import { memberApi } from '@/services/api/member/memberApi'
import { orderApi } from '@/services/api/order/OrderApi'
import { useAccountStore } from '@/stores/account'
import OrderApplyCouponModal from '@/views/order/modal/OrderApplyCouponModal.vue'
import OrderInstantDiscountDetailsModal from '@/views/order/modal/OrderInstantDiscountDetailsModal.vue'
import OrderMakePaymentModal from '@/views/order/modal/OrderMakePaymentModal.vue'
import { storeToRefs } from 'pinia'
import { computed, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from '../common/useLoading'
import { useModal } from '../common/useModal'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { useOrderBank } from './useOrderBank'
import { useOrderVoucher } from './useOrderVoucher'

export const useOrderCouponElectronicProductPage = () => {
  const cartProducts = ref<OrderCartProductModel>()
  const productDetail = ref<OrderProductTicket>()
  const { showModal: openModal, closeModalByPop } = useModal()
  const { openModal: openModalNotification } = useModalNotification()
  const { openModal: openModalNotificationPayment, closeModalByPop: closeModalByPopPayment } = useModalNotification()
  const router = useRoute()
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)
  const { setLoading } = useLoading()
  const { requestPay } = usePayment()
  const navigate = useRouter()

  const {
    paymentMethodUseAgain,
    switchMethodPaymentRadio,
    currentBank,
    methodPaymentSelect,
    installmentMonthSelect,
    optionsPaymentMethod,
    optionsInstallmentMonthSelect,
    dataBanks,
    validateBank
  } = useOrderBank()

  const infoOutGoingList = ref<OrderInfoPeopleSendProductModel[]>([
    {
      name: '',
      phone: ''
    }
  ])

  const massageOutGoing = ref({
    name: '',
    message: ''
  })
  watch(
    () => account.value,
    (newAccount) => {
      massageOutGoing.value.name = newAccount?.memberName ?? ''
    }
  )

  const multiSendPeople = ref(false)

  const selectDataCountPeople = ref(orderProductListDataCountPeople[0])
  const instantDiscount = ref(0)
  const couponDiscount = ref(0)
  const totalPriceBeforeUseWelfarePoint = computed(() => {
    return totalPriceBeforeDiscount.value - Number(couponDiscount.value ?? 0)
  })

  const {
    welPointInput,
    pointInput,
    savePointInput,
    welfarePointCheckBox,
    pointCheckbox,
    savePointCheckbox,
    dataVoucher,
    handleUpdateWelPointInput,
    totalPoint
  } = useOrderVoucher(totalPriceBeforeUseWelfarePoint)
  const getQuantity = (quantity: number) => {
    if (!productDetail.value) return quantity
    let quantityNew = quantity
    if (productDetail.value?.minBuyqntUseYn === YesNoEnum.Y) {
      quantityNew = quantityNew < productDetail.value?.minBuyQnt ? productDetail.value?.minBuyQnt : quantityNew
    }

    if (productDetail.value?.maxBuyQntUseYn === YesNoEnum.Y) {
      quantityNew = productDetail.value?.minBuyQnt ? productDetail.value?.minBuyQnt : quantityNew
    }
    return quantityNew
  }
  const quantityProduct = ref<number>(getQuantity(Number(router.query?.quantity)))

  const totalPriceBeforeDiscount = computed(() => {
    return (
      quantityProduct.value *
      (getNumberMoney(productDetail.value?.productResponse?.productPrice) - Number(productDetail.value?.immediatelyDiscountResponse?.amount ?? 0))
    )
  })
  const costDelivery = ref(0)

  const totalPriceDiscount = computed(() => {
    return getNumberMoney(instantDiscount.value) + getNumberMoney(couponDiscount.value)
  })

  const priceSavePoint = ref(0)
  const totalPricePayment = computed(() => {
    return totalPriceBeforeDiscount.value + costDelivery.value - totalPoint.value
  })

  const agreePolicyCheckbox = ref(false)

  onBeforeMount(async () => {
    if (router.params.id) {
      try {
        const productQuantity = router.query?.quantity ?? 1
        const data = await orderApi.getOrderTicket(+router.params.id, Number(productQuantity))
        productDetail.value = data.data
        nextTick(async () => {
          const listCouponsData = await orderApi.getCouponProduct(Number(productDetail.value?.productResponse.productKey))
          const resultFeeDelivery = await memberApi.getSellerCompanyShipment([data.data?.productResponse?.sellerDeliveryFeeKey])
          const deliveryFee = resultFeeDelivery.data.deliveryShipment

          const isFreeDelivery = deliveryFee?.deliveryFeeType === SellerCompanyShipmentDeliveryStatus.free

          // const listFeeDelivery = listDeliveryFeeData.map((item) => item.data.deliveryShipment.defaultDeliveryFee ?? 0)

          const maxFeeDelivery = deliveryFee.defaultDeliveryFee ?? 0
          costDelivery.value = isFreeDelivery ? 0 : maxFeeDelivery
          cartProducts.value = {
            product: {
              id: data.data.productResponse.productKey,
              productName: data.data.productResponse.productName,
              productImage: getImageProduct(data.data.productResponse.attachfilePathName, data.data.productResponse.attachfileName),
              pricePromotion: data.data.productResponse.productPrice,
              quantity: quantityProduct.value,
              quantityClone: quantityProduct.value,
              nameOption: '',
              state: data.data.productResponse.saleStatus,
              immediatelyDiscountResponse: data?.data.immediatelyDiscountResponse
            },
            quantity: quantityProduct.value,
            listCoupons: listCouponsData.data
          } as OrderCartProductModel
        })

        if (data.data?.immediatelyDiscountResponse?.amount) {
          instantDiscount.value = data.data.productResponse?.immediatelyDiscountResponse?.amount ?? 0
        }
      } catch (error) {}
    }
  })
  watch(multiSendPeople, (newMultiSendPeople) => {
    if (newMultiSendPeople) {
      selectDataCountPeople.value = {
        ...orderProductListDataCountPeople[0]
      }
    }
  })

  const showModalInstantDiscountDetail = () => {
    openModal?.({
      component: OrderInstantDiscountDetailsModal,
      props: {
        total: productDetail.value?.immediatelyDiscountResponse?.amount ?? 0,
        items: productDetail.value?.immediatelyDiscountResponse
          ? [
              {
                discountName: productDetail.value?.immediatelyDiscountResponse?.promotionName,
                discount: productDetail.value?.immediatelyDiscountResponse?.amount
              }
            ]
          : []
      },
      events: {
        accept: () => {
          closeModalByPop?.()
        }
      }
    })
  }

  const handleClickInfoMe = (index: number) => {
    infoOutGoingList.value[index] = {
      name: account.value?.memberName ?? '',
      phone: account?.value?.cellphoneNumber ?? ''
    }
  }

  const handleShowContact = (index: number) => {
    openContactDevice()
      .then((data) => {
        infoOutGoingList.value[index] = {
          name: data?.[0].name?.[0],
          phone: data?.[0].tel?.[0].split(' ').join('')
        }
      })
      .catch(() => {})
  }

  const showPopupRefuseSaveMoney = () => {
    openModalNotification({
      content: 'e쿠폰 상품에는 적립금 사용이 불가 합니다.'
    })
  }

  const handleSetInfo = (index: number, name: string, value: string) => {
    infoOutGoingList.value[index] = {
      ...infoOutGoingList.value[index],
      [name]: value
    }
  }

  watch(
    selectDataCountPeople,
    (newSelect) => {
      if (Number(router.query?.quantity) > 1) {
        if (quantityProduct.value) {
          if (+newSelect.value > getQuantity(Number(router.query.quantity))) {
            quantityProduct.value = +newSelect.value
          } else {
            quantityProduct.value = getQuantity(Number(router.query.quantity))
          }
        }
        infoOutGoingList.value = Array.from({ length: +newSelect.value }).fill({
          name: '',
          phone: ''
        }) as OrderInfoPeopleSendProductModel[]
      }
    },
    { immediate: true }
  )

  const handleSave = () => {
    if (!productDetail.value) return

    // if(!)

    const isEmpty = infoOutGoingList.value.some((item) => !item.name.trim() || !item.phone.trim())
    if (isEmpty) {
      openModalNotification?.({
        content: '배송정보를 입력해주세요.',
        onAccept: closeModalByPop
      })
      return
    }

    if (!massageOutGoing.value.message.trim() || !massageOutGoing.value.name?.trim()) {
      openModalNotification?.({
        content: '발신자 정보는 비워둘 수 없습니다.',
        onAccept: closeModalByPop
      })
      return
    }

    if (Number(router.query.quantity) !== 1) {
      const countOutGoing = infoOutGoingList.value.filter((item) => item.phone.trim()).length
      if (countOutGoing < getNumberMoney(quantityProduct.value)) {
        openModalNotification?.({
          content: '주문상품수량만큼 받는분이 선택이 되어야 합니다. 받는분을 확인해주세요.',
          onAccept: closeModalByPop
        })
        return
      }
    }

    if (Number(welPointInput.value ?? 0) < totalPriceBeforeUseWelfarePoint.value && !validateBank()) {
      return
    }

    // fake data to post success
    const data: OrderTicketProductFormModel = {
      productClassification: productDetail.value.productResponse.productClassification,
      orderChannel: ORDER_CHANNEL,
      productQuantity: quantityProduct.value,
      orderPaymentRequest: {
        orderAmount: totalPriceBeforeUseWelfarePoint.value,
        orderDeliveryAmount: costDelivery.value,
        deliveryDiscountAmount: 0,
        deliveryPaymentAmount: costDelivery.value,
        totalProductAmount: totalPriceBeforeDiscount.value,
        immediatelyDiscountAmount: instantDiscount.value,
        couponDiscountAmount: couponDiscount.value,
        lastOrderAmount: totalPriceBeforeUseWelfarePoint.value,
        lastPaymentAmount: totalPriceBeforeUseWelfarePoint.value,
        welfarePointPaymentAmount: welPointInput.value ?? 0,
        pgPaymentAmount: totalPricePayment.value,
        etcPaymentAmount: 0,
        productAmount: productDetail.value.productResponse?.productPrice ?? 0,
        rewardPaymentAmount: 0,
        installment: 0
      },
      ticketOrderProductRequests: [
        {
          productKey: productDetail.value?.productResponse.productKey,
          optionKey: null,
          orderQuantity: quantityProduct.value,
          memberCouponKey: null,
          ticketReceiverRequests: infoOutGoingList.value.map((item) => {
            return {
              receiverName: item.name,
              receiverPhoneNumber: item.phone,
              ticketQuantity: 1
            }
          })
        }
      ],
      senderMessage: massageOutGoing.value.message,
      ordererName: massageOutGoing.value?.name ?? ''
    }

    openModal?.({
      component: OrderMakePaymentModal,
      props: {
        total: totalPricePayment,
        agreePaymentCheckbox: agreePolicyCheckbox,
        classGroup: 'wf-open-from-bottom',
        isShowNote: true
      },
      events: {
        'update:agreePaymentCheckbox': (value: boolean) => {
          agreePolicyCheckbox.value = value
        },
        cancel: closeModalByPop,
        accept: () => {
          setLoading?.(true)
          orderApi
            .postTicketOrder(data)
            .then((data) => {
              const params: RequestPayParams = {
                dataPayment: {
                  amount: data.data.orderPaymentResponse.pgPaymentAmount,
                  merchantUid: data.data.orderKey.toString(),
                  productName: productInfo.value.productName,
                  m_redirect_url: buildUriFromBaseUri(`${ORDER_E_PRODUCT_ROUTER}/1?quantity=${quantityProduct.value}`),
                  payMethod: currentBank.value as any
                },
                account: account.value as any
              }

              if (Number(welPointInput.value ?? 0) < totalPriceBeforeUseWelfarePoint.value) {
                storage.set(
                  FO_BANK_PAYMENT,
                  JSON.stringify({
                    paymentMethodUseAgain: paymentMethodUseAgain.value,
                    currentBank: currentBank.value
                  })
                )

                requestPay(params, (res) => {
                  if (res.imp_success) {
                    navigate.replace(`${ORDER_PRODUCT_COMPLETED_ROUTER}/${data.data.orderKey}?imp_uid=${res?.imp_uid}`)
                  } else {
                    openModalNotificationPayment({
                      content: res.error_msg
                    })
                  }
                })
              } else {
                navigate.replace(`${ORDER_PRODUCT_COMPLETED_ROUTER}/${data.data.orderKey}`)
              }
            })
            .finally(() => {
              setLoading?.(false)
            })
        }
      }
    })
  }

  const handleClickOther = (bank: PayMethod | undefined, callback: () => void) => {
    callback()
  }

  const productInfo = computed((): ProductModel => {
    return {
      id: productDetail.value?.productResponse.productKey,
      productName: productDetail.value?.productResponse?.productName ?? '',
      productImage: getImageProduct(
        productDetail.value?.productResponse?.attachfilePathName ?? '',
        productDetail.value?.productResponse?.attachfileName ?? ''
      ),
      pricePromotion: productDetail.value?.productResponse.productPrice,
      quantity: quantityProduct.value,
      quantityClone: quantityProduct.value,
      state: productDetail.value?.productResponse.saleStatus
    }
  })

  const showModalApplyCoupon = () => {
    openModal?.({
      component: OrderApplyCouponModal,
      props: {
        orderCarts: [
          {
            products: [cartProducts.value]
          }
        ],
        deliveryAddress: []
      },
      events: {
        onClose: closeModalByPop,
        onAccept: (data: { orderCarts: OrderCartGroupDeliveryAddressModel[] }) => {
          cartProducts.value = data?.orderCarts?.[0].products?.[0]
          closeModalByPop?.()
        }
      }
    })
  }

  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('imp_success')) {
      const paramValue = urlParams.get('imp_success')
      const errorMsgValue = urlParams.get('error_msg')
      // console.log("paramValue=>",paramValue);
      if (paramValue === 'false') {
        // console.log('fail success')
        openModalNotificationPayment({
          content: errorMsgValue ?? ''
        })
      } else {
        // console.log('payment success')
        const merchantUid = urlParams.get('merchant_uid')
        const imp_uid = urlParams.get('imp_uid')
        navigate.replace(`${ORDER_PRODUCT_COMPLETED_ROUTER}/${merchantUid}?imp_uid=${imp_uid}`)
      }
    }
  })

  const isBuyAble = computed(() => {
    return productInfo.value?.state === ProductDetailSaleStatus.onSale
  })

  return {
    productDetail,
    // welPointInput,
    // pointInput,
    // savePointInput,
    paymentMethodUseAgain,
    switchMethodPaymentRadio,
    currentBank,
    methodPaymentSelect,
    installmentMonthSelect,
    totalPriceBeforeDiscount,
    costDelivery,
    totalPriceDiscount,
    priceSavePoint,
    totalPricePayment,
    // welfarePointCheckBox,
    // pointCheckbox,
    // savePointCheckbox,
    agreePolicyCheckbox,
    dataBanks,
    optionsInstallmentMonthSelect,
    optionsPaymentMethod,
    instantDiscount,
    couponDiscount,
    showModalInstantDiscountDetail,
    infoOutGoingList,
    handleClickInfoMe,
    handleShowContact,
    massageOutGoing,
    showPopupRefuseSaveMoney,
    multiSendPeople,
    selectDataCountPeople,
    handleSave,
    handleClickOther,
    handleSetInfo,
    showModalApplyCoupon,
    productInfo,
    quantityProduct,
    welPointInput,
    pointInput,
    savePointInput,
    welfarePointCheckBox,
    pointCheckbox,
    savePointCheckbox,
    dataVoucher,
    handleUpdateWelPointInput,
    isBuyAble,
    totalPoint
    // isDisableWelfarePoint
  }
}
