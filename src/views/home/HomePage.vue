<!-- FO_MC_MA011000, FO_MC_MA021000, FO_MC_MA021200, FO_MC_MA021300, FO_MC_MA031000, FO_MC_MA041000 -->

<script setup lang="ts">
import { ProductBannerImage } from '@/assets/images'
import HomeBannerProduct from '@/components/home/HomeBannerProduct.vue'
import HomeOrderToDay from '@/components/home/HomeOrderToDay.vue'
import HomeProductCategory from '@/components/home/HomeProductCategory.vue'
import HomeProductSpecialPrice from '@/components/home/HomeProductSpecialPrice.vue'
import WelfareBannerImage from '@/components/uikit/banner/WelfareBannerImage.vue'
import WelfareCarouselBanner from '@/components/uikit/carousel/WelfareCarouselBanner.vue'
import WelfareCarouselBannerTop from '@/components/uikit/carousel/WelfareCarouselBannerTop.vue'
import WelfareCarouselMultipleBanner from '@/components/uikit/carousel/WelfareCarouselMultipleBanner.vue'
import WelfareTab from '@/components/uikit/tabs/WelfareTab.vue'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import GroupBannerProduct from '@/components/widgets/GroupBannerProduct.vue'
import GroupProductNews from '@/components/widgets/GroupProductNews.vue'
import InfiniteLoadingData from '@/components/widgets/InfiniteLoadingData.vue'
import TitleRedirect from '@/components/widgets/TitleRedirect.vue'
import { useHomePage } from '@/composables/home/useHomePage'

interface HomepageProps {
  id: number
}

const props = defineProps<HomepageProps>()

const {
  dataTab,
  productMd,
  productNews,
  productOrder,
  load,
  data,
  imgBanner,
  dataCategory,
  productLg,
  productOrderToday,
  productLgLast,
  productSm,
  listBannerTop
} = useHomePage(props.id)
</script>

<template>
  <div class="wf-relative">
    <div class="wf-sticky wf-top-0 wf_flex wf_items-end wf-left-0 wf_banner-image-top wf-right-0">
      <div class="wf-carousel-banner-top">
        <WelfareCarouselBannerTop :data="listBannerTop" />
      </div>
    </div>
  </div>
  <div class="wf-relative wf_rounded-tl-16 wf-mt--12 wf_rounded-tr-16 wf-pb-40 wf-bg--white wf_zIndex-2">
    <div class="wf-pb-1">
      <div class="">
        <HomeProductCategory :data-category="dataCategory" />
      </div>
      <div class="wf_w-full wf-pb-39 wf-pt-28 wf-mt-10">
        <WelfareCarouselMultipleBanner />
      </div>
      <div class="wf-pb-36">
        <HomeProductSpecialPrice
          title="TODAY SALE"
          time="02:41:38"
          path-redirect="#"
          :product-lg="productLg?.productLg"
          :product-lg-last="productLgLast?.productLgLast"
        />
      </div>
      <div class="wf-pb-37">
        <GroupBannerProduct />
      </div>
      <div class="">
        <HomeOrderToDay
          :is-banner-image="true"
          :banner-image="ProductBannerImage"
          :title="$t('productSpecialPrice.fastDelivery')"
          path-redirect="#"
          :data="productOrder"
          :product-order-today="productOrderToday?.productOrderToday"
        />
      </div>
      <div class="wf_width-full wf-pt-36 wf-pl-16 wf-pb-40">
        <GroupProductNews :data="productNews" />
      </div>
      <div class="wf_width-full">
        <WelfareCarouselBanner />
      </div>
      <div class="wf_width-full wf-pt-35 wf-pb-20">
        <HomeOrderToDay
          classProduct="wf-mt--4"
          :is-banner-image="false"
          :banner-image="ProductBannerImage"
          :title="$t('productSpecialPrice.relatedProduct')"
          path-redirect="#"
          :data="productOrder"
          :productOrderToday="productOrderToday?.productOrderToday"
        />
      </div>
      <div class="wf_flex wf_items-center wf_justify-center wf-gap-10 wf-pt-19 wf-pb-20">
        <div class="wf_width-full wf-banner-1 wf_min-height-80-04">
          <WelfareBannerImage
            classMediaControl="wf_media_control-right"
            :allowSlideNext="true"
            :allowSlidePrev="true"
            :spaceBetWeen="10"
            :images="imgBanner"
            :hideAmount="false"
          />
        </div>
      </div>
      <div class="wf_width-full wf-pb-20 wf-pt-14">
        <HomeOrderToDay
          classProduct="wf-mt--4"
          :is-banner-image="false"
          :banner-image="ProductBannerImage"
          :title="$t('productSpecialPrice.detailProduct')"
          path-redirect="#"
          :data="productOrder"
          :productOrderToday="productOrderToday?.productOrderToday"
        />
      </div>
      <div class="wf-pt-6">
        <HomeBannerProduct :product-sm="productSm" />
      </div>
      <div class="wf_flex wf_items-center wf_justify-center wf-gap-10 wf-pt-39 wf-pb-36">
        <div class="wf_width-full wf-banner-1 wf_min-height-80-04">
          <WelfareBannerImage
            classMediaControl="wf_media_control-right"
            :allowSlideNext="true"
            :allowSlidePrev="true"
            :spaceBetWeen="10"
            :images="imgBanner"
            :hideAmount="false"
          />
        </div>
      </div>
      <TitleRedirect class="wf-pr-21" path="#" :title="$t('productSpecialPrice.hottestProduct')" />
      <div v-if="dataTab.length" class="wf-pb-15 wf-pt-18 wf-px-16 wf-br--g-e-7 wf-br-b-1">
        <WelfareTab class-wrap-space="wf-round-tab-space-7" :items="dataTab" type="round" :default="dataTab[0]" name="3" />
      </div>
      <InfiniteLoadingData v-if="productMd?.productMd" @infinite="load" :stop-scroll="data.length >= 8">
        <div class="wf_grid wf-px-16 wf-pt-4 wf_grid-cols-2 wf-space-y-21 wf-space-x-9">
          <div v-for="(item, index) in data" :key="index">
            <WelfareProductItem is-heart is-coupon is-cart type="md" :data="productMd?.productMd" />
          </div>
        </div>
      </InfiniteLoadingData>
    </div>
  </div>
</template>
