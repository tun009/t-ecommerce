import {
  FO_BANK_PAYMENT,
  ORDER_PRODUCT_DELIVERY_COMPLETED_ROUTER,
  OrderChannel,
  formatNumberDot,
  getImageProduct,
  getNumberMoney,
  listSplitContact,
  storage
} from '@/commons'
import { RequestPayParams, usePayment } from '@/composables/payment/usePayment'
import { PayMethod } from '@/models/common'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import { SellerCompanyShipmentDeliveryStatus, sellerCompanyShipmentDeliveryStatusData } from '@/models/views/member/SellerCompanyShipment'
import {
  OrderCartGroupDeliveryAddressModel,
  OrderCartProductModel,
  OrderPostDeliveryModel,
  OrderProductModel
} from '@/models/views/order/OrderProductPageModel'
import { memberApi } from '@/services/api/member/memberApi'
import { orderApi } from '@/services/api/order/OrderApi'
import { orderModalApi } from '@/services/api/order/OrderModalApi'
import { useAccountStore } from '@/stores/account'
import OrderAddMultiAddressDeliveryModal from '@/views/order/modal/OrderAddMultiAddressDeliveryModal.vue'
import OrderApplyCouponModal from '@/views/order/modal/OrderApplyCouponModal.vue'
import OrderModalInfoSaveMoney from '@/views/order/modal/OrderInfoSaveMoneyModal.vue'
import OrderInstantDiscountDetailsModal from '@/views/order/modal/OrderInstantDiscountDetailsModal.vue'
import OrderMakePaymentModal from '@/views/order/modal/OrderMakePaymentModal.vue'
import OrderSumDiscountInformationModal from '@/views/order/modal/OrderSumDiscountInformationModal.vue'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from '../common/useLoading'
import { useModal } from '../common/useModal'
import { useModalNotification } from '../widgets/modal/useModalNotification'
import { useModalConfirm } from './../widgets/modal/useModalConfirm'
import { useOrderBank } from './useOrderBank'
import { useOrderCashMoney } from './useOrderCashMoney'
import { useOrderChooseDeliveryAddressProduct } from './useOrderChooseDeliveryAddressProduct'
import { useOrderVoucher } from './useOrderVoucher'

export const useProductOrderPage = () => {
  const cartProductDelivery = ref<OrderCartGroupDeliveryAddressModel[]>([])
  const orderProductOriginalList = ref<OrderProductModel>()
  const { requestPay } = usePayment()

  const accountStore = useAccountStore()

  const { account } = storeToRefs(accountStore)
  const { setLoading } = useLoading()

  const { showModal: openModal, closeModalByPop } = useModal()
  const { openModal: openModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification } = useModalNotification()
  const { t } = useI18n()

  const router = useRoute()
  const navigate = useRouter()

  const disabledPoint = ref(false)

  const listDeliveryAddress = ref<DeliveryAddressModel[]>([])

  onMounted(() => {
    orderModalApi
      .getListAddressData()
      .then((data) => {
        listDeliveryAddress.value = data.data
      })
      .catch(() => {})
    getOrderProductList()
  })

  const getOrderProductList = async () => {
    const { cartKey, cartProductKeys, productKey, productOptionKey, productQuantity } = router.query as any
    setLoading?.(true)
    try {
      const data = await orderApi.getOrderInfo({
        cartKey,
        cartProductKeys,
        productKey,
        productOptionKey,
        productQuantity
      })

      orderProductOriginalList.value = data.data
      instantDiscount.value = data.data.orderDeliveryItemDetailResponses.reduce((currentCount: number, item) => {
        return currentCount + item.productResponse.immediatelyDiscountResponse.amount
      }, 0)

      const listApiCouponsProduct = data.data.orderDeliveryItemDetailResponses.map((item) =>
        orderApi.getCouponProduct(item.productResponse.productKey)
      )
      const listCouponsData = await Promise.all(listApiCouponsProduct)
      orderProductOriginalList.value = {
        ...data.data,
        orderDeliveryItemDetailResponses: data.data.orderDeliveryItemDetailResponses.map((item, index) => {
          return {
            ...item,
            listCoupons: listCouponsData?.[index].data
          }
        })
      }
      const listApiDeliveryFee = data.data.orderDeliveryItemDetailResponses.map((item) =>
        // orderApi.getCouponProduct(item.productResponse.productKey)
        memberApi.getSellerCompanyShipment([item.productResponse.sellerDeliveryFeeKey])
      )
      const listDeliveryFeeData = await Promise.all(listApiDeliveryFee)
      const isFreeDelivery = listDeliveryFeeData.some(
        (item) => item.data.deliveryShipment.deliveryFeeType === SellerCompanyShipmentDeliveryStatus.free
      )
      const listFeeDelivery = listDeliveryFeeData.map((item) => item.data.deliveryShipment.defaultDeliveryFee ?? 0)
      const maxFeeDelivery = listFeeDelivery.length ? Math.max(...listFeeDelivery) : 0
      costDelivery.value = isFreeDelivery ? 0 : maxFeeDelivery
      const listProduct = data.data.orderDeliveryItemDetailResponses?.reduce((currentItem, item, index) => {
        const dataDelivery = listDeliveryFeeData?.[index]?.data?.deliveryShipment
        const typeDelivery = dataDelivery?.deliveryFeeType

        const data = item.productResponse.productOptionResponses?.length
          ? (item.productResponse.productOptionResponses?.map((_item, _index) => {
              return {
                quantity: item.productQuantity,
                product: {
                  id: item.productResponse.productKey,
                  productName: item.productResponse.productName,
                  productImage: getImageProduct(item.productResponse.attachfilePathName, item.productResponse.attachfileName),
                  pricePromotion: _item.optionPrice ?? item.productResponse.productPrice,
                  quantity: _item.productQuantity,
                  quantityClone: _item.productQuantity,
                  nameOption: `${getOptionString(_item?.optionLargeName)} ${getOptionString(_item?.optionMediumName)} ${
                    _item?.optionSmallName ?? ''
                  }`,
                  state: item.productResponse?.saleStatus,
                  productOptionResponses: [_item],
                  immediatelyDiscountResponse: item.productResponse?.immediatelyDiscountResponse
                },
                listCoupons: listCouponsData?.[index].data,
                messageDelivery:
                  typeDelivery === SellerCompanyShipmentDeliveryStatus.free
                    ? sellerCompanyShipmentDeliveryStatusData?.[typeDelivery] ?? ''
                    : `${sellerCompanyShipmentDeliveryStatusData?.[typeDelivery] ?? ''} ${formatNumberDot(dataDelivery?.defaultDeliveryFee)}원`
              }
            }) as any)
          : [
              {
                quantity: item.productQuantity,
                product: {
                  id: item.productResponse.productKey,
                  productName: item.productResponse.productName,
                  productImage: getImageProduct(item.productResponse.attachfilePathName, item.productResponse.attachfileName),
                  pricePromotion: item,
                  quantity: item.productQuantity,
                  quantityClone: item.productQuantity,
                  nameOption: ``,
                  state: item.productResponse?.saleStatus,
                  productOptionResponses: [],
                  immediatelyDiscountResponse: item.productResponse?.immediatelyDiscountResponse
                },
                listCoupons: listCouponsData?.[index].data,
                messageDelivery:
                  typeDelivery === SellerCompanyShipmentDeliveryStatus.free
                    ? sellerCompanyShipmentDeliveryStatusData?.[typeDelivery] ?? ''
                    : `${sellerCompanyShipmentDeliveryStatusData?.[typeDelivery] ?? ''} ${formatNumberDot(dataDelivery?.defaultDeliveryFee)}원`
              }
            ]
        return [...currentItem, ...data]
      }, [] as OrderCartProductModel[])

      cartProductDelivery.value = [
        {
          products: listProduct,
          deliveryAddress: getDataAddress() ?? {}
        }
      ]
    } catch (error) {
      //handle error
    } finally {
      setLoading?.(false)
    }
  }

  const getOptionString = (option?: string) => {
    return option ? option + ',' : ''
  }

  // perform address 배송정보 part
  const {
    currentAddress,
    valueMessageAddress,
    messageAdress,
    stateAddress,
    inputNameCustomer,
    multiAddressDeliveryCheckbox,
    openListAddress,
    handleValidateState,
    defaultAddressDelivery,
    newAddress,
    getDataAddress
  } = useOrderChooseDeliveryAddressProduct(listDeliveryAddress, false)

  // perform bank 결제수단 part
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

  // perform discount 할인정보 part
  const instantDiscount = ref(0)
  const lumpSumDiscount = ref(0)
  const couponDiscount = ref(0)

  const totalPriceDiscount = computed(() => {
    return getNumberMoney(instantDiscount.value) + getNumberMoney(lumpSumDiscount.value) + getNumberMoney(couponDiscount.value)
  })

  const totalPriceBeforeUseWelfarePoint = computed(() => {
    return totalPriceBeforeDiscount.value - couponDiscount.value
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

  const infoInComing = ref({
    name: account.value?.memberName ?? '',
    prefix: listSplitContact(account.value?.cellphoneNumber ?? '')?.[0],
    phone: listSplitContact(account.value?.cellphoneNumber ?? '')
      .splice(-2)
      .join('-'),
    emailStart: '',
    emailEnd: ''
  })

  const isUseDataCurrentMember = ref(false)

  watch(isUseDataCurrentMember, (isUse) => {
    if (isUse) {
      currentAddress.value = {
        ...currentAddress.value,
        deliveryAddressName: account.value?.memberName,
        address: account?.value?.address,
        deliveryCellphoneNumber: account.value?.cellphoneNumber
      }
    }
  })

  const costDelivery = ref(0)

  const productCustomerList = computed((): ProductModel[] => {
    return (
      orderProductOriginalList.value?.orderDeliveryItemDetailResponses?.reduce((currentItem, item, index) => {
        const data = item.productResponse.productOptionResponses?.length
          ? (item.productResponse.productOptionResponses?.map((_item, _index) => {
              return {
                id: item.productResponse.productKey,
                productName: item.productResponse.productName,
                productImage: getImageProduct(item.productResponse.attachfilePathName, item.productResponse.attachfileName),
                pricePromotion: _item.optionPrice ?? item.productResponse.productPrice,
                quantity: _item.productQuantity ?? 0,
                quantityClone: _item.productQuantity ?? 0,
                nameOption: `${getOptionString(_item?.optionLargeName)} ${getOptionString(_item?.optionMediumName)} ${_item?.optionSmallName ?? ''}`,
                state: item.productResponse.saleStatus,
                productOptionResponses: [_item],
                immediatelyDiscountResponse: item.productResponse?.immediatelyDiscountResponse
              }
            }) as any)
          : [
              {
                id: item.productResponse.productKey,
                productName: item.productResponse.productName,
                productImage: getImageProduct(item.productResponse.attachfilePathName, item.productResponse.attachfileName),
                pricePromotion: item.productResponse.productPrice,
                quantity: item.productQuantity ?? 0,
                quantityClone: item.productQuantity ?? 0,
                nameOption: ``,
                state: item.productResponse.saleStatus,
                productOptionResponses: [],
                immediatelyDiscountResponse: item.productResponse?.immediatelyDiscountResponse
              }
            ]

        return [...currentItem, ...data]
      }, [] as ProductModel[]) ?? []
    )
  })

  const totalPriceBeforeDiscount = computed(() => {
    const amount = productCustomerList.value.reduce(
      (currentTotal, item) =>
        currentTotal + item.quantity * (getNumberMoney(item?.pricePromotion) - Number(item?.immediatelyDiscountResponse?.amount ?? 0)),
      0
    )
    return amount > 0 ? amount : 0
  })

  // area Apply for cash receipt
  const isShowCashReceipt = computed(() => {
    return welfarePointCheckBox.value
  })

  const { isUseApplyCash, personalApplyCash, incomePersonal, incomeCompany, infoPersonal, infoCompany, validateCashMoney } =
    useOrderCashMoney(isShowCashReceipt)

  const priceSavePoint = ref(0)
  const totalPricePayment = computed(() => {
    return totalPriceBeforeUseWelfarePoint.value + costDelivery.value - Number(totalPoint.value ?? 0)
  })

  const totalPriceProduct = computed(() => {
    return productCustomerList.value.reduce((currentTotal, item) => currentTotal + item.quantity * getNumberMoney(item?.pricePromotion), 0)
  })

  const agreePolicyCheckbox = ref(false)

  const handleCheckPaymentFirstTime = (value: boolean) => {
    if (value) {
      installmentMonthSelect.value = optionsInstallmentMonthSelect.value?.[0]
      switchMethodPaymentRadio.value = false
      currentBank.value = dataBanks.value?.[0].value ?? undefined
      welfarePointCheckBox.value = false
      pointCheckbox.value = false
      savePointCheckbox.value = false
      welPointInput.value = 0
      pointInput.value = 0
      savePointInput.value = 0
    }
  }

  watch(disabledPoint, (newDisabled) => {
    handleCheckPaymentFirstTime(newDisabled)
  })

  const showModalInstantDiscountDetail = () => {
    const items = orderProductOriginalList.value?.orderDeliveryItemDetailResponses.map((item) => ({
      discountName: item.productResponse.immediatelyDiscountResponse.promotionName,
      discount: item.productResponse.immediatelyDiscountResponse.amount
    }))
    openModal?.({
      component: OrderInstantDiscountDetailsModal,
      props: {
        total: items?.reduce((currentTotal, item) => {
          return currentTotal + item.discount
        }, 0),
        items
      },
      events: {
        accept: () => {
          closeModalByPop?.()
        }
      }
    })
  }

  const checkClearAddressDelivery = (value: boolean) => {
    if (!value) {
      openModalConfirm({
        content: t('message.ChooseStateAddressDelivery'),
        onConfirm: () => {
          multiAddressDeliveryCheckbox.value = value
          closeModalByPop?.()
        }
      })
      return
    }

    multiAddressDeliveryCheckbox.value = value
  }

  const handleClickOther = (bank: PayMethod | undefined, callback: () => void) => {
    if (disabledPoint.value && currentBank.value === PayMethod.Card && bank !== PayMethod.Card) {
      openModalConfirm({
        content: t('message.changeBankPayment'),
        onConfirm: () => {
          disabledPoint.value = false
          callback()
          closeModalByPop?.()
        }
      })
    } else {
      callback()
    }
  }

  const showModalInfoSaveMoney = () => {
    openModal?.({
      component: OrderModalInfoSaveMoney,
      events: {
        close: () => {
          closeModalByPop?.()
        }
      }
    })
  }

  const showModalChooseMultiAddress = () => {
    openModal?.({
      component: OrderAddMultiAddressDeliveryModal,
      props: {
        listDeliveryAddress: listDeliveryAddress.value,
        cartProductDelivery: cartProductDelivery.value,
        products: orderProductOriginalList.value?.orderDeliveryItemDetailResponses.map((item) => {
          const option = item.productResponse.productOptionResponses?.[0]

          return {
            id: item.productResponse.productKey,
            productName: item.productResponse.productName,
            productImage: getImageProduct(item.productResponse.attachfilePathName, item.productResponse.attachfileName),
            pricePromotion: item.productResponse.productPrice,
            quantity: item.productQuantity ?? 0,
            quantityClone: item.productQuantity ?? 0,
            nameOption: `${getOptionString(option?.optionSmallName)} ${getOptionString(option?.optionMediumName)} ${option?.optionLargeName ?? ''}`,
            state: item.productResponse.lastProductStatsCode,
            listCoupons: item.listCoupons,
            productOptionResponses: item.productResponse.productOptionResponses
          }
        })
      },
      events: {
        close: () => {
          closeModalByPop?.()
        },
        save: (data: OrderCartGroupDeliveryAddressModel[]) => {
          cartProductDelivery.value = data
          closeModalByPop?.()
        }
      }
    })
  }

  const showModalApplyCoupon = () => {
    if (!multiAddressDeliveryCheckbox.value) {
      if (!handleValidateState()) {
        return
      }
    } else if (!cartProductDelivery.value.length) {
      openModalNotification?.({
        content: t('message.enterYourAddress')
      })
      return
    }
    // for cases multi and single address delivery
    // props: {
    //   orderCarts: multiAddressDeliveryCheckbox?.value
    //     ? cartProductDelivery.value
    //     : cartProductDelivery.value.length
    //       ? cartProductDelivery.value
    //       : [
    //           {
    //             deliveryAddress: getDataAddress(),
    //             products: productCustomerList.value.map((item) => ({ product: { ...item } }))
    //           }
    //         ],
    //   deliveryAddress: listDeliveryAddress
    // },

    openModal?.({
      component: OrderApplyCouponModal,
      props: {
        orderCarts: [
          {
            ...cartProductDelivery.value?.[0],
            deliveryAddress: getDataAddress()
          }
        ],
        deliveryAddress: listDeliveryAddress
      },
      events: {
        onClose: closeModalByPop,
        onAccept: (data: any) => {
          couponDiscount.value = data?.coupon?.total
          cartProductDelivery.value = data?.orderCarts
        }
      }
    })
  }

  watch(multiAddressDeliveryCheckbox, (newChecked) => {
    if (!newChecked) {
      cartProductDelivery.value = []
      couponDiscount.value = 0
    }
  })

  const handleSave = () => {
    if (!multiAddressDeliveryCheckbox.value) {
      if (!handleValidateState()) {
        return
      }
    } else if (!cartProductDelivery.value.length) {
      openModalNotification?.({
        content: t('message.enterYourAddress')
      })
      return
    }

    if (Number(welPointInput.value ?? 0) < totalPriceBeforeUseWelfarePoint.value && !validateBank()) {
      return
    }

    if (!validateCashMoney()) {
      return
    }

    const finalDataSubmit = cartProductDelivery.value
      .map((item) => {
        const listProduct = item.products.filter((item) => item.quantity)
        return {
          ...item,
          products: listProduct
        }
      })
      .filter((item) => item.products?.length)

    const productAmount =
      orderProductOriginalList.value?.orderDeliveryItemDetailResponses.reduce((currentQuantity, item) => {
        return currentQuantity + item.productQuantity
      }, 0) ?? 0

    const data: OrderPostDeliveryModel = {
      orderDeliveryRequests: finalDataSubmit.map((item) => {
        return {
          orderDeliveryProductRequests: item.products.flatMap((product) => {
            const res: any = []
            product.product?.productOptionResponses?.map((option) => {
              res.push({
                productKey: product.product?.id,
                optionKey: option.optionKey,
                memberCouponKey: product?.coupon ?? null,
                orderQuantity: product.product?.quantity ?? 0
              })
            })
            return res
          }),
          deliveryAddressCode: item.deliveryAddress.deliveryAddressCode,
          receiverName: item.deliveryAddress.deliveryAddressName,
          deliveryZipCode: item.deliveryAddress.address?.zipCode,
          deliveryStreetAddress: item.deliveryAddress.address?.basicJibun,
          deliveryLotAddress: item.deliveryAddress.address?.basicRoad,
          deliveryDetailAddress: item.deliveryAddress.address?.detail,
          deliveryCellPhone: item.deliveryAddress?.deliveryCellphoneNumber,
          deliveryTelephone: item.deliveryAddress?.deliveryTelNumber,
          deliveryRequestType: item?.messageTypeAddressDelivery,
          deliveryRequestContent: item?.messageAddressDelivery ?? ''
        }
      }),
      orderPaymentRequest: {
        orderAmount: totalPriceBeforeUseWelfarePoint.value,
        orderDeliveryAmount: costDelivery.value,
        deliveryDiscountAmount: 0,
        deliveryPaymentAmount: 0,
        totalProductAmount: totalPriceProduct.value,
        immediatelyDiscountAmount: instantDiscount.value,
        couponDiscountAmount: couponDiscount.value,
        lastOrderAmount: totalPriceBeforeUseWelfarePoint.value,
        lastPaymentAmount: totalPriceBeforeUseWelfarePoint.value,
        welfarePointPaymentAmount: Number(totalPoint.value ?? 0),
        pgPaymentAmount: totalPricePayment.value,
        etcPaymentAmount: 0,
        productAmount: productAmount,
        rewardPaymentAmount: 0
      },
      productQuantity: productAmount,
      cartKey: orderProductOriginalList?.value?.cartKey,
      cartProductKeys: orderProductOriginalList.value?.cartProductKeys ?? [],
      orderChannel: OrderChannel.WEB_MOBILE,
      pgRatio: pointInput.value ?? 0,
      welfarePointsRatio: welPointInput.value ?? 0,
      reawrdPointRatio: savePointInput.value ?? 0,
      singePayment: false,
      multipleDelivery: cartProductDelivery?.value.length > 1
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
          const productName = orderProductOriginalList.value?.orderDeliveryItemDetailResponses.map((item) => item.productResponse.productName)[0]
          closeModalByPop?.()
          orderApi.postDeliveryOrder(data).then((result) => {
            const params: RequestPayParams = {
              dataPayment: {
                amount: result.data.orderPaymentResponse.pgPaymentAmount,
                merchantUid: result.data.orderKey.toString(),
                productName: productName ?? '',
                payMethod: currentBank.value as any
              },
              account: account.value as any
            }
            let cashReceiptIssueTargetType = `?cashReceiptIssueTargetType=${personalApplyCash.value ? 'person' : 'company'}`
            cashReceiptIssueTargetType += `&cashReceiptRequestNumber=${
              personalApplyCash.value
                ? incomePersonal.value.value
                  ? `${infoPersonal.value.prefix}-${infoPersonal.value.phone}`
                  : infoPersonal.value.numberBankPerson.join('')
                : incomeCompany.value.value
                  ? infoCompany.value.numberCompany.join('')
                  : infoCompany.value.numberBank.join('')
            }`

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
                  navigate.replace(
                    `${ORDER_PRODUCT_DELIVERY_COMPLETED_ROUTER}/${result.data.orderKey.toString()}${
                      isShowCashReceipt.value && isUseApplyCash.value
                        ? cashReceiptIssueTargetType + `&impUid=${res?.imp_uid}`
                        : `?impUid=${res?.imp_uid}`
                    }`
                  )
                } else {
                  openModalNotification({
                    content: res.error_msg
                  })
                }
              })
            } else {
              navigate.replace(
                `${ORDER_PRODUCT_DELIVERY_COMPLETED_ROUTER}/${result.data.orderKey.toString()}${
                  isShowCashReceipt.value && isUseApplyCash.value ? cashReceiptIssueTargetType : ''
                }`
              )
            }
          })
        }
      }
    })
  }

  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('imp_success')) {
      const paramValue = urlParams.get('imp_success')
      const errorMsgValue = urlParams.get('error_msg')
      if (paramValue === 'false') {
        // console.log('fail success')
        openModalNotification({
          content: errorMsgValue ?? ''
        })
      } else {
        // console.log('payment success')
        const merchantUid = urlParams.get('merchant_uid')
        const imp_uid = urlParams.get('imp_uid')
        navigate.replace(`${ORDER_PRODUCT_DELIVERY_COMPLETED_ROUTER}/${merchantUid}?imp_uid=${imp_uid}`)
      }
    }
  })

  const showPopupPackageDiscount = () => {
    openModal?.({
      component: OrderSumDiscountInformationModal,
      events: {
        accept: closeModalByPop
      }
    })
  }

  return {
    productCustomerList,
    multiAddressDeliveryCheckbox,
    valueMessageAddress,
    messageAdress,
    welPointInput,
    pointInput,
    savePointInput,
    paymentMethodUseAgain,
    switchMethodPaymentRadio,
    currentBank,
    methodPaymentSelect,
    installmentMonthSelect,
    totalPriceBeforeDiscount: totalPriceProduct,
    costDelivery,
    totalPriceDiscount,
    priceSavePoint,
    totalPricePayment,
    handleCheckPaymentFirstTime,
    disabledPoint,
    stateAddress,
    inputNameCustomer,
    welfarePointCheckBox,
    pointCheckbox,
    savePointCheckbox,
    agreePolicyCheckbox,
    dataBanks,
    optionsInstallmentMonthSelect,
    optionsPaymentMethod,
    instantDiscount,
    lumpSumDiscount,
    couponDiscount,
    currentAddress,
    showModalInstantDiscountDetail,
    listDeliveryAddress,
    checkClearAddressDelivery,
    isUseApplyCash,
    personalApplyCash,
    incomePersonal,
    infoPersonal,
    infoCompany,
    incomeCompany,
    isShowCashReceipt,
    handleClickOther,
    showModalInfoSaveMoney,
    showModalChooseMultiAddress,
    showModalApplyCoupon,
    infoInComing,
    defaultAddressDelivery,
    openListAddress,
    cartProductDelivery,
    handleSave,
    isUseDataCurrentMember,
    newAddress,
    showPopupPackageDiscount,
    dataVoucher,
    handleUpdateWelPointInput,
    totalPoint
  }
}
