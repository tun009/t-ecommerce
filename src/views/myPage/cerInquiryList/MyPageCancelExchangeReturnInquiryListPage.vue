<!-- FO_MC_MY016101, FO_MC_MY016102 -->
<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useMyPageCERInquiryList } from '@/composables/myPage/useMyPageCERInquiryList'
import IconFilter from '@/components/icons/IconFilter.vue'
import IconBill from '@/components/icons/IconBill.vue'
import MyPageOrderChooseMonthFilter from '@/components/myPage/common/MyPageOrderChooseMonthFilter.vue'
import { MyPageStatusDeliveryOrder } from '@/models/views/myPage/MyPageMainMemberModel'
import MyPageProductCancelExchangeReturnWrap from '@/components/myPage/common/MyPageProductCancelExchangeReturnWrap.vue'
import { formatTimeWithDot } from '@/commons'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import LoadingComponent from '@/components/layout/LoadingComponent.vue'
import WelfareButtonFull from '@/components/uikit/button/WelfareButtonFull.vue'
import MyPageOrderECouponShortInfo from '@/components/myPage/common/MyPageOrderECouponShortInfo.vue'

const {
  products,
  isShowCalendar,
  mapReturnToProductModel,
  mapReturnOrderDeliveryStatus,
  isShowButtonReturnRequest,
  isLoading,
  loadMore,
  hasMore,
  getDataCalendar
} = useMyPageCERInquiryList()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop
      class="wf-title-cancel-exchange-return-inquiry"
      :title="$t('myPage.inquiryList.title')"
      display-back-icon
      display-cart-icon
      display-search-icon
    />
    <div v-if="!isShowCalendar" class="wf_width-full wf_height-40 wf-px-16 wf-py-10 wf_flex wf_justify-end wf-bg--g-f-5-f-5-f">
      <button @click="isShowCalendar = true">
        <IconFilter />
      </button>
    </div>
    <MyPageOrderChooseMonthFilter @save="getDataCalendar" @close="isShowCalendar = false" v-else />
    <div class="wf-relative wf-px-16" v-if="products.length > 0">
      <div v-for="(orderProduct, index) in products" v-bind:key="index">
        <MyPageOrderECouponShortInfo
          :order-date="formatTimeWithDot(orderProduct.createdDatetime)"
          :order-number="orderProduct.orderKey.toString()"
          :fz-oder-date="true"
          address="홍길동  서울 마포구 상암산로 34"
        />
        <div class="wf-py-10" v-for="(productResponse) in orderProduct.orderProductResponses" :key="productResponse.productOrderKey">
          <MyPageProductCancelExchangeReturnWrap
            v-for="(productCard, indexProductCard) in productResponse.orderDeliveryResponses"
            v-bind:key="productCard.receiverProductOrderKey"
            :class="`wf-py-20 ${
              indexProductCard !== productResponse.orderDeliveryResponses.length - 1 ? 'wf-br-b-1 wf-br--g-e-7' : ''
            }`"
            :product="mapReturnToProductModel(productCard, productResponse)"
            :delivery-status="mapReturnOrderDeliveryStatus(productCard.ticketOrderStatus as MyPageStatusDeliveryOrder)"
            :show-text-return="false"
            :show-button-status-delivery="false"
            :show-button-return-request="isShowButtonReturnRequest(productCard.ticketOrderStatus as MyPageStatusDeliveryOrder)"
            :show-button-detail-return="false"
          />
        </div>
        <WelfareLineHorizontal v-if="products.length - 1 !== index" />
      </div>
      <div class="wf-py-20">
        <WelfareButtonFull :type="'md'" v-if="hasMore" :text="$t('myPage.inquiryList.buttonLoadMore')" @click="loadMore" />
      </div>
    </div>
    <div class="wf-relative" v-else-if="products.length === 0 && !isLoading">
      <div class="wf-px-16">
        <div class="wf-py-140 wf-mt-20 wf_flex wf_flex-col wf_justify-center wf_items-center wf-space-y-22">
          <IconBill />
          <span class="wf-color--g-333 wf-font_15--reg">{{ $t('myPage.inquiryList.noInquiry') }}</span>
        </div>
      </div>
    </div>
  </div>
  <LoadingComponent :loading="isLoading" />
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/_welfare-mypage-cancel-exchange-return-inquiry.scss');
</style>
