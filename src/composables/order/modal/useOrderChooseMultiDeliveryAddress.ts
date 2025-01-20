import { useHandleKeyPress } from '@/composables/common/useHandleKeyPress'
import { useModalConfirm } from '@/composables/widgets/modal/useModalConfirm'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { YesNoEnum } from '@/models/common'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { ProductModel } from '@/models/uikits/WelfareUnitCardTypes'
import { DeliveryAddressModel } from '@/models/views/common/DeliveryAddressModel'
import {
  OrderCartGroupDeliveryAddressModel,
  orderProductInitialAddressDelivery,
  orderProductListDataCountAddressDelivery
} from '@/models/views/order/OrderProductPageModel'
import { useCartStore } from '@/stores/cart'
import { computed, onMounted, ref } from 'vue'

export const useOrderChooseMultiDeliveryAddress = (
  listDeliveryAddress: DeliveryAddressModel[],
  cartProductDelivery: OrderCartGroupDeliveryAddressModel[] = [],
  products: ProductModel[] = []
) => {
  const cartStore = useCartStore()
  const cartProducts = ref(products)
  const { openModal, closeModalByPop } = useModalNotification()
  const { openModal: openModalConfirm } = useModalConfirm()
  const refAddressDeliveryList = ref()

  const addressDefault = computed(() => {
    return listDeliveryAddress.find((item) => item.deliveryAddressBaseYn === YesNoEnum.Y)
  })

  const countAddressDelivery = ref(orderProductListDataCountAddressDelivery[0])

  useHandleKeyPress(() => {})

  const listAddressLoad = () => {
    // limit only load 3 address for each load more to ignore lag UI issue.
    const pageSizeLoadAddressDelivery = 3
    const finalSize =
      +countAddressDelivery.value.value - listCartDelivery.value.length >= pageSizeLoadAddressDelivery
        ? pageSizeLoadAddressDelivery
        : +countAddressDelivery.value.value - listCartDelivery.value.length
    listCartDelivery.value = [
      ...listCartDelivery.value,
      ...Array.from({ length: finalSize }).map(() => {
        return {
          deliveryAddress: addressDefault.value ?? { ...orderProductInitialAddressDelivery },
          typeDelivery: addressDefault?.value ? 'default' : 'new',
          products: cartProducts.value.map((item) => ({
            product: item,
            quantity: ''
          }))
        } as OrderCartGroupDeliveryAddressModel
      })
    ]
    console.log({
      l: listCartDelivery.value
    })
  }

  const listCartDelivery = ref<OrderCartGroupDeliveryAddressModel[]>(cartProductDelivery)

  onMounted(() => {
    if (!cartProductDelivery.length) {
      listAddressLoad()
    } else {
      // required select minimum 2 delivery address.
      const minChooseAddressDelivery = 2
      const value = listCartDelivery.value.length >= minChooseAddressDelivery ? listCartDelivery.value.length : minChooseAddressDelivery
      countAddressDelivery.value =
        orderProductListDataCountAddressDelivery.find((item) => item.value === value) ?? orderProductListDataCountAddressDelivery[0]
    }
  })

  const handleChooseCountAddress = (value: WelfareSelectDataModel) => {
    if (value.value === 'max') {
      openModal?.({
        content: '100개 초과의 배송지로 대량주문 시 고객센터로 [(0000-0000(유료)]로 연락주시면 친절하게 주문을 도와드리겠습니다.',
        onAccept: () => {
          closeModalByPop?.()
        }
      })
      return
    }

    openModalConfirm?.({
      content: '지금까지 작성하셨던 주문/배송지가 초기화 됩니다. 진행하시겠습니까?',
      onConfirm: () => {
        countAddressDelivery.value = value
        listCartDelivery.value = []
        listAddressLoad()
        closeModalByPop?.()
      },
      onCancel: () => {
        closeModalByPop?.()
      }
    })
  }

  const handleUpdateQuantity = (index: number, id?: number, quantity = 0, target?: HTMLInputElement) => {
    const _index = listCartDelivery.value[index].products.findIndex((item) => item.product.id === id)
    listCartDelivery.value[index].products[_index] = {
      product: listCartDelivery.value[index].products[_index].product,
      quantity
    }

    const totalQuantity = listCartDelivery.value.reduce((total, product) => {
      return (
        total +
        product.products
          .filter((item) => item.product.id === id)
          .reduce((currentTotal, data) => {
            return currentTotal + +data.quantity
          }, 0)
      )
    }, 0)
    if (totalQuantity > listCartDelivery.value[index].products[_index].product.quantity) {
      listCartDelivery.value[index].products[_index] = {
        product: listCartDelivery.value[index].products[_index].product,
        quantity: ''
      }
      target?.blur?.()
      openModal({
        content: '잔여 수량을 확인 해 주세요.',
        onAccept: () => {
          closeModalByPop?.()
        }
      })
    }

    const totalQuantityFinal = listCartDelivery.value.reduce((total, product) => {
      return (
        total +
        product.products
          .filter((item) => item.product.id === id)
          .reduce((currentTotal, data) => {
            return currentTotal + +data.quantity
          }, 0)
      )
    }, 0)

    listCartDelivery.value = listCartDelivery.value.map((item) => {
      return {
        deliveryAddress: item.deliveryAddress,
        products: item.products.map((_item) => {
          return {
            product: {
              ..._item.product,
              quantityClone: _item.product.id === id ? _item.product.quantity - totalQuantityFinal : _item.product.quantityClone
            },
            quantity: _item.quantity
          }
        })
      }
    })

    const indexOrigin = cartProducts.value.findIndex((item) => item.id === id)
    if (indexOrigin !== -1) {
      cartProducts.value[indexOrigin].quantityClone = listCartDelivery.value[index].products[_index].product.quantityClone
    }
  }

  const handleSave = (onSave: (data: OrderCartGroupDeliveryAddressModel[]) => void) => {
    if (refAddressDeliveryList.value && refAddressDeliveryList.value.length) {
      let isBreak = false
      for (let index = 0; index < refAddressDeliveryList.value.length; index++) {
        if (!refAddressDeliveryList.value[index].getValidate()) {
          openModal({
            content: `주소 ${index + 1}번에 전체 배송 정보를 입력해 주세요.`,
            onAccept: closeModalByPop
          })
          isBreak = true
          return
        } else {
          listCartDelivery.value[index].deliveryAddress = refAddressDeliveryList.value[index].currentAddress()
          listCartDelivery.value[index].typeDelivery = refAddressDeliveryList.value[index].stateAddress()
          listCartDelivery.value[index].messageTypeAddressDelivery = refAddressDeliveryList.value[index].messageAddressDelivery()?.valueMessageAddress
          listCartDelivery.value[index].messageAddressDelivery = refAddressDeliveryList.value[index].messageAddressDelivery()?.messageAdress
        }
      }
      if (isBreak) return
    }

    const totalQuantityChoose = listCartDelivery.value.reduce((total, product) => {
      return (
        total +
        product.products.reduce((currentTotal, data) => {
          return currentTotal + +data.quantity
        }, 0)
      )
    }, 0)

    const totalQuantity = cartProducts.value.reduce((currentTotal, data) => {
      return currentTotal + +data.quantity
    }, 0)

    if (totalQuantity > totalQuantityChoose) {
      openModal({
        content: '배송지 설정이 되지 않은 주문수량이 존재 합니다.',
        onAccept: () => {
          closeModalByPop?.()
        }
      })
      return
    }

    onSave(listCartDelivery.value)
  }

  return {
    countAddressDelivery,
    listAddressLoad,
    handleChooseCountAddress,
    listCartDelivery,
    handleUpdateQuantity,
    handleSave,
    refAddressDeliveryList
  }
}
