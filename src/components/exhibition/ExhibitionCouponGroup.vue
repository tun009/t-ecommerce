<script lang="ts" setup>
import { IcDownload } from '@/assets/icons'
import WelfareBannerImage from '../uikit/banner/WelfareBannerImage.vue'
import {
  ExhibitionCouponModel,
  ExhibitionFormTypeEnum,
  ExhibitionMarketingInformationModel
} from '@/models/views/exhibition/ExhibitionDetailGroupModel'

interface ExhibitionCouponGroupProps {
  information: ExhibitionMarketingInformationModel
  categoryType: ExhibitionFormTypeEnum
  couponList: ExhibitionCouponModel[]
}

interface ExhibitionCouponGroupEmits {
  (e: 'downloadCoupon', couponKey: number): void
}

defineProps<ExhibitionCouponGroupProps>()
defineEmits<ExhibitionCouponGroupEmits>()
</script>

<template>
  <div class="wf_flex wf_flex-col wf-py-20 wf-px-16 wf-space-y-12">
    <div
      v-for="(item, index) in couponList"
      :key="index"
      class="wf-exhibition-coupon-wrapper wf-br--111 wf-br-1 wf-width-full wf_height-90 wf_flex wf_justify-between"
    >
      <div class="wf-py-25 wf-px-19 wf_flex wf_flex-col wf-space-y-9">
        <span class="wf-font_17--bold wf-color--g-111">{{ $props.information.marketingCouponMainTitleName }}</span>
        <span class="wf-font_13--reg wf-color--g-111">{{ $props.information.marketingCouponSubTitleName }}</span>
      </div>
      <div class="wf_width-96 wf_flex wf-pointer" @click="() => $emit('downloadCoupon', item.couponKey)">
        <div class="wf_border-dashed wf-br-l-2 wf_height-full wf-br--gray-E3"></div>
        <div class="wf_width-94 wf-bg--orange-05 wf_height-full wf-px-25 wf-py-19">
          <div class="wf_flex wf_flex-col wf_items-center wf-space-y-10">
            <img :src="IcDownload" class="wf_width-20" />
            <span class="wf-font_13--reg wf-color--f-95729 wf-ml--2">{{ $t('exhibition.bannerGroupInfo.getCoupon') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="wf-exhibition-coupon-banner-wrapper">
      <WelfareBannerImage :images="[$props.information.s3MarketingImageFullUrl]" :hideAmount="false" classMediaControl="wf_height-20" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/exhibition/_welfare-exhibition-detail-general.scss');
</style>
