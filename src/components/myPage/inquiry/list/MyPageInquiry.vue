<script setup lang="ts">
import { formatTime, formatTimeWithDot } from '@/commons'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import MyPageNotFound from '@/components/myPage/products/common/MyPageNotFound.vue'
import { useMyPageInquiryMember } from '@/composables/myPage/useMyPageInquiry'

const { inquiryList, checkAnswer, targetRef, categoryTab } = useMyPageInquiryMember()
</script>

<template>
  <template v-if="inquiryList.length > 0">
    <div class="prd-content wf-px-16 wf-pb-20" v-for="(item, index) in inquiryList" :key="index">
      <div class="wf_flex wf_items-center wf-space-x-6 wf-mb-8">
        <div
          :class="{
            'wf-bg--g-d-2-e-0-f wf-color--blue-4075-f-3': checkAnswer(item),
            'wf-bg--g-gray-ee  wf-color--g-555': !checkAnswer(item)
          }"
          class="wf_min-width-36 wf-px-10 wf_letter-spacing--1 wf-br-1 wf_rounded-2 wf-br--g-ee wf-font_11--semi wf-py-4"
        >
          {{ checkAnswer(item) ? $t('myPage.detailInquiry.common.responseCompleted') : $t('myPage.detailInquiry.common.waitingForResponse') }}
        </div>
        <span class="wf-font_13--reg wf-color--g-777 wf-font_13--reg">
          {{ formatTimeWithDot(item.registeredDate) }} {{ formatTime(item.registeredDate, 'HH:mm') }}
        </span>
      </div>

      <div class="wf-border-width-b-1 wf-br--g-e-7">
        <div class="wf_flex wf_justify-between wf_items-center wf_height-15" @click="item.show = !item.show">
          <span class="wf-font_15--mid wf-color--g-333">{{ `[${categoryTab[item.inquiryType]}] ${item.title}` }}</span>
          <span class="wf-transition-03" :class="{ 'wf-rotate-180': item.show }">
            <IconArrowDown />
          </span>
        </div>

        <div class="wf-expander" :class="{ 'wf-expanded': item.show }">
          <div class="wf-expander-content accordian-discription wf-font_15--reg wf-mt-20 wf_letter-spacing--1">
            <div class="wf-font_13--reg wf-color--g-777">
              <template v-if="item.orderKey !== 0">
                <dl class="wf_flex wf_items-center wf-pb-20">
                  <dt>{{ $t('myPage.detailInquiry.member.orderNumber') }}:</dt>
                  <dd>{{ item.orderKey }}</dd>
                </dl>
              </template>
              <template v-if="item.productKey !== 0">
                <dl class="wf_flex wf_items-center wf-pb-20">
                  <dt>{{ $t('myPage.detailInquiry.member.productNumber') }}:</dt>
                  <dd>{{ item.productKey }}</dd>
                </dl>
              </template>
            </div>
            <div class="wf-color--g-555 wf-px-25 wf-py-20 wf-bg--g-f-5-f-6-fa wf-br-t-1 wf-br--g-e-7 wf-mb-10">
              {{ item.contents }}
            </div>
            <template v-if="checkAnswer(item)">
              <div class="wf-color--g-555 wf-px-25 wf-py-20 wf-bg--g-f-5-f-6-fa wf-br-t-1 wf-br--g-e-7 wf-mb-10">
                <div class="wf_flex wf_items-center wf-space-x-6 wf-font_13--reg wf-mb-10">
                  <div class="wf-br-r-1 wf-pr-8 wf-br--g-bbb">{{ $t('myPage.detailInquiry.common.counselingteam') }}</div>
                  <span class="wf-font_13--reg wf-color--g-777 wf-font_13--reg">
                    {{ formatTimeWithDot(item.answeredDate || '') }} {{ formatTime(item.answeredDate || '', 'HH:mm') }}
                  </span>
                </div>
                <div class="wf-font_15--semi wf-mb-10 wf-color--g-333">{{ item.answerTitle }}</div>
                <div class="wf-font_15--reg wf-color--g-555">{{ item.answerContents }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div ref="targetRef" />
  </template>
  <template v-else>
    <MyPageNotFound :desc="$t('myPage.detailInquiry.common.notFound')" />
  </template>
</template>
