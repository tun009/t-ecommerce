<script setup lang="ts">
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import {
  CategoryDetailedSearchBenefitsEmits,
  CategoryDetailedSearchBenefitsProps,
  CategoryListProductBenefitType,
  CategorySearchDetailBenefit
} from '@/models/views/categories/CategorySearchDetailModel'
import { defineEmits, ref, watch } from 'vue'
import SearchDetailedGroupButton from '../common/SearchDetailedGroupButton.vue'
import { WelfareCheckbox } from '@/components/uikit/input'
import { useI18n } from 'vue-i18n'

const { isShow } = useModalBottomSheet()

const getClass = (value?: boolean) => {
  return value ? ' wf-font_15--semi ' : ' wf-font_15--reg '
}

const props = defineProps<CategoryDetailedSearchBenefitsProps>()
defineEmits<CategoryDetailedSearchBenefitsEmits>()
const { t } = useI18n()

const initValue = () => {
  return [
    {
      type: CategoryListProductBenefitType.FREE_DELIVERY,
      title: t('search.searchBrand.freeDelivery'),
      checked: props.currentBenefits?.includes(CategoryListProductBenefitType.FREE_DELIVERY)
    },
    {
      type: CategoryListProductBenefitType.COUPON,
      title: t('search.searchBrand.discountCounpon'),
      checked: props.currentBenefits?.includes(CategoryListProductBenefitType.COUPON)
    },
    {
      type: CategoryListProductBenefitType.FREE_INTEREST,
      title: t('search.searchBrand.freeInterest'),
      checked: props.currentBenefits?.includes(CategoryListProductBenefitType.FREE_INTEREST)
    }
  ]
}
const benefits = ref<CategorySearchDetailBenefit[]>(initValue())

const handleRemoveChecked = () => {
  benefits.value.forEach((b) => (b.checked = false))
}

const isActiveCoupon = (benefit: CategorySearchDetailBenefit) => {
  return !props.haveCoupon && benefit.type === CategoryListProductBenefitType.COUPON
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
  <div class="wf_flex wf_justify-center">
    <div class="wf_width-full wf_height-410">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="wf_width-full wf_grid-span-2 wf_flex wf_items-center wf_justify-between wf-space-x-26 wf-pt-16 wf-pb-20 wf-border-width-b-1 wf-br--g-e-6 wf-color--g-333"
      >
        <span class="wf_letter-spacing--1-4" :class="getClass(benefit.checked)">{{ benefit.title }}</span>
        <WelfareCheckbox :disabled="isActiveCoupon(benefit)" v-model="benefit.checked" :value="benefit.checked" />
      </div>
    </div>
    <div class="wf_width-full wf-py-22 wf-px-16 wf_absolute wf-bottom-0">
      <SearchDetailedGroupButton
        :button-title="$t('search.searchCommon.buttonView')"
        :on-click-reset="handleRemoveChecked"
        :on-click-button="
          () =>
            $emit(
              'saveBenefits:methodBenefits',
              benefits.filter((b) => b.checked === true).map((b) => b.type)
            )
        "
      />
    </div>
  </div>
</template>
