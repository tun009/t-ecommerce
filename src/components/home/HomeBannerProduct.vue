<script setup lang="ts">
import { BackgroundGnb } from '@/assets/images'
import { HomeProductSmModel } from '@/models/views/home/HomeGnbProductModel'
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'
import WelfareProductItemSmall from '../uikit/unit/WelfareProductItemSmall.vue'
import IconArrowRight from '../icons/IconArrowRight.vue'

const props = defineProps<HomeProductSmModel>()
</script>
<template>
  <div>
    <div class="wf-mt-15 wf-relative">
      <div class="wf-banner-text">
        <router-link :to="'#'" class="wf_flex wf_items-center wf-link-hover wf-space-x-10">
          <span class="wf-font_23--bold wf-color--g-fff">다이슨</span>
          <span class="wf-link-icon wf-color--g-fff"><IconArrowRight :width="8" :height="12" /></span>
        </router-link>
        <p class="wf-font_15-mid--lh140 wf-mt-9 wf_width-94 wf-color--g-fff wf-opacity">신제품 런칭 기념. ~50% 세일</p>
      </div>
      <WelfareImage class-group="wf-image-link" :data-src="BackgroundGnb" />
    </div>
    <div v-if="props.productSm" class="wf-background wf_flex wf-space-x-12 wf-pb-60 wf-pt-60 wf-px-16">
      <WelfareProductItemSmall is-dark :data="props.productSm" />
      <WelfareProductItemSmall is-dark :data="props.productSm" />
      <WelfareProductItemSmall is-dark :data="props.productSm" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/home/_welfare-home-banner-product.scss');
</style>
