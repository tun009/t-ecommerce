<script setup lang="ts">
import { formatNumberDot } from '@/commons'
import IconPlusCirce from '@/components/icons/IconPlusCirce.vue'
import { WelfareUnitProductSmallProps } from '@/models/uikits/WelfareProductTypes'
import WelfareViewPercent from '../product/WelfareViewPercent.vue'
import WelfareImage from '@/components/widgets/images/WelfareImage.vue'

const props = withDefaults(defineProps<WelfareUnitProductSmallProps>(), {
  isDark: false
})
</script>
<template>
  <div class="wf_width-107">
    <div class="wf_unit-product-image wf_height-107">
      <WelfareImage alt="" :data-src="props.data.thumbnailProduct" />
      <div v-if="props.data.titleDayWarning" class="wf_unit-product-tag wf-bg--g-555 wf-color--g-fff wf-font_15--mid">
        {{ props.data.titleDayWarning }}
      </div>
      <div v-if="props.data.thumbnailBo" class="wf_unit-product-image-relate">
        <span class="wf_unit-product-image-relate-icon"><IconPlusCirce /></span>
        <figure class="wf_unit-product-image-relate-item">
          <img alt="" :src="props.data.thumbnailBo" />
        </figure>
      </div>
    </div>
    <div>
      <div class="wf-mt-15 wf_flex wf_items-center wf_flex-wrap wf-space-y-5 wf-space-x-6">
        <WelfareViewPercent v-if="props.data.percent" type="sm" :percent="props.data.percent" />
        <p
          v-if="props.data.pricePromotion"
          class="wf_flex wf_items-center wf-font_11--reg wf-space-x-2"
          :class="[{ 'wf-color--g-fff': isDark }, { 'wf-color--g-111': !isDark }]"
        >
          <span class="wf-font_13--bold wf_letter-spacing--1-1">{{ formatNumberDot(props.data.pricePromotion) }} </span>
          원
        </p>
        <p
          v-if="props.data.price"
          class="wf-border-top-absolute wf_width-fit wf wf-text"
          :class="[{ 'wf-color--g-fff': isDark }, { 'wf-color--g-bbb': !isDark }, $props.class ?? 'wf-font_13--reg']"
        >
          {{ formatNumberDot(props.data.price) }}원
        </p>
      </div>
      <div v-if="props.data.name" class="wf-mt-10">
        <p class="wf-font_13--reg wf-line-clamp-1" :class="[{ 'wf-color--g-fff': isDark }, { 'wf-color--g-333': !isDark }]">
          {{ props.data.name }}
        </p>
      </div>
    </div>
  </div>
</template>
