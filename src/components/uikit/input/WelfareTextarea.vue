<script setup lang="ts">
import { WelfareTextareaEmits, WelfareTextareaProps } from '@/models/uikits/WelfareInputTypes'
import WelfareFormTitle from '../form/WelfareFormTitle.vue'
import { ref } from 'vue';
const refInput = ref<HTMLTextAreaElement>()

const props = defineProps<WelfareTextareaProps>()
const emits = defineEmits<WelfareTextareaEmits>()

defineExpose({
  clearInput: () => {
    if(refInput?.value) {
      refInput.value.value = ''
    }
  }
})

</script>
<template>
  <div :class="`wf_flex wf_flex-col wf-space-y-10 wf_width-full ${props.class} `">
    <WelfareFormTitle v-if="props.title" :title="props.title" :required="props.required || props.onlyRequiredTitle" />
    <textarea
      ref="refInput"
      v-bind="props"
      @input="(event: any) => emits('update:modelValue', event.target.value)"
      @focus="(event) => emits('focus', event)"
      @blur="(event) => emits('blur', event)"
    />
    <div v-if="props.showMaxLength" class="wf_flex wf_justify-end wf-items-center wf-font_15--reg wf-space-x-2 wf-color--g-999" :class="props.classMaxlength">
      <span>{{ props.modelValue?.length ?? 0 }}</span
      ><span class="wf_flex wf-items-center">/</span><span>{{ props.maxLength }}</span>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-input.scss');
</style>
