<!-- FO_MC_MY022001, FO_MC_MY021001, FO_MC_MY022002, FO_MC_MY021002, FO_MC_MY020001, FO_MC_MY020002 -->
<script setup lang="ts">
import {DEFAULT_DATE_FORMAT_DASH, formatNumberDot, formatTime, formatTimeWithDot} from '@/commons'
import MyPageWelfarePointCouponItem from '@/components/myPage/bank/MyPageWelfarePointCouponItem.vue'
import MyPageWelfarePointCouponTitle from '@/components/myPage/bank/MyPageWelfarePointCouponTitle.vue'
import MyPageWelfarePointItem from '@/components/myPage/bank/MyPageWelfarePointItem.vue'
import MyPageWelfarePointItemsEmpty from '@/components/myPage/bank/MyPageWelfarePointItemsEmpty.vue'
import MyPageWelfarePointTitle from '@/components/myPage/bank/MyPageWelfarePointTitle.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareBox from '@/components/widgets/common/WelfareBox.vue'
import WelfareLineHorizontal from '@/components/widgets/common/WelfareLineHorizontal.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import {useMyPageShoppingAccountWelfarePoint} from '@/composables/myPage/bank/useMyPageShoppingAccountWelfarePoint'
import {
  MyPageCouponBenefitType,
  MyPageWelfarePointTypeEnum,
  myPageRewardPointDateRangeOptions
} from '@/models/views/myPage/MyPageShoppingAccountWelfarePoint'

const {
  type,
  title,
  emptyItemsText,
  introduce,
  introduceTitle,
  searchType,
  couponSortType,
  reserves,
  reservesItems,
  welfarePoints,
  welfarePointsItems,
  couponsItems
} = useMyPageShoppingAccountWelfarePoint()
</script>

<template>
  <WelfareTitleTextStickyTop displayBackIcon :title="title" class="wf-px-20--i"/>
  <WelfareBox v-if="type === MyPageWelfarePointTypeEnum.Reserves">
    <div class="wf_flex wf_flex-col wf-space-y-6 wf-mt-1">
      <MyPageWelfarePointTitle
          :title="$t('myPage.welfarePoints.availablePointReserves')"
          :value="formatNumberDot(reserves?.usableRewardPoints ?? 0)"
          :unit="$t('common.won')"
      />
      <MyPageWelfarePointTitle
          :title="$t('myPage.welfarePoints.expiringRewardPointsForThisMonth')"
          :value="formatNumberDot(reserves?.extinctionAmount ?? 0)"
          :unit="$t('common.won')"
          normal
      />
    </div>
  </WelfareBox>
  <WelfareBox v-if="type === MyPageWelfarePointTypeEnum.WelfarePoints">
    <div class="wf_flex wf_flex-col wf-space-y-6 wf-mt-1">
      <MyPageWelfarePointTitle
          :title="$t('myPage.welfarePoints.availablePoints')"
          :value="`${formatNumberDot(welfarePoints?.pointBalance ?? 0)}P`"
          :unit="''"
      />
      <MyPageWelfarePointTitle
          :title="`${$t('myPage.welfarePoints.deductionPoints')} &nbsp; ${formatNumberDot(welfarePoints?.deductionPoint ?? 0)}P`"
          :subTitle="` &nbsp;(${$t('myPage.welfarePoints.totalPointsPaid')} : ${formatNumberDot(welfarePoints?.totalPointAmount ?? 0)}P)`"
          normal
      />
    </div>
  </WelfareBox>
  <template v-if="type !== MyPageWelfarePointTypeEnum.Coupon">
    <WelfareLineHorizontal/>
    <div class="wf_flex wf_flex-col wf-space-y-10 wf-pt-20 wf-px-16">
      <WelfareSelect class="wf_height-41" :options="myPageRewardPointDateRangeOptions" option-label="label"
                     v-model="searchType"/>
      <div class="">
        <MyPageWelfarePointItemsEmpty
            :title="emptyItemsText"
            v-if="
            (welfarePointsItems.length == 0 && type === MyPageWelfarePointTypeEnum.WelfarePoints) ||
            (reservesItems.length == 0 && type === MyPageWelfarePointTypeEnum.Reserves)
          "
            class="wf-pb-7"
            :class="type === MyPageWelfarePointTypeEnum.Reserves ? 'wf_min-height-346 ' : 'wf_min-height-406'"
        />
        <div class="" v-else>
          <div v-if="type === MyPageWelfarePointTypeEnum.Reserves">
            <MyPageWelfarePointItem
                :topText="formatTimeWithDot(reservesItem.date ?? '')"
                :title="reservesItem.rewardPointName ?? ''"
                :amount="reservesItem.rewardPoint ?? 0"
                :unit="$t('common.won')"
                :note="
                reservesItem.validStartDate && reservesItem.validEndDate
                  ? `${$t('myPage.welfarePoints.expirationPeriod')} : ${formatTimeWithDot(reservesItem.validStartDate)}~${formatTimeWithDot(
                      reservesItem.validEndDate
                    )}`
                  : ''
              "
                :is-use="(reservesItem.rewardPoint ?? 0) < 0"
                v-for="(reservesItem, index) in reservesItems"
                v-bind:key="index"
            />
          </div>
          <div v-if="type === MyPageWelfarePointTypeEnum.WelfarePoints" class="wf-mt--11">
            <MyPageWelfarePointItem
                :topText="welfarePointsItem.useTypeName ?? ''"
                :title="welfarePointsItem.useName ?? ''"
                :amount="welfarePointsItem.pointAmount ?? 0"
                :unit="'P'"
                :note="formatTimeWithDot(welfarePointsItem.processDate ?? '')"
                :is-use="(welfarePointsItem.pointAmount ?? 0) < 0"
                :topTextNote="
                welfarePointsItem.useValidDate?.startDate && welfarePointsItem.useValidDate?.endDate
                  ? `${$t('myPage.welfarePoints.expirationPeriod')} : ${formatTimeWithDot(
                      welfarePointsItem.useValidDate?.startDate
                    )}~${formatTimeWithDot(welfarePointsItem.useValidDate?.endDate)}`
                  : ''
              "
                hideTag
                v-for="(welfarePointsItem, index) in welfarePointsItems"
                v-bind:key="index"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  <div v-else class="wf_flex wf_flex-col wf-space-y-20 wf-px-16 wf-pt-18">
    <div class="wf-br-b-1 wf-br--g-e-7" :class="couponsItems.length === 0 ? 'wf-pb-17 ' : 'wf-pb-13'">
      <MyPageWelfarePointCouponTitle :value="couponsItems.length" :sortType="couponSortType"
                                     @changeType="(type) => (couponSortType = type)"/>
    </div>
    <MyPageWelfarePointItemsEmpty :title="emptyItemsText" v-if="couponsItems.length === 0"
                                  class="wf_min-height-335 wf-pb-19"/>
    <div class="wf_flex wf_flex-col wf-space-y-15 wf-br-b-1 wf-br--g-e-7 wf-pb-19" v-else>
      <MyPageWelfarePointCouponItem
          :title="couponsItem.couponName ?? ''"
          :amount="formatNumberDot(couponsItem.couponBenefitType === MyPageCouponBenefitType.PERCENT ? couponsItem.benefitValue :couponsItem.maxDiscountAmount ?? 0)"
          :unit="
          couponsItem.couponBenefitType === MyPageCouponBenefitType.PERCENT
            ? ` % ${$t('myPage.welfarePoints.discount')}`
            : ` ${$t('myPage.welfarePoints.wonDiscount')}`
        "
          :note="couponsItem.couponBenefitType === MyPageCouponBenefitType.FIXED ? `${formatNumberDot(couponsItem.minOrderAmount ?? 0)} ${$t('myPage.welfarePoints.noteDiscountFIX')}`
          : `${formatNumberDot(couponsItem.minOrderAmount ?? 0)}&nbsp;${$t('myPage.welfarePoints.noteDiscountPER')}&nbsp;${formatNumberDot(couponsItem.maxDiscountAmount ?? 0)}&nbsp;원` "
          :time-left="`${formatTime(couponsItem.validToDate ?? '', DEFAULT_DATE_FORMAT_DASH)}&nbsp;${$t('myPage.welfarePoints.getto')}`"
          :time-right="`${(couponsItem.remainingDays ?? 0) > 0 && couponsItem.remainingDays + `${$t('myPage.welfarePoints.day')}&nbsp;`} ${
          (couponsItem.remainingHours ?? 0) > 0 && couponsItem.remainingHours + `${$t('myPage.welfarePoints.timeLeft')}`
        }`"
          :tag="`${couponsItem.quantity ?? 0} ${$t('myPage.main.couponCount')}`"
          v-for="(couponsItem, index) in couponsItems"
          v-bind:key="index"
      />
    </div>
  </div>

  <div class="wf-pt-21 wf-px-16 wf-pb-40 wf_flex wf_flex-col wf-space-y-13">
    <span class="wf-font_15--semi wf_letter-spacing--1 wf-color--g-333">{{ introduceTitle }}</span>
    <p class="wf_flex wf_items-start wf-font_13--reg wf-color--g-555 wf-ml--3" v-for="(text, index) in introduce"
       v-bind:key="index">
      <span class="wf-mr-4 wf-color--g-bbb wf-mt--1">&#x2022;</span>
      <span :class="type === MyPageWelfarePointTypeEnum.Reserves ? 'wf_line-height-15-8' : 'wf_line-height-16-6'"
            v-html="text"/>
    </p>
  </div>
</template>
