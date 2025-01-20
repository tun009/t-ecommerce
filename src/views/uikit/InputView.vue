<script setup lang="ts">
import WelfareInput from '@/components/uikit/input/WelfareInput.vue'
import { ref } from 'vue'

const textOne = ref('비밀번호는 영문,숫자,특수문자 혼합 8-20자')
const textSecond = ref('Text')
</script>

<template>
  <div class="wf_grid wf_grid-cols-2">
    <div class="wf_flex wf_flex-col wf_justify-center wf_items-center wf_width-343 wf-space-y-20 wf-mx-auto wf-mt-16">
      <div class="wf_height-5"></div>
      <WelfareInput placeholder="비밀번호는 영문,숫자,특수문자 혼합 8-20자" />
      <div class="wf_height-5"></div>
      <WelfareInput placeholder="비밀번호는 영문,숫자,특수문자 혼합 8-20자" v-model="textOne" :clear-text="false" />
      <div class="wf_height-5"></div>
      <WelfareInput placeholder="비밀번호는 영문,숫자,특수문자 혼합 8-20자" disabled />
    </div>
    <div class="wf_flex wf_flex-col wf_justify-center wf_items-center wf_width-343 wf-space-y-20 wf-mx-auto wf-mt-16">
      <WelfareInput title="Title" placeholder="text" />
      <WelfareInput title="Title" placeholder="text" v-model="textSecond" :clear-text="false" />
      <WelfareInput title="Title" placeholder="text" disabled />
    </div>
  </div>
</template>
