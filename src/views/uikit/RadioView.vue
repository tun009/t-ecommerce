<script setup lang="ts">
import WelfareRadio from '@/components/uikit/input/WelfareRadio.vue'
import { ref } from 'vue'

const radioOne = ref(true)
const radioSecond = ref(false)
</script>

<template>
  <div class="wf_flex wf_flex-col wf_justify-center wf_items-center">
    <div class="wf-mt-30">
      <WelfareRadio name="radio1" v-model="radioOne" :value="true" />
    </div>
    <div class="wf-mt-30">
      <WelfareRadio name="radio1" v-model="radioOne" :value="false" />
    </div>

    <div class="wf-mt-30">
      <WelfareRadio name="radio2" disabled v-model="radioSecond" :value="true" />
    </div>
    <div class="wf-mt-30">
      <WelfareRadio name="radio2" disabled v-model="radioSecond" :value="false" />
    </div>
  </div>
</template>
