<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'

interface Props {
  data: WelfareUnitProductModel[]
  title: string
}

const props = defineProps<Props>()
</script>
<template>
  <div class="wf-relative">
    <p class="wf-font_17--bold wf-color--g-111 wf-mb-20">{{ title }}</p>
    <div class="wf_width-full wf-relative">
      <Swiper
        :loop="true"
        :free-mode="true"
        :scrollbar="true"
        :space-between="10"
        direction="horizontal"
        slides-per-view="auto"
        :modules="[FreeMode]"
      >
        <SwiperSlide class="wf_width-auto" v-for="(item, index) in props.data" :key="index">
          <WelfareProductItem is-cart is-heart is-coupon class="wf_width-140 wf-space-x-12" type="sm" :data="item" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
