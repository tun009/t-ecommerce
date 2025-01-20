<script lang="ts" setup>
import TitleRedirect from '@/components/widgets/TitleRedirect.vue'
import IconClock from '@/components/icons/home/IconClock.vue'
import WelfareProductItem from '@/components/uikit/unit/WelfareProductItem.vue'
import { WelfareUnitProductModel } from '@/models/uikits/WelfareProductTypes'
import { defaultColor } from '@/commons'

interface Props {
  pathRedirect: string
  time: string
  productLg?: WelfareUnitProductModel
  title: string
  productLgLast?: WelfareUnitProductModel
}
const props = defineProps<Props>()
</script>

<template>
  <div class="wf_flex wf_background wf_flex-col wf-width-full wf-pb-40 wf-pt-36">
    <TitleRedirect path="#" :title="props.title" />
    <div class="wf_flex wf-px-16 wf-pt-9 wf-pb-20">
      <IconClock class="wf-mt-1" :color="defaultColor.gray1" :width="15" :height="15" />
      <h3 class="wf-font_21--bold wf-color--g-33 wf-ml-5">{{ props.time }}</h3>
    </div>
    <div v-if="props.productLg" class="wf_width-full wf-px-16">
      <WelfareProductItem is-heart is-buy :data="props.productLg" class="wf-pb-32" />
      <WelfareProductItem is-heart is-buy :data="props.productLg" class="wf-pb-31" />
      <WelfareProductItem is-heart is-buy :data="props.productLg" class="" />
    </div>
  </div>
  <div class="wf_width-full wf-px-16 wf-pt-41">
    <WelfareProductItem is-sale v-if="props.productLgLast" :is-heart="false" :is-price="true" :is-cart="false" :is-buy="true" :data="props.productLgLast" />
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/home/_welfare-home-special-price.scss');
</style>
