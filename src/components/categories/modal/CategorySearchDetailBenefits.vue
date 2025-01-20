<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue'
import { WelfareCheckbox } from '@/components/uikit/input'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import IconReloadSearch from '@/components/icons/IconReloadSearch.vue'
import WelfareTag from '@/components/uikit/tag/WelfareTag.vue'
import {
  CategoryDetailedSearchBenefitsEmits,
  CategoryDetailedSearchBenefitsProps,
  CategoryListProductBenefitType,
  CategorySearchDetailBenefit
} from '@/models/views/categories/CategorySearchDetailModel'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'

const { isShow } = useModalBottomSheet()

const getClass = (value: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}

const props = defineProps<CategoryDetailedSearchBenefitsProps>()
defineEmits<CategoryDetailedSearchBenefitsEmits>()

const initValue = () => {
  return [
    {
      type: CategoryListProductBenefitType.FREE_DELIVERY,
      title: '무료배송',
      checked: props.currentBenefits.includes(CategoryListProductBenefitType.FREE_DELIVERY)
    },
    {
      type: CategoryListProductBenefitType.COUPON,
      title: '할인쿠폰',
      checked: props.currentBenefits.includes(CategoryListProductBenefitType.COUPON)
    }
  ]
}
const benefits = ref<CategorySearchDetailBenefit[]>(initValue())

const handleRemoveChecked = (id?: CategoryListProductBenefitType) => {
  try {
    benefits.value[benefits.value.findIndex((b) => b.type === id)].checked = false
  } catch (error) {
    benefits.value.forEach((b) => (b.checked = false))
  }
}

watch(
  () => props.currentBenefits,
  () => {
    benefits.value = initValue()
  }
)

watch([isShow], ([newValue]) => {
  if (!newValue) benefits.value = initValue()
})
</script>

<template>
  <div>
    <div
      v-for="(benefit, index) in benefits"
      :key="index"
      class="wf_grid-span-2 wf_flex wf_items-center wf_justify-between wf-space-x-26 wf-pt-16 wf-pb-20 wf-border-width-b-1 wf-br--g-e-6 wf-color--g-333"
    >
      <span class="wf_letter-spacing--1-4" :class="getClass(benefit.checked)">{{ benefit.title }}</span>
      <WelfareCheckbox v-model="benefit.checked" :value="benefit.checked" />
    </div>
    <div class="wf_width-full wf-py-22 wf-mt-88">
      <div class="wf_flex wf-space-x-8">
        <WelfareTag
          v-for="(benefitActive, indexActive) in benefits.filter((b) => b.checked === true)"
          :class="`normal wf-space-x-1 wf_letter-spacing--1-4 wf-color--g-333`"
          :active="true"
          :key="indexActive"
          :text="benefitActive.title"
          @close="handleRemoveChecked(benefitActive.type)"
        />
      </div>
      <div class="wf_flex wf_width-full wf-space-x-10 wf-bg--white wf-mt-19">
        <IconReloadSearch @click="handleRemoveChecked" class="wf-border-button-reload" />
        <WelfareButtonLine
          @click="
            () =>
              $emit(
                'saveBenefits:methodBenefits',
                benefits.filter((b) => b.checked === true).map((b) => b.type)
              )
          "
          class="wf_flex-1"
          text="상품 보기"
          type="lg"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/categories/_welfare-category-search-detail-benefits.scss');
</style>
