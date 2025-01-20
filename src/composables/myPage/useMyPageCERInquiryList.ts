import { mainMember } from '@/services/api/myPage/MainMemberApi'
import { onMounted, ref, watch } from 'vue'
import { ProductModel, ProductReturnModel } from '@/models/uikits/WelfareUnitCardTypes'
import { MyPageCancelExchangeReturnModel, MyPageOrderProductResponse } from '@/models/views/myPage/MyPageCancelExchangeReturnModel'
import {
  MyPageStatusDeliveryOrder,
  myPageListMessageStatusDelivery
} from '@/models/views/myPage/MyPageMainMemberModel'
import { useRoute } from 'vue-router'
import { useHandleResponsePagination } from '@/composables/common/useHandleResponsePagination'
import { PAGE_SIZE_20 } from '@/commons'
import { ProductDetailSaleStatus } from '@/models/views/products/ProductDetailReviewModel'

export const useMyPageCERInquiryList = () => {
  const router = useRoute()
  const isShowCalendar = ref(false)
  const mapReturnToProductModel = (returnModel: ProductReturnModel, orderProductResponse: MyPageOrderProductResponse): ProductModel => {
    return {
      id: returnModel.receiverProductOrderKey,
      productName: orderProductResponse.productName,
      productImage: returnModel.ticketImageUrl,
      pricePromotion: returnModel.productPrice,
      quantity: returnModel.quantity,
      state: ProductDetailSaleStatus.onSale,
      deliveryName: returnModel.receiverName
    }
  }

  const mapReturnOrderDeliveryStatus = (status: MyPageStatusDeliveryOrder): string => {
    return myPageListMessageStatusDelivery[status]
  }

  const isShowButtonReturnRequest = (status: string) => {
    if (status === MyPageStatusDeliveryOrder.REFUND_COMPLETE) {
      return true
    }
    return false
  }

  const currentDate = new Date()
  const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)

  const convertMonthYearToFormat = (month: number, year: number) => {
    return `${year}-${String(month).padStart(2, '0')}-01T00:00:00`
  }

  let fromDate = router.query?.fromDate as string || convertMonthYearToFormat(previousMonth.getMonth() + 1, previousMonth.getFullYear())
  let toDate = router.query?.toDate as string  || convertMonthYearToFormat(currentDate.getMonth() + 1, currentDate.getFullYear())

  watch(router, () => {
    fromDate = router.query?.fromDate as string
    toDate = router.query?.toDate as string
    refresh()
  })

  const getDataCalendar = (data: any) => {
    fromDate = convertMonthYearToFormat(data.fromDate.month, data.fromDate.year)
    toDate = convertMonthYearToFormat(data.toDate.month, data.toDate.year)
    refresh()
  }

  const fetchData = (pageToken: number = 0, pageSize: number = PAGE_SIZE_20) => {
    return mainMember.getListOrderDelivery({
      pageNum: pageToken + 1,
      rowSize: pageSize,
      fromDate: fromDate,
      toDate: toDate
    })
  }

  const { refresh, isLoading, handleLoadMore, data, hasMore } = useHandleResponsePagination<MyPageCancelExchangeReturnModel>(fetchData, PAGE_SIZE_20)

  const loadMore = () => {
    handleLoadMore()
  }

  onMounted(() => {
    refresh()
  })

  return {
    products: data,
    isShowCalendar,
    mapReturnToProductModel,
    mapReturnOrderDeliveryStatus,
    isShowButtonReturnRequest,
    isLoading,
    loadMore,
    hasMore,
    getDataCalendar
  }
}
