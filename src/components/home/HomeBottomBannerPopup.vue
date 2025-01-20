<!-- FO_MC_MA011200 -->
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useHomeBottomBannerPopup } from '@/composables/home/useHomeBottomBannerPopup'
import WelfareButtonLine from '../uikit/button/WelfareButtonLine.vue'
import { openWindowWithNewTab } from '@/commons'
import IconArrowRightBanner from '../icons/IconArrowRight.vue'
import { HomePopupAttributeType, HomeBottomBannerModal, HomeNonDisplayPeriodType } from '@/models/services/responses/home/HomeBottomBannerResponse'
import { BaseModalEmits } from '@/models/widgets/modal'

interface HomeBottomBannerPopupProps {
  items: HomeBottomBannerModal[]
}

const props = defineProps<HomeBottomBannerPopupProps>()
const emits = defineEmits<BaseModalEmits>()

const { items, nonDisplayPeriod, btnTextNonDisplayPeriod, handleClickDisappear, sameKeyItems, showKey } = useHomeBottomBannerPopup(props.items, emits)
</script>
<template>
  <div
    class="wf_modal-bottom-banner wf-bg--g-fff wf-pb-19 wf_width-modal wf_flex wf_flex-col wf_height-full wf_justify-between wf_width-full wf_height-full"
  >
    <div class="">
      <Swiper :loop="items.length > 1" :pagination="{ clickable: true }" :modules="[Pagination]">
        <SwiperSlide v-for="(item, index) in sameKeyItems" :key="index">
          <div class="wf_height-317 wf_width-full wf_relative wf-bg--image-F8FAF9">
            <div class="wf_absolute wf-top-33 wf_max-width-188 wf-ml-27 wf-mr-27" v-if="HomePopupAttributeType.imageText == item.popupAttributeType">
              <span class="wf-font_15--mid wf-color--f-95729" v-if="item.subTitleContents">{{ item.subTitleContents }}</span>
              <div class="wf_flex wf_items-center wf-space-x-8-5 wf-mt-7" v-if="item.mainTitleContents">
                <span class="wf-font_23--bold wf-color--g-111 wf_line-height-25-5">{{ item.mainTitleContents }}</span>
                <IconArrowRightBanner class="wf_flex-shrink-0" />
              </div>
            </div>
            <img
              class="wf_image--cover wf_height-full wf_width-full"
              :src="item.imageUrl"
              :alt="item.imageAltName ?? ''"
              @click="item.linkUrl && openWindowWithNewTab(item.linkUrl)"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="wf_flex wf-space-x-6 wf-px-16 wf-mt-4" :key="showKey">
      <WelfareButtonLine
        v-if="nonDisplayPeriod != HomeNonDisplayPeriodType.UNUSED"
        @click="() => handleClickDisappear()"
        class="wf_flex-1"
        type="lg"
        lg-state="grey-line"
        :text="btnTextNonDisplayPeriod"
      />
      <WelfareButtonLine
        @click.prevent="() => handleClickDisappear(false)"
        class="wf_flex-1"
        type="lg"
        lg-state="default"
        :text="$t(`homeBannerBottom.btnClose`)"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/products/detail/_welfare-product-detail-view-detail-review-modal.scss');
</style>

<!-- using :has => It's not effect to others css -->
<style>
@import url('@/assets/styles/views/home/_welfare-home-banner-bottom.scss');
</style>
