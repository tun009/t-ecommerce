<script setup lang="ts">
import WelfareCheckbox from '@/components/uikit/input/WelfareCheckbox.vue'
import { ref } from 'vue'

const checkboxOne = ref(true)
const checkboxSecond = ref(false)
const checkboxThird = ref(true)
</script>

<template>
  <div class="wf_flex wf_flex-col wf_justify-center wf_items-center">
    <div class="wf-mt-30">
      <WelfareCheckbox v-model="checkboxOne" />
    </div>
    <div class="wf-mt-30">
      <WelfareCheckbox v-model="checkboxSecond" />
    </div>

    <div class="wf-mt-30">
      <WelfareCheckbox disabled />
    </div>
    <div class="wf-mt-30">
      <WelfareCheckbox disabled v-model="checkboxThird" />
    </div>
  </div>
</template>
