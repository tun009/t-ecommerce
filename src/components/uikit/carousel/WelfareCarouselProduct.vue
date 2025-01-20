<script lang="ts" setup>
import TitleRedirect from '@/components/widgets/TitleRedirect.vue'
import { WelfareCarouselProductProps } from '@/models/uikits/WelfareCarouselProductTypes'
import WelfareProductItem from '../unit/WelfareProductItem.vue'

const props = defineProps<WelfareCarouselProductProps>()
</script>

<template>
  <div class="wf_flex wf_flex-col wf-space-y-20">
    <TitleRedirect  path="#" :title="props.title" />
    <div class="wf-px-16">
      <img class="wf_width-full" :src="props.bannerImage" alt="" />
    </div>
    <div class="wf_overflow-x-auto wf_flex wf-space-x-10 wf-px-16">
      <WelfareProductItem
        class="wf_width-140"
        v-for="(item, index) in props.productList"
        :key="index"
        type="sm"
        :is-heart="false"
        :is-cart="false"
        :data="item"
      />
    </div>
  </div>
</template>
