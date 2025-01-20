<!-- FO_MC_IT012010, FO_MC_IT011041P -->
<script setup lang="ts">
import WelfareTitleTextStickyTop from '@/components/widgets/common/WelfareTitleTextStickyTop.vue'
import IconPointer from '@/components/icons/IconPointer.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/zoom'
const props = defineProps<{ imageLink: string, openImage: () => void }>()
</script>

<template>
  <div>
    <WelfareTitleTextStickyTop class="wf-title-cancel-exchange-return-inquiry" :title="`상품상세정보 확대보기`" display-close-icon @on-click-close="openImage" />
    <div class="wf-sticky-61 wf_height-50 wf_flex wf_justify-center wf-bg--g-f-5-f-6-fa wf_items-center">
      <div class="wf_flex wf_items-center wf-space-x-5">
        <IconPointer />
        <span class="wf-font_17--bold">이미지를 <span class="wf-color--f-95729">확대</span>하여 볼 수 있습니다.</span>
      </div>
    </div>
      <Swiper
        :zoom="true"
        :modules="[Zoom]"
        :navigation="false"
        class="wf_height-full wf-product-detail-enlarge-image"
      >
        <SwiperSlide>
          <div :class="`swiper-zoom-container wf_height-full wf_flex wf_items-center`">
            <div class="wf-item-product-parent">
              <img class="wf-item-product-image" :src="props.imageLink" alt="media product" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/commons/_welfare-swiper.scss');
</style>