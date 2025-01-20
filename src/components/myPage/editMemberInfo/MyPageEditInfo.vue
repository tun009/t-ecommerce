<script setup lang="ts">
import { reactive } from 'vue'
import { useMyPageEditMemberInfo } from '@/composables/myPage/useMyPageEditMemberInfo'

import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'
import WelfareFormTitle from '@/components/uikit/form/WelfareFormTitle.vue'
import { WelfareCheckbox } from '@/components/uikit/input'
// import PopupNotification from '@/components/widgets/modal/popup/PopupNotification.vue'

// TODO: placeholder 정의 안되어있음.

const { hookMyPageCheckPassword } = defineProps(['hookMyPageCheckPassword'])
const { checkPasswordObj } = reactive(hookMyPageCheckPassword)
const { csrfToken } = checkPasswordObj

const hookMyPageEditMemberInfo = reactive(useMyPageEditMemberInfo({ csrfToken }))
const {
  getYn,
  setYn,
  memberInfo,
  setMemberInfo,
  handleCellphoneNumber,
  handleShowChangePassword,
  handleShowChangeAddress,
  handleShowAgreement,
  handleDone
} = hookMyPageEditMemberInfo
</script>

<template>
  <form @submit.prevent="handleDone">
    <div class="wf-relative wf-pb-47">
      <div class="wf-mt-20 wf-px-16">
        <WelfareInput
          :model-value="`${memberInfo?.memberName} (${memberInfo?.memberKey})`"
          :title="$t('myPage.editMemberInfo.editMemberInfo.subTitle1')"
          :clearText="false"
          disabled
        />
      </div>
      <div class="wf-mt-20 wf-px-16">
        <WelfareInput
          :model-value="memberInfo?.company?.customerName"
          :title="$t('myPage.editMemberInfo.editMemberInfo.subTitle2')"
          :clearText="false"
          disabled
        />
      </div>
      <div class="wf-mt-20 wf-px-16">
        <WelfareInput
          :model-value="`${memberInfo?.company?.rankName} (${memberInfo?.company?.holdingOfficeYn?.title})`"
          :title="$t('myPage.editMemberInfo.editMemberInfo.subTitle3')"
          :clearText="false"
          disabled
        />
      </div>
      <div class="wf-mt-20 wf-px-16">
        <WelfareInput
          :model-value="memberInfo?.birthDate"
          :title="$t('myPage.editMemberInfo.editMemberInfo.subTitle4')"
          :clearText="false"
          disabled
        />
      </div>
      <hr class="break-line wf-mt-20" />
      <div class="wf-mt-20 wf-px-16">
        <WelfareInput :model-value="memberInfo?.memberId" :title="$t('myPage.editMemberInfo.editMemberInfo.subTitle5')" :clearText="false" disabled />
      </div>

      <div class="wf-mt-20 wf-px-16">
        <WelfareFormTitle :title="$t('myPage.editMemberInfo.editMemberInfo.subTitle6')" />
        <WelfareButtonLine
          class="wf_w-full wf-mt-5"
          type="md"
          :text="$t('myPage.editMemberInfo.editMemberInfo.buttonName6')"
          @click="handleShowChangePassword"
        />
      </div>
      <div class="wf-mt-20 wf-px-16">
        <WelfareInput
          class-wrap="wf_flex wf-space-x-10"
          :model-value="memberInfo?.cellphoneNumber"
          @update:model-value="(v) => setMemberInfo('cellphoneNumber', v)"
          :title="$t('myPage.editMemberInfo.editMemberInfo.subTitle7')"
          :clearText="false"
        >
          <template #suffix
            ><WelfareButtonLine
              class="wf_width-110"
              @click="handleCellphoneNumber"
              type="md"
              :text="$t('myPage.editMemberInfo.editMemberInfo.buttonName7')"
          /></template>
        </WelfareInput>
      </div>
      <div class="wf-mt-20 wf-px-16 wf_grid-span-2 wf_flex wf_flex-col wf-space-y-10">
        <WelfareInput
          class-wrap="wf_flex wf-space-x-10"
          :placeholder="$t('myPage.editMemberInfo.editMemberInfo.placeholder8-1')"
          disabled
          class="wf_flex-1 wf_letter-spacing--1-4"
          :title="$t('myPage.editMemberInfo.editMemberInfo.subTitle8')"
          :clearText="false"
          :model-value="memberInfo?.deliveryZipCode"
        >
          <template #suffix>
            <WelfareButtonLine
              class="wf_width-110"
              type="md"
              :text="$t('myPage.editMemberInfo.editMemberInfo.buttonName8')"
              @click="handleShowChangeAddress"
            />
          </template>
        </WelfareInput>
        <WelfareInput
          class="wf_letter-spacing--1-2"
          :placeholder="$t('myPage.editMemberInfo.editMemberInfo.placeholder8-2')"
          :model-value="memberInfo?.deliveryLoadNameAddress"
          :clearText="false"
          disabled
        />
        <WelfareInput
          class="wf_letter-spacing--1-2"
          :placeholder="$t('myPage.editMemberInfo.editMemberInfo.placeholder8-3')"
          :model-value="memberInfo?.deliveryDetailedAddress"
          @update:model-value="(v) => setMemberInfo('deliveryDetailedAddress', v)"
          :clearText="false"
        />
      </div>
      <div class="wf-mt-20 wf-px-16">
        <WelfareInput
          :title="$t('myPage.editMemberInfo.editMemberInfo.subTitle9')"
          :model-value="memberInfo.email"
          @update:model-value="(v) => setMemberInfo('email', v)"
        >
          <template #suffix>
            <p class="wf-mt-10 wf-font_14-reg--lp1 wf-color--g-999">{{ $t('myPage.editMemberInfo.editMemberInfo.desc9') }}</p>
          </template>
        </WelfareInput>
      </div>
      <hr class="break-line wf-mt-20" />
      <div class="wf-mt-20 wf-px-16">
        <p class="wf_ui-kit-title-17">{{ $t('myPage.editMemberInfo.editMemberInfo.subTitle10') }}</p>
        <div class="wf_flex wf-jc-sb wf-mt-20">
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareCheckbox
              inputId="marketingAgreeYn"
              :model-value="getYn('marketingAgreeYn')"
              @update:model-value="(yn) => setYn('marketingAgreeYn', yn)"
              true-value="Y"
              false-value="N"
            />
            <label class="wf-font_15--reg-p wf-color--g-333" for="marketingAgreeYn">{{
              $t('myPage.editMemberInfo.editMemberInfo.checkbox10-1')
            }}</label>
          </div>
          <button type="button" class="wf-font_15--reg-p wf-color--g-999 wf-text-underline" @click="handleShowAgreement">
            {{ $t('myPage.editMemberInfo.editMemberInfo.buttonName10') }}
          </button>
        </div>

        <div class="wf-pl-18 wf-mt-20 wf_flex wf-jc-sb">
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareCheckbox
              inputId="smsAgreeYn"
              :model-value="getYn('smsAgreeYn')"
              @update:model-value="(yn) => setYn('smsAgreeYn', yn)"
              true-value="Y"
              false-value="N"
            />
            <label class="wf-font_15--reg-p wf-color--g-333" for="smsAgreeYn">{{ $t('myPage.editMemberInfo.editMemberInfo.checkbox10-2') }}</label>
          </div>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareCheckbox
              inputId="emailAgreeYn"
              :model-value="getYn('emailAgreeYn')"
              @update:model-value="(yn) => setYn('emailAgreeYn', yn)"
              true-value="Y"
              false-value="N"
            />
            <label class="wf-font_15--reg-p wf-color--g-333" for="emailAgreeYn">{{ $t('myPage.editMemberInfo.editMemberInfo.checkbox10-3') }}</label>
          </div>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareCheckbox
              inputId="kakaoAgreeYn"
              :model-value="getYn('kakaoAgreeYn')"
              @update:model-value="(yn) => setYn('kakaoAgreeYn', yn)"
              true-value="Y"
              false-value="N"
            />
            <label class="wf-font_15--reg-p wf-color--g-333" for="kakaoAgreeYn">{{ $t('myPage.editMemberInfo.editMemberInfo.checkbox10-4') }}</label>
          </div>
        </div>

        <div class="wf-mt-30">
          <WelfareButtonLine class="wf_w-full" type-action="submit" type="lg" :text="$t('myPage.editMemberInfo.editMemberInfo.buttonDone')" />
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
// wf_ui-kit-title-17 클래스를 쓰기 위함
@import url('@/assets/styles/uikit/_welfare-container.scss');
.wf-jc-sb {
  justify-content: space-between;
}
.break-line {
  height: 5px;
  border: 1px solid #f0f0f0;
  background-color: #f5f5f5;
}
</style>
