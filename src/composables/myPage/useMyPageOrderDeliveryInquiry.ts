import { MYPAGE_PRODUCT_REVIEW_NEW, ORDER_PRODUCT_ROUTER, PAGE_SIZE_20, getImageProduct } from '@/commons'
import { useHandleResponsePagination } from '@/composables/common/useHandleResponsePagination'
import { MyPageInquiryOrderNumber, MyPageOrderEntryResponses } from '@/models/views/myPage/MyPageCustomerInfo'
import { MyPageStatusDeliveryOrder } from '@/models/views/myPage/MyPageMainMemberModel'
import { myPageInquiryOrder } from '@/services/api/myPage/MyPageCustomerApi'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBuildLink } from '../common/useBuildLink'
import { useI18n } from 'vue-i18n'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'

export const useMyPageOrderDeliveryInquiry = () => {
  const route = useRoute()
  const router = useRouter()
  const { processLink } = useBuildLink()
  const isShowCalendar = ref(false)
  const isMember = route.query?.member === 'yes'
  const currentDate = new Date()
  const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
  const { t } = useI18n()

  const { openModal: openNotification } = useModalNotification()

  const convertMonthYearToFormat = (month: number, year: number) => {
    return `${year}-${String(month).padStart(2, '0')}-01T00:00:00`
  }

  let fromDate = (route.query?.fromDate as string) || convertMonthYearToFormat(previousMonth.getMonth() + 1, previousMonth.getFullYear())
  let toDate = (route.query?.toDate as string) || convertMonthYearToFormat(currentDate.getMonth() + 1, currentDate.getFullYear())
  // watch(route, () => {
  //   fromDate = route.query?.fromDate as string
  //   toDate = route.query?.toDate as string
  //   refresh()
  // })

  const getDataCalendar = (data: any) => {
    fromDate = convertMonthYearToFormat(data.fromDate.month, data.fromDate.year)
    toDate = convertMonthYearToFormat(data.toDate.month, data.toDate.year)
    refresh()
  }

  const fetchData = async (pageToken: number = 0, pageSize: number = PAGE_SIZE_20) => {
    return myPageInquiryOrder.getWelfareInquiryOrderNumber({
      pageNum: pageToken + 1,
      rowSize: pageSize,
      fromDate: fromDate,
      toDate: toDate
    })
  }

  const redirectLinkToReviewProduct = (productKey: string | number, orderProductKey?: string | number) => {
    router.push(processLink(`${MYPAGE_PRODUCT_REVIEW_NEW}?productKey=${productKey}&orderProductKey=${orderProductKey}`))
  }

  const redirectLinkToDetail = (key?: string | number, productOrderKey?: string | number) => {
    router.push(processLink(`${ORDER_PRODUCT_ROUTER}?member=yes&cartKey=${key}&cartProductKeys=${productOrderKey}`))
  }
  const { data, handleLoadMore, refresh, hasMore, isLoading } = useHandleResponsePagination<MyPageInquiryOrderNumber>(fetchData, PAGE_SIZE_20)

  const product = computed(() => {
    if (data.value && data.value.length > 0) {
      return data.value
        .filter((pro: MyPageInquiryOrderNumber) =>
          pro.myPageOrderEntryResponses.some((item: MyPageOrderEntryResponses) => item.deliveryOrderResponse)
        )
        .map((pro: MyPageInquiryOrderNumber) => {
          const deliveryResponseObj = pro.myPageOrderEntryResponses[0].deliveryOrderResponse.deliveryResponse
          const orderAddress = deliveryResponseObj
            ? `(${deliveryResponseObj.deliveryStreetAddress} ${deliveryResponseObj.deliveryDetailAddress})`
            : ''

          const productChildArr = pro.myPageOrderEntryResponses
            .filter((item: MyPageOrderEntryResponses) => item.deliveryOrderResponse)
            .map((item: MyPageOrderEntryResponses) => {
              const isProduct = item.deliveryOrderResponse
              const optionName =
                isProduct && isProduct.deliveryProductResponses[0].productResponse.productOptionResponses[0]
                  ? `${isProduct.deliveryProductResponses[0].productResponse.productOptionResponses[0].optionLargeName} 
                    ${isProduct.deliveryProductResponses[0].productResponse.productOptionResponses[0].optionMediumName}  
                    ${isProduct.deliveryProductResponses[0].productResponse.productOptionResponses[0].optionSmallName}`
                  : ''
              return {
                productKey: isProduct ? isProduct.deliveryProductResponses[0].productKey : '',
                productOrderKey: isProduct ? isProduct.deliveryProductResponses[0].orderDeliveryProductKey : '',
                productName: isProduct ? isProduct.deliveryProductResponses[0].productResponse.productName : '',
                productImage:
                  isProduct && isProduct.deliveryProductResponses[0].productResponse.attachfilePathName
                    ? `${getImageProduct(isProduct.deliveryProductResponses[0].productResponse.attachfilePathName, isProduct.deliveryProductResponses[0].productResponse.attachfileName)}`
                    : '',
                pricePromotion: isProduct ? isProduct.deliveryProductResponses[0].productResponse.productPrice : '',
                quantity: pro.quantity,
                nameOption: optionName,
                deliveryStatus: isProduct ? isProduct.orderProcessStatus : '',
                linkTo: `/product-detail?productKey=${isProduct ? isProduct.deliveryProductResponses[0].productKey : ''}`,
                finalOrderStatus: isProduct && isProduct.orderProcessStatus === MyPageStatusDeliveryOrder.RETURN_PRODUCT_PICKUP_COMPLETE
              }
            })
          return { ...pro, productChildArr, orderAddress }
        })
    }
    return []
  })

  onMounted(() => {
    refresh()
  })

  const openModalComingSoon = () => {
    openNotification({
      content: t('errorNotFound.comingSoon')
    })
  }

  return {
    product,
    isShowCalendar,
    isMember,
    handleLoadMore,
    getDataCalendar,
    hasMore,
    isLoading,
    redirectLinkToDetail,
    openModalComingSoon,
    redirectLinkToReviewProduct
  }
}
