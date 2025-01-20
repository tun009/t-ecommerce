<script lang="ts" setup>
import TitleRedirect from '@/components/widgets/TitleRedirect.vue'
import { HomeOrderToDayModel } from '@/models/views/home/HomeOrderToDayModel'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'

const props = defineProps<HomeOrderToDayModel>()
</script>

<template>
  <div class="wf_flex wf_flex-col wf-space-y-19">
    <TitleRedirect path="#" :title="props.title" />
    <div class="wf-px-16" v-if="props.isBannerImage">
      <img class="wf_width-full" :src="props.bannerImage" alt="" />
    </div>
    <div :class="`wf-pl-16 ${props.classProduct}`">
      <div class="wf_overflow-x-auto wf_flex wf-space-x-10 wf-pt-2">
        <div v-if="props.productOrderToday" class="wf_flex wf-space-x-10">
          <WelfareProductItem class="wf_width-140" type="sm" :data="props.productOrderToday" />
          <WelfareProductItem class="wf_width-140" type="sm" :data="props.productOrderToday" />
          <WelfareProductItem class="wf_width-140" type="sm" :data="props.productOrderToday" />
          <WelfareProductItem class="wf_width-140" type="sm" :data="props.productOrderToday" />
        </div>
      </div>
    </div>
  </div>
</template>
