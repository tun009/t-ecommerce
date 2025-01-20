<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import { useMyPageOrderChooseMonthFilter } from '@/composables/myPage/useMyPageOrderChooseMonthFilter'
import { MyPageOrderChooseMonthFilterEmits, myPageListButtonChooseMonthFilter } from '@/models/views/myPage/MyPageMainMemberModel'

const emits = defineEmits<MyPageOrderChooseMonthFilterEmits>()

const {
  handleShowCalendarStart,
  handleShowCalendarEnd,
  handleClickButton,
  isShowAboutTime,
  stringFromDate,
  stringToDate,
  handleSaveAboutTime,
  currentState
} = useMyPageOrderChooseMonthFilter(emits)
</script>
<template>
  <div class="wf_inset-0 wf-bg--g-fff">
    <div class="wf-bg--g-f-5-f-5-f wf-px-16 wf-pt-10 wf-pb-20">
      <div class="wf_flex wf_justify-end wf-mb-14 wf_height-16 wf_items-center">
        <button @click="$emit('close')">
          <IconClose :width="16" :height="16" />
        </button>
      </div>
      <div class="wf_flex wf-space-x-5">
        <WelfareButtonLine
          v-for="(item, index) in myPageListButtonChooseMonthFilter"
          :key="index"
          @click="() => handleClickButton(item.value)"
          class="wf_flex-1 wf-px-0"
          type="md"
          md-state="line"
          :active="item.value === currentState"
          :text="item.label"
        />
      </div>
      <div v-if="isShowAboutTime" class="wf_grid wf_grid-cols-4 wf-space-x-5 wf_items-center wf-mt-10">
        <div class="wf-color--g-777 wf_flex wf_justify-center wf-font_15--mid">조회기간</div>
        <div class="wf_grid-span-2 wf_items-center wf-space-x-5 wf_flex">
          <WelfareButtonLine @click="handleShowCalendarStart" class="wf_flex-1 wf-px-0" type="md" md-state="line" :text="stringFromDate" />
          <div class="wf-color--g-777 wf-font_15--mid">-</div>
          <WelfareButtonLine @click="handleShowCalendarEnd" class="wf_flex-1 wf-px-0" type="md" md-state="line" :text="stringToDate" />
        </div>
        <WelfareButtonLine @click="handleSaveAboutTime" class="wf-px-0" type="md" md-state="default" active text="조회" />
      </div>
    </div>
  </div>
</template>
