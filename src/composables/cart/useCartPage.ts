import { WELFARE_LIST_CART_KEY, getImageProduct } from '@/commons'
import { CartProductOptionResponses, CartProductResponses } from '@/models/services/responses/cart/CartResponse'
import { CartProductModel } from '@/models/views/cart/CartProductModel'
import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'
import { cartPageApi } from '@/services/api/cart/CartPageApi'
import { computed, onMounted, ref, watch } from 'vue'
import { useStorage } from '../common/useStorage'
import { memberApi } from '@/services/api/member/memberApi'

export const useCartPage = () => {
  const isLoadingGetOrderCart = ref(false)
  const allProducts = ref<CartProductModel[]>([])
  const selectedProducts = ref<CartProductModel[]>([])
  const isSelectAll = ref(false)
  const [cartProductKeys, setCartProductKeys] = useStorage<number[]>(WELFARE_LIST_CART_KEY)
  const totalShippingCost = ref(0)

  const cartPaymentInformation = computed(() => {
    const totalProductAmount = selectedProducts.value.reduce((total, currentProduct) => {
      return total + (currentProduct?.price ?? 0) * (currentProduct?.quantity ?? 0)
    }, 0)
    // TODO: Don't know which filed of discountProduct to calculate totalDiscountAmount - 5b slide 28 in SB
    const totalDiscountAmount = selectedProducts.value.reduce((total, currentProduct) => {
      return total + (currentProduct?.price! - currentProduct?.pricePromotion!) * currentProduct?.quantity
    }, 0)
    // TODO: Don't know how to calculate totalShippingCost - Do not know what is group delivery
    const totalPaymentWithoutShippingCost = totalProductAmount - totalDiscountAmount
    const totalPayment = totalPaymentWithoutShippingCost + totalShippingCost.value
    return {
      totalProductAmount: totalProductAmount,
      totalDiscountAmount: totalDiscountAmount,
      totalShippingCost: totalShippingCost.value,
      totalPayment: totalPayment,
      totalPaymentWithoutShippingCost: totalPaymentWithoutShippingCost,
      selectedProducts: selectedProducts
    }
  })

  onMounted(() => {
    handleGetOrderCart()
  })

  watch(
    () => selectedProducts?.value,
    () => {
      if (selectedProducts.value.length > 0) {
        memberApi.getSellerCompanyShipment(selectedProducts.value.map((item) => item.sellerDeliveryFeeKey)).then((data) => {
          console.log(data)
        })
      }
    }
  )

  const handleGetOrderCart = (isShowLoading: boolean = true) => {
    isLoadingGetOrderCart.value = isShowLoading
    isSelectAll.value = false
    selectedProducts.value = []
    cartPageApi
      .getOrderCart()
      .then((data) => {
        const cartKeysLocal = cartProductKeys?.value ?? []
        allProducts.value =
          data?.data?.cartProductResponses?.map((product: CartProductResponses) => {
            let optionString = ''
            optionString =
              product?.productResponse?.productOptionResponses && product?.productResponse?.productOptionResponses.length > 0
                ? mappingOption(product.productResponse.productOptionResponses[0])?.label
                : ''
            const productPrice =
              product?.productResponse?.productOptionResponses?.length! > 0
                ? product?.productResponse?.productOptionResponses?.[0].optionPrice
                : product?.productResponse?.productPrice
            return {
              id: product?.productKey,
              productName: product?.productResponse?.productName,
              productImage: getImageProduct(product?.productResponse?.attachfilePathName ?? '', product?.productResponse?.attachfileName ?? ''),
              price: productPrice,
              // NOTE if immediatelyDiscountResponse is null -> don't applied any promotions
              pricePromotion: product?.productResponse?.immediatelyDiscountResponse
                ? productPrice! - product?.productResponse?.immediatelyDiscountResponse.amount!
                : productPrice,
              quantity: product?.productQuantity,
              quantityClone: product?.productQuantity,
              nameOption: optionString,
              // TODO Still missing status delivering and preparing
              state: product?.productResponse?.lastProductStatsCode ?? product?.productResponse?.saleStatus,
              // TODO Don't know what field to bind to state deliveryName
              deliveryName: 'deliveryName',
              config: {
                name: 'Config name',
                des: optionString
              },
              //NOTE: Expand data for cart product
              isSelect: cartKeysLocal.includes(product?.cartProductKey ?? 0),
              cartProductKey: product?.cartProductKey,
              cartKey: product?.cartKey,
              productKey: product?.productKey,
              productOptionResponses: product?.productResponse?.productOptionResponses,
              // TODO maximumPurchaseQuantity maybe null -> in this case instead by 20
              maximumPurchaseQuantity: product?.productResponse?.maximumPurchaseQuantity ?? 20,
              minimumPurchaseQuantity: product?.productResponse?.minimumPurchaseQuantity,
              adultCertificationProductYn: product?.productResponse?.adultCertificationProductYn,
              sellerDeliveryFeeKey: product?.productResponse?.sellerDeliveryFeeKey
            }
          }) ?? []
        selectedProducts.value = allProducts.value.filter((item) => cartKeysLocal.includes(item?.cartProductKey))
        isSelectAll.value = allProducts.value.length === cartKeysLocal.length && cartKeysLocal.length != 0
      })
      .catch(() => {
        allProducts.value = []
      })
      .finally(() => {
        isLoadingGetOrderCart.value = false
      })
  }

  const mappingOption = (option: CartProductOptionResponses) => {
    const clone = {
      optionLargeName: option?.optionLargeName ?? '',
      optionMediumName: option?.optionMediumName ?? '',
      optionSmallName: option?.optionSmallName ?? ''
    }
    return {
      label: Object.values(clone).join(),
      value: option?.optionKey ?? 0
    }
  }

  const handleToggleSelect = (selectProduct: CartProductModel) => {
    let selectAll = true
    allProducts.value.forEach((product) => {
      if (product.cartProductKey === selectProduct.cartProductKey) {
        const isSelect = product.isSelect
        if (!isSelect) {
          selectedProducts.value.push(selectProduct)
        } else {
          selectedProducts.value = selectedProducts.value.filter((product) => product.cartProductKey !== selectProduct.cartProductKey)
        }
        product.isSelect = !isSelect
      }
      if (!product.isSelect) selectAll = false
    })
    isSelectAll.value = selectAll
    setCartProductKeys(selectedProducts.value.map((item) => item.cartProductKey))
  }

  const handleToggleSelectAllProduct = () => {
    isSelectAll.value = !isSelectAll.value
    selectedProducts.value = []
    allProducts.value?.forEach((product: CartProductModel) => {
      product.isSelect = isSelectAll.value
      // NOTE: Check is product out of stock or delivery => Done but does not test
      if (isSelectAll.value && product.state === ProductDetailSaleStatus.onSale) {
        selectedProducts.value.push(product)
      }
    })
    setCartProductKeys(selectedProducts.value.map((item) => item.cartProductKey))
  }

  return {
    allProducts,
    selectedProducts,
    cartPaymentInformation,
    isSelectAll,
    isLoadingGetOrderCart,
    handleToggleSelect,
    handleToggleSelectAllProduct,
    handleGetOrderCart
  }
}
