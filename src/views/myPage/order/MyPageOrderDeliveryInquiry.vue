<!-- FO_MC_MY011001  -->
<script setup lang="ts">
import { DEFAULT_DATE_FORMAT_DOT, formatTime } from '@/commons'
import IconBill from '@/components/icons/IconBill.vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import MyPageOrderChooseMonthFilter from '@/components/myPage/common/MyPageOrderChooseMonthFilter.vue'
import MyPageOrderShortInfo from '@/components/myPage/common/MyPageOrderShortInfo.vue'
import MyPageSyntheticProductOrder from '@/components/myPage/common/MyPageSyntheticProductOrder.vue'
import WelfareButtonFull from '@/components/uikit/button/WelfareButtonFull.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useMyPageOrderDeliveryInquiry } from '@/composables/myPage/useMyPageOrderDeliveryInquiry'
import { MyPageStatusDeliveryOrder } from '@/models/views/myPage/MyPageMainMemberModel'

const {
  product,
  isShowCalendar,
  isMember,
  getDataCalendar,
  handleLoadMore,
  hasMore,
  isLoading,
  redirectLinkToDetail,
  openModalComingSoon,
  redirectLinkToReviewProduct
} = useMyPageOrderDeliveryInquiry()
</script>

<template>
  <div class="wf-relative wf-order-delivery-inquiry">
    <WelfareTitleTextStickyTop
      :title="isMember ? $t('myPage.memberDelivery.title') : $t('myPage.order.title')"
      display-back-icon
      display-search-icon
      display-cart-icon
    />
    <div class="wf-relative">
      <div v-if="!isShowCalendar">
        <div class="wf_width-full wf_height-40 wf-px-16 wf-py-10 wf_flex wf_justify-end wf-bg--g-f-5-f-5-f">
          <button @click="isShowCalendar = true">
            <IconFilter />
          </button>
        </div>
        <div v-if="product.length > 0">
          <div v-for="(parent, index) in product" :key="index" class="wf-px-16 wf-pt-21">
            <MyPageOrderShortInfo
              :titleDelivery="parent?.ordererName ? parent?.ordererName : ''"
              fzOderDate
              :order-date="parent?.createdDatetime ? formatTime(parent?.createdDatetime, DEFAULT_DATE_FORMAT_DOT) : ''"
              :order-number="parent?.orderKey"
              :id-redirect="parent?.orderKey"
              @redirect-link-detail="(value) => redirectLinkToDetail(value, parent.orderKey)"
              :address="parent?.orderAddress"
            />
            <div>
              <MyPageSyntheticProductOrder
                v-for="(item, index) in parent.productChildArr"
                :class="`wf-py-20 wf-br-b-1 wf-br--g-e-7`"
                v-bind:key="index"
                :product="item"
                showButtonStatusDelivery
                :orderProcessStatus="item.deliveryStatus as MyPageStatusDeliveryOrder"
                :showTextReturn="item.finalOrderStatus"
                @click-exchange-request="openModalComingSoon"
                @click-button-status-delivery="openModalComingSoon"
                @click-return-request="openModalComingSoon"
                @click-with-draw-order="openModalComingSoon"
                @click-write-product-review="redirectLinkToReviewProduct(item.productKey, item.productOrderKey)"
              />
            </div>
            <WelfareLineHorizontal v-if="product.length - 1 !== index" />
          </div>
        </div>
        <div class="wf-py-20" v-if="hasMore">
          <WelfareButtonFull :type="'md'" :text="$t('myPage.inquiryList.buttonLoadMore')" @click="handleLoadMore" />
        </div>

        <div v-if="product.length === 0 && !isLoading" class="wf-py-140 wf_flex wf_flex-col wf_justify-center wf_items-center wf-space-y-21">
          <IconBill />
          <span class="wf-color--g-333 wf-font_15--reg">{{ $t('myPage.nonMemberShoppingInfo.orderDeliveryInquiry.noOrder') }}</span>
        </div>
      </div>
      <MyPageOrderChooseMonthFilter @save="getDataCalendar" @close="isShowCalendar = false" v-else />
    </div>
  </div>
  <LoadingComponent :loading="isLoading" />
</template>
<style scoped>
@import url('@/assets/styles/views/myPage/inquiry/_welfare-my-page-order-delivery-inquiry.scss');
</style>
