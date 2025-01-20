<script setup lang="ts">
import 'swiper/css'
import {
  ExhibitionInformationModel,
  ExhibitionMarketingInformationModel,
  ExhibitionRepresentativeTypeEnum
} from '@/models/views/exhibition/ExhibitionDetailGroupModel'
import { ref } from 'vue'
import IconArrowDown from '../icons/IconArrowDown.vue'
import ProductDetailEnlargeVideo from '../products/detail/common/ProductDetailEnlargeVideo.vue'
import WelfareBannerImage from '../uikit/banner/WelfareBannerImage.vue'
import WelfareExpander from '../widgets/common/WelfareExpander.vue'
import WelfareLineHorizontalCustom from '../widgets/common/WelfareLineHorizontalCustom.vue'
import ExhibitionInformationTitle from './ExhibitionInformationTitle.vue'
import { SwiperSlide, Swiper } from 'swiper/vue'
import { convertLinkYoutube } from '@/commons'
import { YesNoEnum } from '@/models/common'

interface ExhibitionBannerGroupInformationProps {
  information: ExhibitionInformationModel
  marketingInformation: ExhibitionMarketingInformationModel
}

defineProps<ExhibitionBannerGroupInformationProps>()
const refExpander = ref()
</script>
<template>
  <div class="wf-exhibition-banner-group-information">
    <div class="wf-px-16 wf-pb-14 wf-pt-13">
      <div
        class="wf_flex wf_flex-col wf-space-y-10 wf-mb-20"
        v-if="marketingInformation.exhibitionRepresentativeType === ExhibitionRepresentativeTypeEnum.IMAGE_TEXT"
      >
        <p class="wf-font_19--mid">{{ information.mainTitleName1 }}</p>
        <p class="wf-font_17--reg">{{ information.mainTitleName2 }}</p>
      </div>
      <div class="wf_flex wf-space-x-10 wf-font_15--reg wf-color-grey-77">
        <span>{{ $t('exhibition.bannerGroupInfo.period') }}</span>
        <span>{{ $props.information.displayStartDate }} ~ {{ $props.information.displayEndDate }}</span>
      </div>
    </div>
    <Swiper
      :loop="false"
      :pagination="{ clickable: true }"
      v-if="marketingInformation.exhibitionRepresentativeType === ExhibitionRepresentativeTypeEnum.VOD"
    >
      <SwiperSlide>
        <div class="wf-relative wf-item-product-image wf-item-product">
          <iframe :src="convertLinkYoutube($props.information.youtubeUrl)" v-if="$props.information.youtubeUrl"></iframe>
          <ProductDetailEnlargeVideo v-else :video="$props.information.s3VideoFullUrl" :showTimeline="true" />
        </div>
      </SwiperSlide>
    </Swiper>
    <div
      v-html="$props.information.htmlContents"
      v-else-if="marketingInformation.exhibitionRepresentativeType === ExhibitionRepresentativeTypeEnum.HTML"
    ></div>
    <WelfareBannerImage v-else :images="[$props.information.s3ImageFullUrl]" />
    <WelfareExpander ref="refExpander" v-if="$props.information.mobileNoticeUseYn === YesNoEnum.Y">
      <template #button="{ isExpander }">
        <ExhibitionInformationTitle class="wf-px-16" @click="refExpander?.handleToggleExpander" title="exhibition.bannerGroupInfo.notificationTitle">
          <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
            <IconArrowDown />
          </div>
        </ExhibitionInformationTitle>
      </template>
      <div>
        <WelfareLineHorizontalCustom class="wf_height-1" />
        <div v-html="$props.information.noticeContents" class="wf-px-14 wf-py-21 wf-font_13--reg wf-color-grey-55"></div>
      </div>
    </WelfareExpander>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-view-detail-review-modal.scss');
</style>
