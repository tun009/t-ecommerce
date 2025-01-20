import { useLoading } from "@/composables/common/useLoading"
import { MyPageBankWelfarePointsCouponItemModel, MyPageBankWelfarePointsItemModel, MyPageBankWelfarePointsModel, MyPageBankWelfarePointsReservesItemModel, MyPageBankWelfarePointsReservesModel, MyPageCouponSortType, MyPageRewardPointDateRangeType, MyPageWelfarePointTypeEnum, myPageRewardPointDateRangeOptions } from "@/models/views/myPage/MyPageShoppingAccountWelfarePoint"
import { myPageBankMemberWelfarePointsApi } from "@/services/api/myPage/MyPageBankMemberWelfarePointsApi"
import { myPageBankWelfarePointsApi } from "@/services/api/myPage/MyPageBankWelfarePointsApi"
import { onMounted, ref, watch } from "vue"
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export const useMyPageShoppingAccountWelfarePoint = () => {
  const { t } = useI18n()
  const { setLoading } = useLoading()
  const route = useRoute()
  const type = ref(route.query.type)
  const searchType = ref(myPageRewardPointDateRangeOptions[0])
  const couponSortType = ref(MyPageCouponSortType.NEWEST)

  const title = ref()
  const emptyItemsText = ref()
  const introduce = ref()
  const introduceTitle = ref()

  const introduceReserves = [
    t('myPage.welfarePoints.rewardPointsDescription1'), // '현금과 동일하게 사용 할 수 있는 결제 수단입니다.',
    t('myPage.welfarePoints.rewardPointsDescription2'), //'적립금은 예치금과 달리 현금으로 지급해드리지 않습니다.',
    t('myPage.welfarePoints.rewardPointsDescription3'), //'상품구매 시 지급받은 적립금은 해당상품을 취소/반품 시 적립금 </br> 지급도 취소 됩니다.',
    t('myPage.welfarePoints.rewardPointsDescription4'), //'<span class="wf_line-height-16-9">적립금은 상품평 등록과 같은 활동이나 다양한 이벤트 참여 등을 </br> 통해 받으실 수 있습니다.</span>',
    t('myPage.welfarePoints.rewardPointsDescription5'), //'적립금은 해당 적립금의 성격에 따라 유효기간이 다를 수 있습니다.'
  ]
  const introduceWelfarePoints = [
    t('myPage.welfarePoints.welfarePointsDescription1'), //'현금과 동일하게 사용 할 수 있는 결제 수단입니다.',
    t('myPage.welfarePoints.welfarePointsDescription2'), //'복지포인트는 현금으로 지급해드리지 않습니다.'
  ]
  const introduceCoupon = [
    t('myPage.welfarePoints.couponDescription1'), //'쿠폰 사용은 주문서 작성 시 결제정보를 입력하는 화면에서 사용 가능한 </br> 쿠폰을 조회하여 사용할 수 있습니다.',
    t('myPage.welfarePoints.couponDescription2'), //'쿠폰별로 사용기간이 있으며, 사용가긴 만료된 이후에는 사용 할 수 </br> 없습니다.',
    t('myPage.welfarePoints.couponDescription3'), //'한번 사용된 할인쿠폰은 재발행 되지 않으므로 상품의 취소나 교환/반품 </br> 시에도 돌려받 을 수 없습니다.',
    t('myPage.welfarePoints.couponDescription4'), //'할인쿠폰의 할인 금액이 상품의 판매가를 초과할 경우에는 할인쿠폰 </br> 사용이 불가능합니 다.',
    t('myPage.welfarePoints.couponDescription5'), //'쿠폰 사용 시 적립금은 구매액 기준이 아니라 할인된 금액의 적립금으로 <br> 적용 됩니다.'
  ]

  const reserves = ref<MyPageBankWelfarePointsReservesModel>()
  const reservesItems = ref<MyPageBankWelfarePointsReservesItemModel[]>([])

  const welfarePoints = ref<MyPageBankWelfarePointsModel>()
  const welfarePointsItems = ref<MyPageBankWelfarePointsItemModel[]>([])
  const couponsItems = ref<MyPageBankWelfarePointsCouponItemModel[]>([])

  onMounted(() => {
    if (type.value === MyPageWelfarePointTypeEnum.Reserves) {
      title.value = t('myPage.orderDetail.refundPrice.reserves') //적립금
      emptyItemsText.value = t('myPage.welfarePoints.viewedNotFound') //조회된 내역이 없습니다.
      introduce.value = introduceReserves
      introduceTitle.value = t('myPage.welfarePoints.rewardPointsGuide') //적립금 이용안내
      getWelfarePointsReserves(searchType.value.value)
    } else if (type.value === MyPageWelfarePointTypeEnum.WelfarePoints) {
      title.value = t('myPage.orderDetail.refundPrice.welfarePoints') // 복지포인트
      emptyItemsText.value = t('myPage.welfarePoints.viewedNotFound') //조회된 내역이 없습니다.
      introduce.value = introduceWelfarePoints
      introduceTitle.value = t('myPage.welfarePoints.welfarePointsGuide') //복지포인트 이용안내
      getWelfarePoints(searchType.value.value)
    } else {
      title.value = t('myPage.main.couponTitle') //쿠폰
      emptyItemsText.value = t('myPage.welfarePoints.couponNotFound') //'쿠폰 내역이 없습니다.'
      introduce.value = introduceCoupon
      introduceTitle.value = t('myPage.welfarePoints.couponGuide') //쿠폰 이용 안내
      getWelfarePointsCoupon(couponSortType.value)
    }

  })

  const getWelfarePointsReserves = (type: MyPageRewardPointDateRangeType) => {
    setLoading?.(true)
    myPageBankWelfarePointsApi.getWelfarePointsReservesItems(type)
      .then(items => {
        reservesItems.value = items.data
      })
      .catch(() => { })
      .finally(() => {
        setLoading?.(false)
      })

    myPageBankWelfarePointsApi.getWelfarePointsReserves()
      .then(res => {
        reserves.value = res.data
      })
      .catch(() => { })
  }

  const getWelfarePoints = (type: MyPageRewardPointDateRangeType) => {
    setLoading?.(true)
    myPageBankMemberWelfarePointsApi.getWelfarePointsItems(type)
      .then(items => {
        welfarePointsItems.value = items.data
      })
      .catch(() => { })
      .finally(() => {
        setLoading?.(false)
      })

    myPageBankMemberWelfarePointsApi.getWelfarePoints()
      .then(res => {
        welfarePoints.value = res.data
      })
      .catch(() => { })
  }

  const getWelfarePointsCoupon = (type: MyPageCouponSortType) => {
    setLoading?.(true)
    myPageBankWelfarePointsApi.getWelfarePointsCouponItems(type)
      .then(items => {
        couponsItems.value = items.data
      })
      .catch(() => { })
      .finally(() => {
        setLoading?.(false)
      })
  }

  watch(searchType, (newSearchType) => {
    if (type.value === MyPageWelfarePointTypeEnum.Reserves) {
      getWelfarePointsReserves(newSearchType.value)
    } else if (type.value === MyPageWelfarePointTypeEnum.WelfarePoints) {
      getWelfarePoints(newSearchType.value)
    }
  })

  watch(couponSortType, (newType) => {
    getWelfarePointsCoupon(newType)
  })

  return {
    type, title, emptyItemsText, introduce, introduceTitle, searchType, couponSortType, reserves, reservesItems, welfarePoints, welfarePointsItems, couponsItems
  }
}