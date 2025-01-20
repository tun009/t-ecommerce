<script setup lang="ts">
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { useMyPageOrderCalendarMonth } from '@/composables/myPage/useMyPageOrderCalendarMonth'
import { MyPageOrderCalendarMonthEmits, MyPageOrderCalendarMonthProps } from '@/models/views/myPage/MyPageMainMemberModel'

const props = defineProps<MyPageOrderCalendarMonthProps>()
const emits = defineEmits<MyPageOrderCalendarMonthEmits>()

const { currentYear, currentMonth, isDisabledPre, isDisabledNext, handleSave, defaultYear, defaultMonth } = useMyPageOrderCalendarMonth(props, emits)
</script>
<template>
  <div class="wf-bg--g-fff wf-pt-10 wf-pb-30 wf-px-16">
    <div class="wf_flex wf_items-center wf_height-32 wf_justify-between wf-mb-20">
      <button
        @click="currentYear -= 1"
        :disabled="isDisabledPre"
        class="wf_height-32 wf_width-32 wf-br-1 wf-br--g-e-7 wf_border-solid"
        :class="{ ' wf-button-action-calendar-choose-month': isDisabledPre }"
      >
        <IconArrowLeft :width="14" :height="28" />
      </button>
      <span class="wf-font_23--bold wf-color--g-111">{{ currentYear }}년</span>
      <button
        @click="currentYear += 1"
        :disabled="isDisabledNext"
        class="wf_height-32 wf_width-32 wf-br-1 wf-br--g-e-7 wf_border-solid wf-rotate-180"
        :class="{ ' wf-button-action-calendar-choose-month': isDisabledNext }"
      >
        <IconArrowLeft :width="14" :height="28" />
      </button>
    </div>
    <div class="wf_grid wf_grid-cols-4 wf-space-y-6">
      <div
        v-for="(_, index) in Array.from({ length: 12 })"
        :key="index"
        class="wf_flex wf_height-50 wf_justify-center"
        :class="{ 'wf-mt-4': index + 1 >= 5 }"
      >
        <button
          @click="currentMonth = index + 1"
          class="wf-font_15--mid wf_width-50 wf_height-50 wf-button-calendar-choose-month"
          :class="[{ active: currentMonth === index + 1 }]"
          :disabled="index + 1 > defaultMonth && currentYear === defaultYear"
        >
          {{ index + 1 }}월
        </button>
      </div>
    </div>
    <div class="wf_flex wf-mt-24 wf-space-x-10">
      <WelfareButtonLine @click="$emit('close')" class="wf_flex-1" type="lg" lg-state="grey-line" text="취소" />
      <WelfareButtonLine @click="handleSave" class="wf_flex-1" type="lg" lg-state="default" text="확인" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/views/myPage/_welfare-my-page-calendar-choose-month.scss');
</style>
