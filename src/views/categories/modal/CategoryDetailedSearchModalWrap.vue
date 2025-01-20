<!--FO_MC_CA033000P, FO_MC_CA033001P, FO_MC_CA033002P-->
<script setup lang="ts">
import { CATEGORY_TAP_CONTROLS, defaultColor } from '@/commons'
import CategorySearchDetailSort from '@/components/categories/modal/CategorySearchDetailSort.vue'
import CategorySearchDetailImageList from '@/components/categories/modal/CategorySearchDetailImageList.vue'
import CategorySearchDetailBenefits from '@/components/categories/modal/CategorySearchDetailBenefits.vue'
import CategoryTapControls from '@/components/categories/CategoryTapControls.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { defineEmits, defineProps } from 'vue'
import {
  CategoryDetailedSearchModalProps,
  CategoryDetailedSearchModalWrapEmits
} from '@/models/views/categories/CategorySearchDetailModel'

defineEmits<CategoryDetailedSearchModalWrapEmits>()
const props = defineProps<CategoryDetailedSearchModalProps>()

const tabs = [
  {
    label: CATEGORY_TAP_CONTROLS[0],
    component: CategorySearchDetailSort
  },
  {
    label: CATEGORY_TAP_CONTROLS[1],
    component: CategorySearchDetailImageList
  },
  {
    label: CATEGORY_TAP_CONTROLS[2],
    component: CategorySearchDetailBenefits
  }
]
</script>

<template>
  <div class="wf-mx-auto wf_width-full wf-mt-12">
    <div class="relative wf_flex wf_flex-col wf-space-y-21 wf-px-16 wf_height-full">
      <div class="wf_flex wf-space-x-5" v-if="props.activated !== CATEGORY_TAP_CONTROLS[0]">
        <CategoryTapControls
          :active-tap="$props.activated"
          :type-display="props.currentMethodDisplay"
          :type-sort="props.currentSort"
          @on-change-tap="(tap) => $emit('onChangeTap', tap)"
        />
      </div>
      <div v-if="props.activated === CATEGORY_TAP_CONTROLS[0]"
           class="wf_flex wf_flex-center wf-relative wf_width-full wf-pt-26 wf-pb-8">
        <span class="wf-font_16-bold-lh1">정렬</span>
        <div class="wf-absolute wf-right-0">
          <button @click="$emit('close')" class="wf_flex wf_items-start">
            <IconClose :color="defaultColor.gray1" :width="16" :height="16" />
          </button>
        </div>
      </div>
      <component
        :is="tabs[tabs.findIndex((tab) => tab.label === props.activated)].component"
        @updateDisplayType:methodDisplay="(value: any) => $emit('updateDisplayType:methodDisplay', value)"
        @updateSort:methodSort="(value: any) => $emit('updateSort:methodSort', value)"
        @saveBenefits:methodBenefits="(value: any) => $emit('saveBenefits:methodBenefits', value)"
        :currentSort="props.currentSort"
        :currentMethodDisplay="props.currentMethodDisplay"
        :currentBenefits="props.currentBenefits"
      />
    </div>
  </div>
</template>
