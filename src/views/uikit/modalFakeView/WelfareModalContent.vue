<script setup lang="ts">
import { defaultColor, formatNumberDot } from '@/commons'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareTitleModal from '@/components/uikit/title/WelfareTitleModal.vue'

interface WelfareModalContentProps {
  title: string
}

type WelfareModalContentEmits = (e: 'close') => void

defineProps<WelfareModalContentProps>()
defineEmits<WelfareModalContentEmits>()
</script>

<template>
  <WelfareTitleModal class="wf_width-auto wf-pb-15 wf-pt-29 wf-mx-16" :title="$props.title" @close="() => $emit('close')" classIcon="wf-mt-2" />
  <div class="wf-mx-auto wf_width-full">
    <div class="wf_flex wf_flex-col wf-px-16 wf-pt-26 wf-pb-10-important">
      <div class="wf-pl-19 wf-pt-18 wf-pb-19 wf-pr-29 wf-br-1 wf_flex wf_border-radius-5 wf-br--g-e-7">
        <div class="wf_flex-1">
          <p class="wf-font_13--bold wf-color--g-333 wf_letter-spacing--1">비오는날 대비해요</p>
          <p class="wf-mt-5 wf-font_15--bold wf-color--f-95729 wf_letter-spacing--1">{{ formatNumberDot(5000) }}원 할인</p>
          <div class="wf-mt-15">
            <p class="wf-font_11--reg wf-color--g-777 wf_letter-spacing--1">{{ formatNumberDot(20000) }}원 이상 구매시</p>
            <p class="wf-font_11--reg wf-mt-5 wf-color--g-777 wf_letter-spacing--1">2022-12-01 00:00~2022-12-31 23:59</p>
          </div>
        </div>
        <div class="wf-pl-25 wf_flex wf_flex-col wf_items-center wf_justify-center wf-br-l-1 wf-br--g-e-7">
          <span>
            <IconDownload :width="9" :height="17" :color="defaultColor.black" />
          </span>
          <p class="wf-mt-10 wf-font_13--bold">10 장</p>
        </div>
      </div>

      <div class="wf-mt-10">
        <div class="wf_flex wf_width-full wf_items-center wf-pb-12 wf-br-b-1 wf-br--g-e-7 wf_justify-between wf-pl-11 wf-pr-9">
          <span class="wf-font_13--mid">자세히보기</span>
          <span>
            <IconArrowDown />
          </span>
        </div>
        <div class="wf-px-10 wf-pl-7-important wf-pb-10 wf-pt-14">
          <div>
            <ul class="wf-font_13-reg--lh130 wf-color--g-777 wf_flex wf-space-y-12 wf_flex-col">
              <li class="wf_flex wf-space-x-5"><span>•</span>유효기간 2023.09.01~2023.09.30</li>
              <li class="wf_flex wf-space-x-5"><span>•</span>1인(ID)당 1회 발급가능</li>
              <li class="wf_flex wf-space-x-5">
                <span class="wf-mt--2">•</span>스포츠의류 카테고리 상품 구매 시 사용가능하며, TV쇼핑 상품과 일부상품은 제외됩니다.
              </li>
              <li class="wf_flex wf-space-x-5"><span>•</span>사용하신 쿠폰은 취소 및 반품에 의해 재발급되지 않습니다.</li>
              <li class="wf_flex wf-space-x-5"><span>•</span>부정한 방법으로 혜택 수취시 법적책임이 가해질 수 있습니다.</li>
            </ul>
          </div>
        </div>
        <div class="wf-mt-9 wf-br-1 wf-py-20 wf-pr-22 wf-pl-15 wf-pt-20 wf-bg--g-f-8-f-8 wf_flex wf_border-radius-5 wf-br--g-e-7">
          <div class="wf_flex-1">
            <div>
              <p class="wf-font_13--bold wf-color--g-999 wf_letter-spacing--1">Summer Vacance</p>
              <p class="wf-font_13--bold wf-mt-5 wf-color--g-999 wf_letter-spacing-1">20% 할인</p>
            </div>
            <div class="wf-mt-16">
              <p class="wf-font_11--reg wf-color--g-999 wf_letter-spacing--1">{{ formatNumberDot(30000) }}원 이상 구매시</p>
              <p class="wf-font_11--reg wf-mt-5 wf-color--g-999 wf_letter-spacing--1">2022-12-01 00:00~2022-12-31 23:59</p>
            </div>
          </div>
          <div class="wf-pl-17 wf_flex wf_flex-col wf_items-center wf_justify-center wf-br-l-1 wf-br--g-e-7">
            <span class="wf-font_13--bold wf-color--g-999">받기완료</span>
          </div>
        </div>
      </div>
      <div class="wf-mt-10">
        <div class="wf_flex wf_width-full wf_items-center wf-pb-12 wf_justify-between wf-px-12 wf-pr-8-important">
          <span class="wf-font_13--mid">자세히보기</span>
          <span>
            <IconArrowDown />
          </span>
        </div>
      </div>
    </div>

    <div class="wf-px-16 wf-pb-32 wf_width-full">
      <WelfareButtonLine active lg-state="grey-line" type="lg" class="wf_width-full" text="전체 쿠폰 받기" />
    </div>
  </div>
</template>
