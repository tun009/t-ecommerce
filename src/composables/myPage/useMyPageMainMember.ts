import { ref, onBeforeMount } from 'vue'
import { MyPageDeliveryMyPageCountModel } from '@/models/views/myPage/MyPageMainMemberModel'
import { mainMember } from '@/services/api/myPage/MainMemberApi'
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/account'
import { convertTextMaxCount, isAndroid, isIos } from '@/commons'

export const useMyPageMainMember = () => {
  const deliveryCountState = ref<MyPageDeliveryMyPageCountModel>()
  const accountStore = useAccountStore()
  const isApp = isAndroid || isIos
  const { account } = storeToRefs(accountStore)
  const listLinkRedirect = [
    {
      name: 'myPage.main.linkRedirect.orderDeliveryInquiry',
      path: '/my-page/order/delivery-inquiry'
    },
    {
      name: 'myPage.main.linkRedirect.cancellationExchangeReturn',
      path: '/my-page/cancel-exchange-return-inquiry'
    },
    {
      name: 'myPage.main.linkRedirect.managementDeliveryAddress',
      path: '/my-page/delivery-address'
    },
    {
      name: 'myPage.main.linkRedirect.managementProductReview',
      path: '/my-page/products/review'
    },
    {
      name: 'myPage.main.linkRedirect.likeProduct',
      path: '/my-page/products/like'
    },
    // {
    //   name: 'myPage.main.linkRedirect.eventAppDetail'
    // },
    {
      name: 'myPage.main.linkRedirect.contact',
      path: '/my-page/inquiry/write'
    },
    {
      name: 'myPage.main.linkRedirect.detailInquiry',
      path: '/my-page/inquiry/details?type=member'
    },
    {
      name: 'myPage.main.linkRedirect.askedQuestionFre',
      path: '/my-page/customer'
    }
  ]
  
  onBeforeMount(() => {
    mainMember
      .getDeliveryCountState()
      .then((data) => {
        deliveryCountState.value = {
          ...data.data,
          couponCount: convertTextMaxCount(data.data.couponCount),
          inTransitCount: data.data.inTransitCount,
          reviewCount: convertTextMaxCount(data.data.reviewCount)
        }
      })
      .catch(() => {})
  })

  return {
    listLinkRedirect,
    deliveryCountState,
    account,
    isApp
  }
}
