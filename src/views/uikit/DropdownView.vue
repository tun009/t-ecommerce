<script setup lang="ts">
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareTitleInfo from '@/components/uikit/WelfareTitleInfo.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import WelfareProductSearchLayout from '@/components/widgets/common/WelfareProductSearchLayout.vue'
import { ref } from 'vue'

const options: string[] = ['네이비', '그레이', '화이트']
const shortOptions: string[] = ['신한카드', '국민카드', '하나카드']
const sortOptions: string[] = ['인기상품순', '최다조회순', '최근등록순', '높은가격순', '낮은가격순', '상품평순']
const longOptions: string[] = [
  '사과',
  '배',
  '샤인머스켓',
  '민감류',
  '견과',
  '고구마',
  '고춧가루',
  '인기상품순',
  '그레이',
  '화이트',
  '하나카드',
  '상품평순'
]

const defaultSelect = ref()
const shortSelect = ref()
const longSelect = ref()
</script>

<template>
  <WelfareContainer title="COMPONENT" class="wf_width-auto">
    <WelfareTitleInfo title="Dropdown" des="활용법" subDes="Basic 사이즈를 기준으로 사용하며, Short 사이즈는 팝업때 사용합니다." />

    <div class="wf_flex wf_flex-wrap wf-space-x-30 wf-space-y-30 wf-px-12 wf-py-12">
      <div class="wf_flex wf_flex-col wf_justify-center wf_items-center wf-space-y-30">
        <div class="wf_flex wf_flex-col wf-space-y-20">
          <span class="wf-font_14-reg">Basic</span>
          <WelfareSelect v-model="defaultSelect" placeholder="색상" class="wf_width-335" :options="options" />
        </div>
        <div class="wf_flex wf_flex-col wf-space-y-20">
          <span class="wf-font_14-reg">비활성</span>
          <WelfareSelect placeholder="적용 가능한 상품쿠폰이 없습니다." class="wf_width-335" :options="options" disabled />
        </div>
      </div>
      <div class="wf_flex wf_flex-col wf_justify-center wf_items-center wf-space-y-30">
        <div class="wf_flex wf_flex-col wf-space-y-20">
          <span class="wf-font_14-reg">Short</span>
          <WelfareSelect v-model="shortSelect" placeholder="카드를 선택해주세요." class="wf_width-220-important" :options="shortOptions" />
        </div>
        <div class="wf_flex wf_flex-col wf-space-y-20">
          <span class="wf-font_14-reg">비활성</span>
          <WelfareSelect placeholder="일시불" class="wf_width-220-important" :options="shortOptions" disabled />
        </div>
      </div>

      <div class="wf-pt-20" v-for="n in 6" v-bind:key="n"></div>

      <div class="wf_flex wf_justify-center wf_items-center wf-space-y-30">
        <div class="wf_flex wf_flex-col wf-space-y-20 wf_width-343">
          <span class="wf-font_14-reg">상품이 없을 경우</span>
          <WelfareProductSearchLayout result="총 0,000개" :selectOptions="sortOptions">
            <div class="wf-font_15--reg wf-color--g-333 wf-mx-auto wf-mt-140 wf_width-fit">카테고리에 상품이 없습니다.</div>
          </WelfareProductSearchLayout>
        </div>
      </div>

      <WelfareSelect
        placeholder="사과"
        class="wf_width-220-important wf-mx-auto"
        panelClass="wf-dropdown-panel-max-height"
        v-model="longSelect"
        :options="longOptions"
      />
    </div>
  </WelfareContainer>
</template>
