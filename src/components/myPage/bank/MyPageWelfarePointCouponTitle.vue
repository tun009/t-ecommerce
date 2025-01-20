<script setup lang="ts">
import { MyPageCouponSortType } from '@/models/views/myPage/MyPageShoppingAccountWelfarePoint'

interface MyPageWelfarePointCouponTitleProps {
  value: number
  sortType: MyPageCouponSortType
}

type MyPageWelfarePointCouponTitleEmits = (e: 'changeType', type: MyPageCouponSortType) => void
defineProps<MyPageWelfarePointCouponTitleProps>()
defineEmits<MyPageWelfarePointCouponTitleEmits>()
</script>

<template>
  <div class="wf_flex wf_items-center wf_justify-between">
    <div class="">
      <span class="wf-color--g-333 wf-font_15--reg">보유쿠폰 </span>
      <span class="wf-color--red-ff-3-b-4-f wf-font_15--semi">{{ $props.value }}장</span>
    </div>
    <div class="wf_flex wf_items-center wf-space-x-10 wf-color--g-555">
      <span
        class="wf-pointer"
        :class="$props.sortType === MyPageCouponSortType.NEWEST ? 'wf-font_15--bold wf_letter-spacing--1' : 'wf-font_15--reg'"
        @click="$emit('changeType', MyPageCouponSortType.NEWEST)"
        >최신 다운로드 순</span
      >
      <span class="wf-color--g-ddd">|</span>
      <span
        class="wf-pointer"
        :class="$props.sortType === MyPageCouponSortType.DEADLINE ? 'wf-font_15--bold wf_letter-spacing--1' : 'wf-font_15--reg'"
        @click="$emit('changeType', MyPageCouponSortType.DEADLINE)"
        >마감임박순</span
      >
    </div>
  </div>
</template>
