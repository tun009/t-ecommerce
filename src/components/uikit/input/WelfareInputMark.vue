<script setup lang="ts">
import { WelfareInputEmits, WelfareInputMaskProps } from '@/models/uikits/WelfareInputTypes'
import { computed, ref } from 'vue'
import WelfareFormTitle from '../form/WelfareFormTitle.vue'
import IconClear from '@/components/icons/IconClear.vue'
import IconDisableEye from '@/components/icons/IconDisableEye.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import InputMask from 'primevue/inputmask'

const props = withDefaults(defineProps<WelfareInputMaskProps>(), {
  type: 'text',
  clearText: true,
  showMaxLength: true
})
const emit = defineEmits<WelfareInputEmits>()
const inputRef = ref()
const inputType = ref(props.type)

const handleClearText = () => {
  inputRef.value = ''
  emit('update:modelValue', '')
}

const handleClickEye = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}

const classInput = computed(() => {
  return `${props.classWrapInput} wf_input-wrap wf_relative wf_width-full 
    ${props.errorText ? ' wf-error ' : ''} 
    ${props.searchIcon ? ' wf-input-search ' : ''} 
    ${props.disabled ? ' wf-disabled ' : ''} 
    ${props.modelValue ? ' wf-input-entered ' : ''}
  `
})
</script>

<template>
  <div :class="`wf_flex wf_flex-col wf-space-y-10 wf_width-full ${props.class} `">
    <WelfareFormTitle v-if="!!props.title" :title="props.title" :required="props.required" />
    <div :class="props.classWrap">
      <slot name="prefix" />
      <div :class="classInput">
        <InputMask
          v-bind="props"
          :v-on="$emit || {}"
          :readonly="props.readonly"
          :modelValue="props?.modelValue"
          :placeholder="placeholder"
          :disabled="props.disabled"
          @update:modelValue="(value) => emit('update:modelValue', value)"
        />
        <span v-if="props.showMaxLength && props.maxLength" class="wf-input-count-max"
          >{{ props.modelValue?.length ?? 0 }} / {{ props.maxLength }}</span
        >
        <div class="wf-input-count-max wf-input-search-icon">
          <div class="wf-pointer" v-if="props.clearText && (props.modelValue?.length ?? 0) > 0" @click="handleClearText">
            <IconClear />
          </div>
          <IconSearch v-if="props.searchIcon" />
          <div class="wf-pointer" v-if="props.passwordIcon" @click="handleClickEye">
            <IconDisableEye v-if="inputType === 'password'" />
            <IconEye v-else />
          </div>
        </div>
        <slot name="last-content"></slot>
        <div v-if="!!props.errorText" class="wf-input-text-error">{{ props.errorText }}</div>
      </div>
      <slot name="suffix" />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-input.scss');
</style>
