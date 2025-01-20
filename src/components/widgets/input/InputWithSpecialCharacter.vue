<script lang="ts" setup>
import { ENTER_KEY } from '@/commons'
import { WelfareInput } from '@/components/uikit/input'
import { useInputValidationSpecialCharacter } from '@/composables/widgets/input/useInputValidationSpecialCharacter'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { WelfareInputEmits, WelfareInputProps } from '@/models/uikits/WelfareInputTypes'
import { onMounted } from 'vue'

const props = withDefaults(defineProps<WelfareInputProps>(), {
  type: 'text',
  clearText: true,
  showMaxLength: true,
  autocomplete: 'new-password',
  clearIcon: false
})

const emits = defineEmits<WelfareInputEmits>()
const { openModal: openNotification } = useModalNotification()
const { inputElement, currentText, onKeyPress, pasteListener } = useInputValidationSpecialCharacter(props)

const setText = (text: string) => {
  inputElement.value.setText(text)
}

const handleClickSearch = () => {
  if (!props.modelValue) {
    openNotification({
      content: '검색어를 입력해주세요.'
    })
  } else {
    emits('click-icon-search')
  }
}

const handleKeyup = (event: KeyboardEvent) => {
  if (event.key === ENTER_KEY) {
    if (!props.modelValue) {
      openNotification({
        content: '검색어를 입력해주세요.'
      })
    } else {
      emits('click-icon-search')
    }
  }
}

onMounted(() => {
  inputElement.value?.setFocus()
})

const setBlur = () => {
  inputElement.value?.setBlur()
}

defineExpose({
  setText,
  setBlur
})
</script>

<template>
  <WelfareInput
    ref="inputElement"
    v-bind="props"
    :v-on="$emit || {}"
    v-model="currentText"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    @keypress="onKeyPress"
    @paste="pasteListener"
    @keyup="handleKeyup"
    @click-icon-search="handleClickSearch"
    @click-icon-clear="emits('click-icon-clear')"
    @click-input="emits('click-input')"
  />
</template>
