<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import WelfareExpander from '@/components/widgets/common/WelfareExpander.vue'
import { ref } from 'vue'

const refExpander = ref()
interface ProductCodeExpandProps {
  title: string
  productCode?: string
}
const props = defineProps<ProductCodeExpandProps>()
</script>

<template>
    <WelfareExpander ref="refExpander">
      <template #button="{ isExpander }">
        <div
          @click="refExpander?.handleToggleExpander"
          class="wf-px-16 wf-py-16 wf-br-b-1 wf-br--g-e-7 wf_flex wf_items-center wf_justify-between wf-space-x-5"
        >
          <div class="wf_flex wf_items-center wf-space-x-10">
            <p class="wf-color--g-111 wf-mt-2 wf-font_15--mid">{{ props.title }}</p>
            <span class="wf-font_13--reg wf-color--g-555 wf_letter-spacing--1">{{ props.productCode }}</span>
          </div>
          <div class="wf-transition-03" :class="{ 'wf-rotate-180': isExpander }">
            <IconArrowDown />
          </div>
        </div>
      </template>
      <div class="wf-px-16 wf_flex wf_flex-col wf-pb-20">
        <span class="wf-font_15--bold wf-color--g-111 wf-py-20">상품설명</span>
        <div class="wf-pb-30 wf_flex wf_flex-col wf-space-y-20">
          <span class="wf-font_15--mid wf-color--g-111">셀링포인트</span>
          <div class="wf-font_13-reg--lh140 wf-pl-4 wf-color--g-555 wf_flex wf_flex-col wf-space-y-4 wf-mt--2">
            <div class="wf_flex wf_items-start">
              <span>1.</span>
              <span class="wf-pl-8">트렌드한&nbsp; 후드 디테일 포인트로 여성스러우면서 생동감 있는 룩</span>
            </div>
            <div class="wf_flex wf_items-start">
              <span>2.</span>
              <span class="wf-pl-8">양모 33% 이상 함유된 울 블렌디드 소재 양모 특유 광택감과 부드러운 감촉!</span>
            </div>
            <div class="wf_flex wf_items-start">
              <span>3.</span>
              <span class="wf-pl-8">무릎을 덮는 기장에 여유로운 핏과 허리 벨트라인으로 체형커버까지 놓치지 않은 예쎄 브랑 코트</span>
            </div>
          </div>
        </div>
        <div class="wf-pb-28 wf_flex wf_flex-col wf-space-y-20">
          <span class="wf-font_15--mid wf-color--g-111">상세사이즈(스펙, 용량 등)</span>
          <div class="wf-font_13-reg--lh130 wf-color--g-555 wf_flex wf_flex-col wf-space-y-10">
            <span>상세페이지 참고</span>
          </div>
        </div>
        <div class="wf_flex wf_flex-col wf-space-y-20">
          <span class="wf-font_15--mid wf-color--g-111">상품구성</span>
          <div class="wf-font_13-reg--lh130 wf-color--g-555 wf_flex wf_flex-col wf-space-y-10">
            <span>코트 1종</span>
          </div>
        </div>
      </div>
    </WelfareExpander>
</template>
