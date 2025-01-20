import { CartChangeOptionProductModalEmits, CartChangeOptionProductModalProps } from '@/components/cart/modal/CartChangeOptionProductModal.vue'
import { CartOptionsResponse, CartProductOptionResponses } from '@/models/services/responses/cart/CartResponse'
import { WelfareSelectDataModel } from '@/models/uikits/WelfareSelectTypes'
import { cartPageApi } from '@/services/api/cart/CartPageApi'
import { computed, onMounted, ref, watch } from 'vue'

export const useCartChangeOptionProductModal = (props: CartChangeOptionProductModalProps, emits: CartChangeOptionProductModalEmits) => {
  const isLoading = ref<boolean>(false)
  const listOptions = ref<CartProductOptionResponses[]>([])
  const selectedOption = ref<WelfareSelectDataModel>()

  const handleMapTextToOption = (options: string[]) => {
    return options.map((text) => {
      return {
        label: text ?? '',
        value: text ?? ''
      }
    })
  }

  const listLargeOptions = computed(() => {
    return handleMapTextToOption(Array.from(new Set(listOptions.value.map((i) => i.optionLargeName ?? ''))))
  })
  const listMediumOptions = computed(() => {
    return handleMapTextToOption(
      Array.from(new Set(listOptions.value.filter((o) => o.optionLargeName == selectedLargeOption.value).map((i) => i.optionMediumName ?? '')))
    )
  })

  const selectedLargeOption = ref<string>()
  const selectedMediumOption = ref<string>()
  const selectedSmallOption = ref<string>()
  const isSaving = ref<boolean>(false)
  const promotionPrice = ref<number>(props.dataProduct.pricePromotion ?? 0)
  const quantity = ref<number>(props.dataProduct.quantity)
  onMounted(() => {
    initData()
  })

  const listSmallOptions = computed(() => {
    const optionReturn = handleMapTextToOption(
      Array.from(
        new Set(
          listOptions.value
            .filter((o) => o.optionLargeName == selectedLargeOption.value && o.optionMediumName == selectedMediumOption.value)
            .map((i) => i.optionSmallName ?? '')
        )
      )
    )
    if (optionReturn.length === 1 && optionReturn[0].value === '' && optionReturn[0].label === '') {
      return []
    }
    return optionReturn
  })

  const initData = async () => {
    isLoading.value = true
    if (props.optionsSelected[0]) {
      const res: CartOptionsResponse = await cartPageApi.getAllOptionsByOptionKey(props.optionsSelected[0].optionKey ?? 0)
      listOptions.value = [props.optionsSelected[0], ...(res.data.productOptionResponses ?? [])]
      selectedOption.value = mappingOption(props.optionsSelected[0])
    }
    quantity.value = props.dataProduct.quantity
    isLoading.value = false
  }

  watch([selectedLargeOption, selectedMediumOption, selectedSmallOption], () => {
    const optionKey = handleGetOptionKey(selectedLargeOption.value ?? '', selectedMediumOption.value ?? '', selectedSmallOption.value ?? '')
    selectedOption.value = {
      label: optionKey ? `${selectedLargeOption.value ?? ''}/${selectedMediumOption.value ?? ''}/${selectedSmallOption.value ?? ''}` : '',
      value: optionKey
    }
  })

  const handleGetOptionKey = (largeText: string, mediumText: string, smallText: string) => {
    if (smallText) {
      return (
        listOptions.value.find((i) => i.optionLargeName == largeText && i.optionMediumName == mediumText && i.optionSmallName == smallText)
          ?.optionKey ?? ''
      )
    } else {
      return listOptions.value.find((i) => i.optionLargeName == largeText && i.optionMediumName == mediumText)?.optionKey ?? ''
    }
  }

  const mappingOption = (option: CartProductOptionResponses) => {
    const clone = {
      optionLargeName: option.optionLargeName,
      optionMediumName: option.optionMediumName,
      optionSmallName: option.optionSmallName
    }
    selectedLargeOption.value = option.optionLargeName ?? ''
    selectedMediumOption.value = option.optionMediumName ?? ''
    selectedSmallOption.value = option.optionSmallName ?? ''

    return {
      label: Object.values(clone).join('/'),
      value: option.optionKey ?? 0
    }
  }

  const handleUpdateQuantity = (value: number) => {
    quantity.value = value
  }

  const onSave = async () => {
    isSaving.value = true
    const optionKey = selectedOption.value ? Number(selectedOption.value?.value) : 0
    await cartPageApi.updateProductItem(props.dataProduct.cartProductKey, {
      cartProductKey: props.dataProduct.cartProductKey,
      productQuantity: quantity.value,
      optionKey: optionKey
    })
    isSaving.value = false
    emits('save', optionKey)
    emits('onClose')
  }

  return {
    listOptions,
    isLoading,
    selectedOption,
    handleUpdateQuantity,
    onSave,
    isSaving,
    quantity,
    listLargeOptions,
    listMediumOptions,
    listSmallOptions,
    selectedLargeOption,
    selectedMediumOption,
    selectedSmallOption,
    promotionPrice
  }
}
