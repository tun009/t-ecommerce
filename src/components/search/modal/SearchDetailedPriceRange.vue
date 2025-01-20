<script setup lang="ts">
import SearchDetailedGroupButton from '../common/SearchDetailedGroupButton.vue'
import { formatNumberDot } from '@/commons'
import { SearchDetailRangeProps, SearchDetailRangeEmits } from '@/models/views/search/SearchDetailModel'
import { useSearchDetailedPriceRange } from '@/composables/search/useSearchDetailedPriceRange'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

const props = defineProps<SearchDetailRangeProps>()
const emits = defineEmits<SearchDetailRangeEmits>()
const { range, minValue, maxValue, sliderRef, divSliderRef, handleInputSpan, rangeInputNumber, handleClickSpan, handlePasteValue } =
  useSearchDetailedPriceRange(props, emits)
</script>

<template>
  <div class="wf_flex wf_justify-center wf_height-410">
    <div ref="divSliderRef" class="wf_flex wf_flex-col wf-space-y-13 wf_width-full wf-mt-110">
      <div class="wf-font_13--reg wf-color--g-555 wf_flex wf_justify-between">
        <div>{{ `${formatNumberDot(minValue)}  ${$t('search.searchPriceRange.won')}` }}</div>
        <div>{{ `${formatNumberDot(maxValue)}  ${$t('search.searchPriceRange.won')}` }}</div>
      </div>
      <div class="wf-relative wf-mt--8">
        <div class="wf-bg--g-f6 wf_height-8 wf-absolute wf_width-full wf-bottom-8"></div>
        <div class="wf-mx-12">
          <!-- value: 24 is dot size. width 24px, height 24px -->
          <VueSlider
            ref="sliderRef"
            tooltip="always"
            :dotSize="[24, 24]"
            :max="maxValue"
            :min="minValue"
            :enable-cross="false"
            :use-keyboard="false"
            tooltip-placement="bottom"
            :modelValue="range"
            @update:modelValue="(value: any) => (range = value)"
          >
            <template v-slot:tooltip="{ value, index }">
              <!-- only accept number press, disable paste, special character -->
              <span
                :onkeyup="(e: KeyboardEvent) => rangeInputNumber(e, index)"
                @click="handleClickSpan"
                @focusout="(e) => handleInputSpan(e, index)"
                @paste="(e) => handlePasteValue(e, index)"
                contenteditable="true"
                class="vue-slider-dot-tooltip-text vue-slider-dot-tooltip-inner vue-slider-dot-tooltip-inner-bottom"
              >
                {{ value }}
              </span>
            </template>
          </VueSlider>
        </div>
      </div>
    </div>
    <div class="wf_width-full wf-px-16 wf-py-20 wf_absolute wf-bottom-0">
      <SearchDetailedGroupButton
        :button-title="$t('search.searchCommon.buttonView')"
        :on-click-reset="
          () => {
            range = [minValue, maxValue]
          }
        "
        :on-click-button="
          () => {
            $emit('saveRange:methodRange', range)
          }
        "
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/search/_welfare-search-detailed-price-range.scss');
</style>
