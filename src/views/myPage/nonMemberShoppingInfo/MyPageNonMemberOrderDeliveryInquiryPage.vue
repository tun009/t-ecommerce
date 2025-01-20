<script setup lang="ts">
import IconBill from '@/components/icons/IconBill.vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import MyPageOrderChooseMonthFilter from '@/components/myPage/common/MyPageOrderChooseMonthFilter.vue'
import MyPageOrderShortInfo from '@/components/myPage/common/MyPageOrderShortInfo.vue'
import MyPageProductOrderWrap from '@/components/myPage/common/MyPageProductOrderWrap.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useMyPageNonMemberOrderDeliveryInquiry } from '@/composables/myPage/nonMemberShoppingInfo/useMyPageNonMemberOrderDeliveryInquiry'

const { product, isShowCalendar, isMember } = useMyPageNonMemberOrderDeliveryInquiry()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop
      :title="isMember ? $t('myPage.memberDelivery.title') : $t('myPage.nonMemberShoppingInfo.orderDeliveryInquiry.title')"
      display-back-icon
      :display-search-icon="isMember"
      :display-cart-icon="isMember"
    />
    <div class="wf-relative">
      <div v-if="!isShowCalendar">
        <div class="wf_width-full wf_height-40 wf-px-16 wf-py-10 wf_flex wf_justify-end wf-bg--g-f-5-f-5-f">
          <button @click="isShowCalendar = true">
            <IconFilter />
          </button>
        </div>

        <div class="wf-px-16">
          <MyPageOrderShortInfo order-date="2023.11.15" order-number="12345678912345" address="홍길동  서울 마포구 상암산로 34" />
          <MyPageProductOrderWrap
            :class="`wf-py-20 wf-br-b-1 wf-br--g-e-7`"
            :product="product"
            delivery-status="배송완료"
            :show-button-status-delivery="true"
            show-button-change-options
            show-button-return-request
          />

          <MyPageProductOrderWrap
            :class="`wf-py-20`"
            :product="product"
            delivery-status="출고지시"
            show-button-change-options
            show-button-return-request
          />
        </div>

        <WelfareLineHorizontal />

        <div class="wf-py-140 wf_flex wf_flex-col wf_justify-center wf_items-center wf-space-y-21">
          <IconBill />
          <span class="wf-color--g-333 wf-font_15--reg">{{ $t('myPage.nonMemberShoppingInfo.orderDeliveryInquiry.noOrder') }}</span>
        </div>
      </div>
      <MyPageOrderChooseMonthFilter @close="isShowCalendar = false" v-else />
    </div>
  </div>
</template>
