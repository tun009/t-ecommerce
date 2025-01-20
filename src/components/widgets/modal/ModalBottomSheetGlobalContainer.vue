<script setup lang="ts">
import { ref } from 'vue'
import { ModalBottomSheetContainerProps } from '@/models/widgets/modal'
import ModalBottomSheetCore from './bottomSheet/ModalBottomSheetCore.vue'

defineProps<ModalBottomSheetContainerProps<any>>()
const modalButtonSheetRef = ref<any>()

defineExpose({
  open: () => {
    modalButtonSheetRef.value?.open()
  },
  close: () => {
    modalButtonSheetRef.value?.close()
  }
})
</script>

<template>
  <ModalBottomSheetCore v-if="!!$props?.component" ref="modalButtonSheetRef" :type="$props?.type" :hideHeader="$props?.hideHeader" :disableDraggingContent="$props.disableDraggingContent" @onClose="$props.onCloseModalBottom">
    <component :is="$props.component" v-bind="$props.props ?? {}" v-on="$props.events ?? {}" />
  </ModalBottomSheetCore>
</template>
