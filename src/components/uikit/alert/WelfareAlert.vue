<script setup lang="ts">
import { defaultColor } from '@/commons'
import IconClose from '@/components/icons/IconClose.vue'
import { useAlertItem } from '@/composables/uikits/useAlertItem'
import { WelfareAlertEmits, WelfareAlertViewProps } from '@/models/uikits/WelfareAlertTypes'

const props = defineProps<WelfareAlertViewProps>()
const onClosed = () => {
  emits('closed')
}
const emits = defineEmits<WelfareAlertEmits>()
const { className, isHideAlert, handleClose } = useAlertItem(props.data, onClosed)
</script>

<template>
  <div class="wf-alert-container wf-space-x-6 wf-alert-show" :class="[className, { 'wf-alert-alert-hide': isHideAlert }]">
    <div class="wf-font_13--reg wf_flex-1" v-html="props.data.message" />
    <button @click="handleClose">
      <IconClose :color="defaultColor.white" />
    </button>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-alert.scss');
</style>
