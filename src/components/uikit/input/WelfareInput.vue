<script setup lang="ts">
import { WelfareInputEmits, WelfareInputExpose, WelfareInputProps } from '@/models/uikits/WelfareInputTypes'
import { computed, ref } from 'vue'
import WelfareFormTitle from '../form/WelfareFormTitle.vue'
import IconClear from '@/components/icons/IconClear.vue'
import IconDisableEye from '@/components/icons/IconDisableEye.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const props = withDefaults(defineProps<WelfareInputProps>(), {
  type: 'text',
  clearText: true,
  showMaxLength: true,
  autocomplete: 'new-password',
  clearIcon: false
})
const emit = defineEmits<WelfareInputEmits>()
const inputRef = ref<HTMLInputElement>()
const inputType = ref(props.type)

const setText = (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  if (inputRef.value) inputRef.value.value = target.value
  emit('input', event)
  emit('update:modelValue', target.value)
}

const setTextRef = (text: string) => {
  if (inputRef.value) inputRef.value.value = text
  emit('update:modelValue', text)
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

const addEventListener = (event: string, listener: (event: Event) => void) => {
  const input = inputRef.value?.querySelector('input') as Element
  input?.addEventListener(event, listener)
}

const removeEventListener = (event: string, listener: (event: Event) => void) => {
  const input = inputRef.value?.querySelector('input') as Element
  input?.removeEventListener(event, listener)
}

const setFocus = () => {
  inputRef.value?.focus()
}

const setBlur = () => {
  inputRef.value?.blur()
}

defineExpose<WelfareInputExpose>({
  addEventListener: addEventListener,
  removeEventListener: removeEventListener,
  setText: setTextRef,
  setFocus: setFocus,
  setBlur: setBlur
})
</script>

<template>
  <div :class="`wf_flex wf_flex-col wf-space-y-10 wf_width-full ${props.class} `">
    <div v-if="!!props.title" :class="`wf_flex wf-space-x-5 ${props?.classWrapTitle}`">
      <WelfareFormTitle :title="props.title" :required="props.required || props.onlyRequiredTitle" />
      <slot name="title-suffix" />
    </div>
    <div :class="props.classWrap">
      <slot name="prefix" />
      <div :class="classInput">
        <input
          ref="inputRef"
          v-bind="props"
          :type="inputType"
          :value="props.modelValue"
          @input="(event: any) => setText(event)"
          @focus="(event) => emit('focus', event)"
          @blur="(event) => emit('blur', event)"
          @keyup="(event) => emit('keyup', event)"
          @keypress.stop="(event) => $emit('keypress', event)"
          @keydown="(event) => $emit('keydown', event)"
          @paste="(event) => $emit('paste', event)"
          @click="$emit('click-input')"
        />
        <span v-if="props.showMaxLength && props.maxLength" class="wf-input-count-max"
          >{{ props.modelValue?.length ?? 0 }} / {{ props.maxLength }}</span
        >
        <div class="wf-input-count-max wf-input-search-icon">
          <div
            class="wf-pointer"
            :class="props.clearIcon ? 'wf-mr--3_7' : ''"
            v-if="props.clearText && (props.modelValue?.length ?? 0) > 0"
            @click="
              () => {
                setTextRef('')
                emit('click-icon-clear')
              }
            "
          >
            <IconClear />
          </div>
          <IconSearch v-if="props.searchIcon" @click="emit('click-icon-search')" />
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
