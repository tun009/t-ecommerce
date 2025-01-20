<!-- FO_MC_MY014009, FO_MC_MY014010 -->
<script setup lang="ts">
import { formatTimeWithDot } from '@/commons'
import MyPageOrderShortInfo from '@/components/myPage/common/MyPageOrderShortInfo.vue'
import MyPageProductECouponWrap from '@/components/myPage/common/MyPageProductECouponWrap.vue'
import OrderGroupOrderPriceECoupon from '@/components/order/OrderGroupOrderPriceECoupon.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useMyPageECouponOrderDetail } from '@/composables/myPage/useMyPageECouponOrderDetail'
import { MyPageStatusDeliveryOrder } from '@/models/views/myPage/MyPageMainMemberModel'

const { product, mapReturnToProductModel, mapReturnOrderDeliveryStatus } = useMyPageECouponOrderDetail()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop
      class="wf-title-cancel-exchange-return-inquiry"
      :title="$t('myPage.orderDetail.title')"
      display-back-icon
      display-cart-icon
      display-search-icon
    />
    <div class="wf-relative" v-if="product">
      <MyPageOrderShortInfo :order-date="formatTimeWithDot(product.createdDatetime)" :order-number="product.orderKey.toString()" />
      <div v-for="productTicket in product?.orderProductResponses" :key="productTicket.productOrderKey">
        <div class="wf-px-16">
          <MyPageProductECouponWrap
            v-for="(productCard, indexProductCard) in productTicket.orderDeliveryResponses"
            v-bind:key="productCard.receiverProductOrderKey"
            :class="`wf-pt-20`"
            :product="mapReturnToProductModel(productCard, productTicket)"
            :delivery-status="mapReturnOrderDeliveryStatus(productCard.ticketOrderStatus as MyPageStatusDeliveryOrder)"
            :show-text-return="false"
            :show-button-status-delivery="false"
            :show-button-return-request="false"
            :show-button-detail-return="false"
            :index="indexProductCard"
            :order-name="product.ordererName"
            :sender-message="product.senderMessage"
            :phoneNumber="productCard.receiverPhoneNumber"
            :receiverName="productCard.receiverName"
          />
        </div>
      </div>
      <OrderGroupOrderPriceECoupon
        v-if="product?.orderPaymentResponse"
        :order-amount="product?.orderPaymentResponse.lastOrderAmount"
        :totalProductAmount="product?.orderPaymentResponse.totalProductAmount"
        :orderDeliveryAmount="product?.orderPaymentResponse.orderDeliveryAmount"
        :immediatelyDiscountAmount="product?.orderPaymentResponse.immediatelyDiscountAmount"
        :couponDiscountAmount="product?.orderPaymentResponse.couponDiscountAmount"
        :welfarePointPaymentAmount="product?.orderPaymentResponse.welfarePointPaymentAmount"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/_welfare-mypage-cancel-exchange-return-inquiry.scss');
</style>
