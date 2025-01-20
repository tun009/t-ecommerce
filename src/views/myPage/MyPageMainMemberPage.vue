<!-- FO_MC_MY001000 -->
<script setup lang="ts">
import {
  MYPAGE_WELFARE_POINTS,
  defaultColor,
  MYPAGE_WELFARE_POINTS_RESERVES,
  MYPAGE_EDIT_MEMBER_INFO,
  MYPAGE_SETTING,
  MYPAGE_NOTIFICATION,
  MYPAGE_BANK_WELFARE_POINTS,
  MYPAGE_DELIVERY_INQUIRY,
  MYPAGE_PRODUCT_REVIEW,
  MYPAGE_ORDER_DELIVERY_INQUIRY
} from '@/commons'
import IconArrowRightLink from '@/components/icons/IconArrowRightLink.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import IconNotice from '@/components/icons/myPage/IconNotice.vue'
import IconUser from '@/components/icons/myPage/IconUser.vue'
import IconSettingMyPage from '@/components/icons/myPage/IconSettingMyPage.vue'
import WelfareViewPrice from '@/components/uikit/product/WelfareViewPrice.vue'
import IconCoupon from '@/components/icons/myPage/IconCoupon.vue'
import MyPageCountGroup from '@/components/myPage/MyPageCountGroup.vue'
import IconDeliveryMyPage from '@/components/icons/myPage/IconDeliveryMyPage.vue'
import IconMessageMyPage from '@/components/icons/myPage/IconMessageMyPage.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import MyPageDeliveryStateCountGroup from '@/components/myPage/MyPageDeliveryStateCountGroup.vue'
import {useMyPageMainMember} from '@/composables/myPage/useMyPageMainMember'
import {useBuildLink} from '@/composables/common/useBuildLink'

const {listLinkRedirect, deliveryCountState, account, isApp} = useMyPageMainMember()
const {processLink} = useBuildLink()
</script>

<template>
  <div class="wf-relative">
    <WelfareTitleTextStickyTop :displayBackIcon="true" displayCartIcon displaySearchIcon
                               :title="$t('myPage.main.title')"/>
    <WelfareBox>
      <div class="wf_height-57 wf_flex wf_justify-between">
        <div class="wf_flex wf_justify-between wf_flex-col">
          <p class="wf-color--g-777 wf-font_15--semi">{{ account?.company?.customerName }}</p>
          <router-link :to="processLink(MYPAGE_EDIT_MEMBER_INFO)"
                       class="wf-font_23--bold wf_flex wf_items-center wf-space-x-13 wf-color--g-111"
          ><span>{{ account?.memberName }}</span
          ><span><IconArrowRightLink :height="12" :color="defaultColor.primary"/></span
          ></router-link>
        </div>
        <div class="wf_flex wf-mt-auto wf-space-x-5">
          <router-link v-if="isApp" :to="processLink(MYPAGE_NOTIFICATION)"
                       class="wf_button-action wf_myPage-hover-link">
            <button class="wf_button-action wf_myPage-hover-link ticket" data-count="N">
              <IconNotice/>
            </button>
          </router-link>
          <router-link :to="processLink(MYPAGE_EDIT_MEMBER_INFO)" class="wf_button-action wf_myPage-hover-link">
            <IconUser/>
          </router-link>
          <router-link :to="processLink(MYPAGE_SETTING)" class="wf_button-action wf_myPage-hover-link">
            <IconSettingMyPage/>
          </router-link>
        </div>
      </div>
      <div class="wf-mt-20 wf-br-t-1 wf-br-b-1 wf-br--g-e-7 wf-p-20 wf-bg--g-f-5-f-6-fa">
        <div class="wf_flex wf_justify-between">
          <!-- 복지포인트 -->
          <router-link :to="processLink(MYPAGE_WELFARE_POINTS)"
                       class="wf_flex wf_flex-col wf_items-center wf_min-width-110">
            <span class="wf-font_15--reg wf-color--g-333 wf-mb-10">{{
                $t('myPage.orderDetail.refundPrice.welfarePoints')
              }}</span>
            <WelfareViewPrice :price="account?.pointBalance || 0" classPrice="wf-font_21--bold"/>
          </router-link>
          <!-- 적립금 -->
          <router-link :to="processLink(MYPAGE_WELFARE_POINTS_RESERVES)"
                       class="wf_flex wf_flex-col wf_items-center wf_min-width-110">
            <span class="wf-font_15--reg wf-color--g-333 wf-mb-10 wf-ml-9">{{
                $t('myPage.orderDetail.refundPrice.reserves')
              }}</span>
            <WelfareViewPrice :price="account?.rewardPointBalance || 0" classPrice="wf-font_21--bold wf-ml-9"/>
          </router-link>
        </div>
        <div class="wf-mt-20 wf_flex wf_justify-between wf-pt-10">
          <div class="wf-br-r-1 wf-pr-17 wf-br--g-e-7">
            <MyPageCountGroup
                :path="MYPAGE_BANK_WELFARE_POINTS"
                :icon="IconCoupon"
                title="myPage.main.couponTitle"
                :count="deliveryCountState?.couponCount ?? '0'"
                textCount="myPage.main.couponCount"
            />
          </div>
          <div class="wf-br-r-1 wf-br--g-e-7 wf-pr-17">
            <MyPageCountGroup
                :path="MYPAGE_DELIVERY_INQUIRY"
                :icon="IconDeliveryMyPage"
                title="myPage.main.deliveryTitle"
                :count="deliveryCountState?.inTransitCount ?? '0'"
                textCount="myPage.main.deliveryCount"
            />
          </div>
          <div class="">
            <MyPageCountGroup
                :path="MYPAGE_PRODUCT_REVIEW"
                :icon="IconMessageMyPage"
                title="myPage.main.messageTitle"
                :count="deliveryCountState?.reviewCount ?? '0'"
                textCount="myPage.main.deliveryCount"
            />
          </div>
        </div>
      </div>
    </WelfareBox>
    <WelfareLineHorizontal/>
    <WelfareBox :isPaddingVertical="false" class="wf-py-30">
      <router-link :to="processLink(MYPAGE_ORDER_DELIVERY_INQUIRY)"
                   class="wf-font_19--bold wf_flex wf_items-center wf-space-x-10 wf-color--g-111"
      ><span>{{ $t('myPage.main.stateDelivery.orderStatus') }}</span><span><IconArrowRightLink :height="12"
                                                                                               :color="defaultColor.primary"/></span
      ></router-link>
      <div class="wf_flex wf-mt-26">
        <MyPageDeliveryStateCountGroup
            :path="MYPAGE_ORDER_DELIVERY_INQUIRY"
            :count="deliveryCountState?.paymentCompletedCount ?? '0'"
            textCount="myPage.main.stateDelivery.completePayment"
        />
        <MyPageDeliveryStateCountGroup
            :path="MYPAGE_ORDER_DELIVERY_INQUIRY"
            :count="deliveryCountState?.productPreparationCount ?? '0'"
            textCount="myPage.main.stateDelivery.preparingProduct"
        />
        <MyPageDeliveryStateCountGroup
            :path="MYPAGE_ORDER_DELIVERY_INQUIRY"
            :count="deliveryCountState?.inTransitCount ?? '0'"
                                       textCount="myPage.main.stateDelivery.shipping"/>
        <MyPageDeliveryStateCountGroup
            :path="MYPAGE_ORDER_DELIVERY_INQUIRY"
            :count="deliveryCountState?.deliveryCompletedCount ?? '0'"
            :isShowArrow="false"
            textCount="myPage.main.stateDelivery.deliveryCompleted"
        />
      </div>
    </WelfareBox>
    <div class="wf-mb-40">
      <router-link
          v-for="(item, index) in listLinkRedirect"
          :to="item.path || ''"
          :key="index"
          class="wf_myPage-hover-link wf_block wf-br-t-1 wf-br--g-e-7 wf-px-16 wf-py-17"
      >
        <div class="wf_flex wf_justify-between wf_items-center wf_height-15">
          <span class="wf-font_15--mid wf-color--g-333">{{ $t(item.name) }}</span>
          <span>
            <IconArrowRight/>
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/_welfare-my-page-main-member.scss');
</style>
