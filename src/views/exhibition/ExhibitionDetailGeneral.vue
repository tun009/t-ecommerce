<!-- FO_MC_PL022000 | FO_MC_PL023000 | FO_MC_PL025001 | FO_MC_PL025002 | FO_MC_PL026000 -->
<script setup lang="ts">
import ExhibitionBannerGroupInformation from '@/components/exhibition/ExhibitionBannerGroupInformation.vue'
import ExhibitionCouponGroup from '@/components/exhibition/ExhibitionCouponGroup.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import WelfareLineHorizontalCustom from '@/components/widgets/common/WelfareLineHorizontalCustom.vue'
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import { useExhibitionDetailGeneral } from '@/composables/exhibition/useExhibitionDetailGeneral'
import { YesNoEnum } from '@/models/common'
import { WelfareTabDataType } from '@/models/uikits/WelfareTabTypes'
import { ExhibitionFormTypeEnum } from '@/models/views/exhibition/ExhibitionDetailGroupModel'

const {
  categorySelectOptions,
  categoryTabOptions,
  categoryType,
  productList,
  handleChangeTab,
  defaultTab,
  exhibitionInformation,
  exhibitionMarketingInformation,
  handleShareSnsLink,
  handleDownloadCoupon,
  couponList,
  defaultSelect,
  productRef
} = useExhibitionDetailGeneral()
</script>
<template>
  <WelfareTitleTextStickyTop
    @on-click-share="handleShareSnsLink"
    smallTitle
    displayBackIcon
    displayShareIcon
    :title="exhibitionInformation.exhibitionName"
  />
  <div class="wf-exhibition-detail">
    <WelfareLineHorizontalCustom class="wf_height-1" />
    <ExhibitionBannerGroupInformation :information="exhibitionInformation" :marketingInformation="exhibitionMarketingInformation" />
    <WelfareLineHorizontalCustom class="wf_height-7" v-if="exhibitionInformation.mobileNoticeUseYn === YesNoEnum.Y" />
    <ExhibitionCouponGroup
      :couponList="couponList"
      :information="exhibitionMarketingInformation"
      @download-coupon="handleDownloadCoupon"
      :categoryType="categoryType"
    />
    <WelfareLineHorizontalCustom class="wf_height-7" />
    <div class="wf-pb-54" ref="productRef">
      <div class="wf-sticky-top wf-bg--g-fff wf_zIndex-1001 wf-pt-19">
        <div v-if="categoryType === ExhibitionFormTypeEnum.DROPDOWN" class="wf-px-16 wf-mb-16">
          <WelfareSelect
            optionLabel="label"
            v-model="defaultSelect"
            :options="categorySelectOptions"
            @update:model-value="(data) => handleChangeTab(data?.value)"
          />
        </div>
        <WelfareTab
          v-if="categoryType === ExhibitionFormTypeEnum.BUTTON"
          :items="categoryTabOptions"
          :default="defaultTab"
          @on-change="(item: WelfareTabDataType) => handleChangeTab(item.id)"
          type="round"
          name="main-header-around"
          class="wf-pb-16 wf-px-16"
        />
        <WelfareTab
          v-if="categoryType === ExhibitionFormTypeEnum.TAB"
          :items="categoryTabOptions"
          :default="defaultTab"
          @on-change="(item: WelfareTabDataType) => handleChangeTab(item.id)"
          type="line"
          name="main-header-navigation"
          class="wf-pt-8 wf-px-16"
        />
      </div>
      <div class="wf_grid wf-px-16 wf-pt-20 wf_grid-cols-2 wf-space-y-21 wf-space-x-9">
        <div v-for="(item, index) in productList" :key="index">
          <WelfareProductItem type="md" :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/exhibition/_welfare-exhibition-detail-general.scss');
</style>
