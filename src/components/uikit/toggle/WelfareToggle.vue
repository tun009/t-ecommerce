<script setup lang="ts">
import { WelfareToggleEmits, WelfareToggleProps } from '@/models/uikits/WelfareToggleType'
import InputSwitch from 'primevue/inputswitch'
import { ref } from 'vue'

const props = defineProps<WelfareToggleProps>()
const emit = defineEmits<WelfareToggleEmits>()
const checked = ref(props.modelValue)
const eventEmit = (newValue: boolean) => {
  emit('update:modelValue', newValue)
}
</script>

<template>
  <InputSwitch v-bind="props" v-model="checked" @update:model-value="eventEmit" />
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-toggle.scss');
</style>
