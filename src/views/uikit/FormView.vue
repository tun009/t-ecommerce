<script setup lang="ts">
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareTitleInfo from '@/components/uikit/WelfareTitleInfo.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareFormTitle from '@/components/uikit/form/WelfareFormTitle.vue'
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareRadioGroup from '@/components/uikit/input/WelfareRadioGroup.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import { ref } from 'vue'

const options: string[] = ['네이비', '그레이', '화이트']
const defaultSelect = ref()

const radioGroupOptions = [
  {
    label: '텍스트',
    value: 1
  },
  {
    label: '텍스트',
    value: 2
  },
  {
    label: '텍스트',
    value: 3
  }
]
const checkbox = ref(false)
const radioGroup = ref(1)
const inputTest = ref('')
const input1 = ref('')
const input2 = ref('틴트')
const input3 = ref('쿠션')
const input4 = ref('틴트')
const inputMaxlength = ref('')
</script>

<template>
  <WelfareContainer title="COMPONENT">
    <WelfareTitleInfo title="Form" des="활용법" subDes="기본 높이값은 41px이고 항목별 좌우 패딩값은 15px로 사용합니다." />

    <div class="wf-pt-20"></div>
    <WelfareInput title="Password" type="password" placeholder="텍스트" v-model="inputTest" passwordIcon />
    <div class="wf-pt-20"></div>
    <div class="wf-pt-20"></div>
    <div class="wf_grid wf_grid-cols-2 wf_width-1120 wf-mx-auto wf-space-x-20">
      <div class="wf_flex wf_flex-col wf-space-y-15 wf_width-267 wf-mx-auto">
        <span class="wf-font_14-reg wf_letter-spacing--2">입력전</span>
        <WelfareInput searchIcon placeholder="검색어를 입력해주세요" v-model="input1" />
      </div>

      <div class="wf_flex wf_flex-col wf-space-y-15 wf_width-267 wf-mx-auto">
        <span class="wf-font_14-reg wf_letter-spacing--2">입력중</span>
        <WelfareInput searchIcon placeholder="검색어를 입력해주세요" v-model="input2" autofocus />
      </div>
    </div>

    <div class="wf-pt-20"></div>
    <div class="wf-pt-20"></div>

    <div class="wf_grid wf_grid-cols-2 wf_width-1120 wf-mx-auto wf-space-x-20 wf-mt-20">
      <div class="wf_flex wf_flex-col wf-space-y-15 wf_width-267 wf-mx-auto">
        <span class="wf-font_14-reg wf_letter-spacing--2">입력완료</span>
        <WelfareInput searchIcon placeholder="검색어를 입력해주세요" v-model="input3" />
      </div>

      <div class="wf_flex wf_flex-col wf-space-y-15 wf_width-267 wf-mx-auto">
        <span class="wf-font_14-reg wf_letter-spacing--2">입력오류</span>
        <WelfareInput searchIcon placeholder="검색어를 입력해주세요" errorText="정확한 정보를 다시 입력해 주세요." v-model="input4" />
      </div>
    </div>

    <div class="wf-pt-20"></div>
    <div class="wf-pt-20"></div>
    <div class="wf-pt-20"></div>
    <div class="wf-pt-20"></div>

    <div class="wf_grid wf_grid-cols-5 wf_width-1120 wf-mx-auto wf-space-x-20">
      <div class="">1단</div>
      <div class="wf_grid-span-2 wf_flex wf_items-center wf-space-x-26">
        <span class="wf-font_15--mid wf-color--g-333">결제수단</span>
        <WelfareSelect v-model="defaultSelect" placeholder="카드를 선택해주세요." class="wf_width-228-important" :options="options" />
      </div>
      <div
        class="wf_width-343 wf_grid-span-2 wf_flex wf_items-start wf_justify-between wf-space-x-26 wf-pb-18 wf_height-fit wf-border-width-b-1 wf-br--g-e-6"
      >
        <span class="wf-font_15--mid wf-color--g-333 wf-mt-3 wf-ml-2">무료배송</span>
        <WelfareCheckbox v-model="checkbox" />
      </div>
    </div>

    <div class="wf_grid wf_grid-cols-5 wf_width-1120 wf-mx-auto wf-mt-20 wf-space-x-20">
      <div class="">2단</div>
      <div class="wf_grid-span-2 wf_width-343">
        <WelfareInput disabled title="소타이틀" placeholder="텍스트" />
      </div>
      <div class="wf_grid-span-2 wf_flex wf_flex-col wf-space-y-20 wf_width-full">
        <WelfareFormTitle title="소타이틀" />
        <WelfareRadioGroup
          name="radio-group-example"
          :options="radioGroupOptions"
          :model-value="radioGroup"
          @update:model-value="(value) => (radioGroup = value)"
        />
      </div>
    </div>

    <div class="wf_grid wf_grid-cols-5 wf_width-1120 wf-mx-auto wf-mt-20 wf-space-x-20">
      <div class="">3단</div>
      <div class="wf_grid-span-2 wf_width-343 wf_flex wf_flex-col wf-space-y-15">
        <WelfareFormTitle title="주소" required />
        <div class="wf_flex wf_flex-col wf-space-y-10 wf-mt-2">
          <WelfareSelect placeholder="배송 메시지를 선택해 주세요" />
          <WelfareInput
            v-model="inputMaxlength"
            placeholder="직접 입력이 가능합니다. (한글 20자 이내)"
            classWrapInput="wf-pr-8-important"
            :maxLength="20"
            :clear-text="false"
          />
        </div>
      </div>
      <div class="wf_grid-span-2 wf_flex wf_flex-col wf-space-y-10 wf_width-343">
        <WelfareInput class-wrap="wf_flex wf-space-x-10" placeholder="주소를 검색해주세요." disabled class="wf_flex-1 wf_letter-spacing--1-4" title="주소" required>
          <template #suffix>
            <WelfareButtonLine type="md" text="우편번호" />
          </template>
        </WelfareInput>
        <WelfareInput class="wf_letter-spacing--1-2" placeholder="우편번호 찾기를 이용해주세요." disabled />
        <WelfareInput class="wf_letter-spacing--1-2" placeholder="상세 주소를 입력하세요." disabled />
      </div>
    </div>
  </WelfareContainer>
</template>
