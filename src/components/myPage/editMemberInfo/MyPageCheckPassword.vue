<script setup lang="ts">
import { reactive, defineProps, computed } from 'vue'
// import { useMyPageCheckPassword } from '@/composables/myPage/useMyPageCheckPassword' // check password hook

import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'

// TODO: 정규식 추가 필요 (영문, 숫자, 특문 혼합 8~20자)

const { hookMyPageCheckPassword } = defineProps(['hookMyPageCheckPassword'])

const { inputObj, setInputObj, checkPassword } = reactive(hookMyPageCheckPassword)

const isDisabled = computed(() => !(inputObj.password.length > 0 && inputObj.password.length > 0))
</script>

<template>
  <form @submit.prevent="checkPassword">
    <div class="wf-relative wf-px-16">
      <div class="wf-py-41 wf-font_17--reg wf_text-center wf_white-space--pre-line wf_letter-spacing--1">
        <p>{{ $t('myPage.editMemberInfo.checkPassword.description') }}</p>
      </div>
      <div>
        <WelfareInput v-model="inputObj.id" :clearText="false" disabled />
      </div>
      <div class="wf-mt-10">
        <WelfareInput
          type="password"
          :errorText="hookMyPageCheckPassword.failMsg"
          :placeholder="$t('myPage.editMemberInfo.checkPassword.placeholderPw')"
          :model-value="inputObj.password"
          @update:model-value="(v) => setInputObj('password', v)"
          @keyup.enter="
            (e: KeyboardEvent) => {
              if (!isDisabled) (e.target as HTMLElement).blur()
            }
          "
          passwordIcon
        />
      </div>
      <div class="wf-mt-44">
        <WelfareButtonLine
          class="wf_w-full"
          type="lg"
          type-action="submit"
          :disabled="isDisabled"
          :text="$t('myPage.editMemberInfo.checkPassword.buttonDone')"
        />
      </div>
    </div>
  </form>
</template>
