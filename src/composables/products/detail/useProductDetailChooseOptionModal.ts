import { YesNoEnum } from '@/models/common'
import {
  ProductDetailOptionDepth1,
  ProductDetailOptionDepth2,
  ProductDetailOptionDepth3,
  ProductDetailChooseOptionModalProps,
  ProductDetailChooseSelectData,
  ProductDetailOptionTypeEnum,
  ProductDetailSaleStatus,
  ProductDetailClassificationEnum,
  ProductDetailChooseOptionModalEmits
} from '@/models/views/products/ProductDetailReviewModel'
import { productDetailApi } from '@/services/api/products/detail/ProductDetailApi'
import { onMounted, ref, computed } from 'vue'
import { useModalNotification } from '../../widgets/modal/useModalNotification'
import { useProductDetailAddToCart } from './useProductDetailAddToCart'
import { useRouter } from 'vue-router'
import { useBuildLink } from '@/composables/common/useBuildLink'
import { ORDER_E_PRODUCT_ROUTER, ORDER_PRODUCT_ROUTER } from '@/commons'

export const useProductDetailChooseOptionModal = (props: ProductDetailChooseOptionModalProps, emits: ProductDetailChooseOptionModalEmits) => {
  const router = useRouter()
  const { processLink } = useBuildLink()

  const listDataSelectDepth1 = ref<ProductDetailChooseSelectData<ProductDetailOptionDepth1>>({
    options: [],
    value: undefined
  })
  const listDataSelectDepth2 = ref<ProductDetailChooseSelectData<ProductDetailOptionDepth2>>({
    options: [],
    value: undefined
  })
  const listDataSelectDepth3 = ref<ProductDetailChooseSelectData<ProductDetailOptionDepth3>>({
    options: [],
    value: undefined
  })

  const listDataChooseProduct = ref<
    { name: string; price: number; quantity: number; totalQuantity: number; optionKey?: number; isHiddenButton?: boolean }[]
  >([])
  const { openModal } = useModalNotification()
  const { handleAddToCart } = useProductDetailAddToCart()
  const isLoading = ref(false)

  onMounted(() => {
    if (props.optionUseYn === YesNoEnum.Y) {
      isLoading.value = true
      productDetailApi
        .getOptionItemProductDepth1(props.productKey, props.optionType === ProductDetailOptionTypeEnum.singleOption)
        .then((data) => {
          if (data.data.length) {
            listDataSelectDepth1.value.options = getDataSelect<ProductDetailOptionDepth1>(data.data, 'option1DepthName')
          } else {
            listDataChooseProduct.value = [
              {
                name: props.name ?? '',
                price: props.price,
                quantity: 1,
                totalQuantity: props.totalQuantity,
                isHiddenButton: true
              }
            ]
          }
        })
        .finally(() => {
          isLoading.value = false
        })
    } else {
      listDataChooseProduct.value = [
        {
          name: props.name ?? '',
          price: props.price,
          quantity: 1,
          totalQuantity: props.totalQuantity,
          isHiddenButton: true
        }
      ]
    }
  })

  const handleDataToAddCart = (toOrder = false) => {
    if (listDataChooseProduct.value.length > 0) {
      listDataChooseProduct.value.forEach((item) => {
        handleAddToCart(
          +props.productKey,
          {
            productQuantity: item.quantity,
            productOptionKey: item.optionKey
          },
          toOrder
        )
      })

      listDataChooseProduct.value = []
    }
    emits('onClose')
  }

  const getDataSelect = <T>(data: T[], keyName: keyof T) => {
    return data.map((item: any) => {
      return {
        ...item,
        disabled: item.optionInventoryQuantity === 0,
        [keyName]: item.optionSaleStatus !== ProductDetailSaleStatus.onSale ? item?.[keyName] + `(${item.optionSaleStatusName})` : item?.[keyName]
      }
    })
  }

  const handleChangeValueDepth1 = (value: ProductDetailOptionDepth1) => {
    listDataSelectDepth1.value.value = value
    //listDataChooseProduct.value = []
    if (props.optionType !== ProductDetailOptionTypeEnum.singleOption) {
      productDetailApi
        .getOptionItemProductDepth2(props.productKey, value.option1DepthName)
        .then((data) => {
          if (data.data.length) {
            listDataSelectDepth2.value.options = getDataSelect<ProductDetailOptionDepth2>(data.data, 'option2DepthName')
          }
        })
        .catch(() => {})
    } else {
      const isHas = listDataChooseProduct.value.some((item) => item.name === value.option1DepthName)
      if (isHas) {
        showModalDuplicateOption()
        return
      }
      listDataChooseProduct.value.push({
        name: value.option1DepthName,
        price: value.optionPrice,
        quantity: 1,
        optionKey: value.optionKey,
        totalQuantity: props.totalQuantity
      })

      // listDataSelectDepth1.value.value = undefined
    }
  }

  const handleChangeValueDepth2 = (value: ProductDetailOptionDepth2) => {
    listDataSelectDepth2.value.value = value
    //  listDataChooseProduct.value = []
    if (props.useOptionType === YesNoEnum.Y) {
      productDetailApi
        .getOptionItemProductDepth3(props.productKey, listDataSelectDepth1.value.value?.option1DepthName ?? '', value.option2DepthName)
        .then((data) => {
          listDataSelectDepth3.value.options = getDataSelect<ProductDetailOptionDepth3>(data.data, 'option3DepthName')
        })
        .catch(() => {})
      return
    }
    const nameItemChoose = `${listDataSelectDepth1.value.value?.option1DepthName ?? ''}/${value.option2DepthName}`
    const isHas = listDataChooseProduct.value.some((item) => item.name === nameItemChoose)
    if (isHas) {
      showModalDuplicateOption()
      return
    }
    listDataChooseProduct.value.push({
      name: `${listDataSelectDepth1.value.value?.option1DepthName ?? ''}/${listDataSelectDepth2.value.value?.option2DepthName}`,
      price: value.optionPrice,
      quantity: 1,
      optionKey: value.optionKey,
      totalQuantity: value.optionInventoryQuantity
    })
    // listDataSelectDepth1.value.value = undefined
    // listDataSelectDepth2.value.value = undefined
  }

  const handleChangeValueDepth3 = (value: ProductDetailOptionDepth3) => {
    const nameItemChoose = `${listDataSelectDepth1.value.value?.option1DepthName ?? ''}/${listDataSelectDepth2.value.value?.option2DepthName}/${
      value.option3DepthName
    }`
    const isHas = listDataChooseProduct.value.some((item) => item.name === nameItemChoose)
    if (isHas) {
      showModalDuplicateOption()
      return
    }
    listDataSelectDepth3.value.value = value
    listDataChooseProduct.value.push({
      name: `${listDataSelectDepth1.value.value?.option1DepthName ?? ''}/${listDataSelectDepth2.value.value?.option2DepthName}/${
        value.option3DepthName
      }`,
      price: value.optionPrice,
      quantity: 1,
      optionKey: value.optionKey,
      totalQuantity: value.optionInventoryQuantity
    })

    // listDataSelectDepth1.value.value = undefined
    // listDataSelectDepth2.value.value = undefined
    // listDataSelectDepth3.value.value = undefined
  }

  const handleDeleteOption = (index: number) => {
    listDataChooseProduct.value.splice(index, 1)
  }

  const showModalDuplicateOption = () => {
    openModal?.({
      content: '이미 선택한 옵션입니다.'
    })
  }

  const totalPrice = computed(() => {
    return listDataChooseProduct.value.reduce((currentCount, item) => {
      return currentCount + item.price * item.quantity
    }, 0)
  })

  const handleBuy = () => {
    if (!listDataChooseProduct.value.length) {
      openModal?.({
        content: '옵션을 선택해 주세요.'
      })
    } else if (props.productClassificationCode === ProductDetailClassificationEnum.ticket) {
      router.push(processLink(`${ORDER_E_PRODUCT_ROUTER}/${props.productKey}?quantity=${listDataChooseProduct.value[0].quantity}`))
    } else {
      // handleDataToAddCart(true)
      router.push(
        processLink(
          `${ORDER_PRODUCT_ROUTER}/?productKey=${props.productKey}&productQuantity=${listDataChooseProduct.value[0].quantity}${
            listDataChooseProduct.value[0]?.optionKey ? `&productOptionKey=${listDataChooseProduct.value[0]?.optionKey}` : ''
          }`
        )
      )
    }
    emits('onClose')
  }

  return {
    listDataSelectDepth1,
    listDataSelectDepth2,
    listDataSelectDepth3,
    handleChangeValueDepth1,
    handleChangeValueDepth2,
    handleChangeValueDepth3,
    listDataChooseProduct,
    handleDeleteOption,
    totalPrice,
    handleAddToCart: handleDataToAddCart,
    isLoading,
    handleBuy
  }
}
