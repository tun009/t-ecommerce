<script setup lang="ts">
import { ProductDetail1 } from '@/assets/images'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import WelfareViewPriceProduct from '../product/WelfareViewPriceProduct.vue'
</script>
<template>
  <div class="wf-relative">
    <div class="wf_height-216 wf_width-full wf-relative">
      <Swiper
        :pagination="{
          clickable: true
        }"
        :modules="[Pagination]"
      >
        <SwiperSlide v-for="(item, index) in [1, 2, 3, 4]" :key="index">
          <div class="wf-p-20 wf_flex wf_justify-between wf-bg--e8 wf_height-216">
            <div class="wf_max-width-150 wf-mt-8">
              <p class="wf-font_15-mid--lh140 wf-color--g-fff line-clamp-2">[일일특가][엄마밥상] 인기 국탕 3종 (택2)(택2)(택2)...</p>
              <div class="wf-mt--4">
                <WelfareViewPriceProduct
                  class="wf-space-y-3--i wf-space-x-7--i"
                  class-percent="wf-color--g-fff"
                  class-price="wf-color--g-fff wf-br--white  wf-font_13--reg"
                  class-price-promotion="wf-color--g-fff"
                  :percent="99"
                  :price="99999999"
                  :price-promotion="99999999"
                  type="sm"
                />
              </div>
              <button class="wf-px-15 wf-mt-15 wf_width-72 wf-py-10 wf-font_13--semi wf-btn-banner wf-color--g-555 wf-bg--white wf_border-radius-17">
                구매하기
              </button>
            </div>
            <div class="wf_width-150 wf_height-150 wf-box-circle">
              <img alt="" :src="ProductDetail1" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/commons/_welfare-swiper.scss');
</style>
