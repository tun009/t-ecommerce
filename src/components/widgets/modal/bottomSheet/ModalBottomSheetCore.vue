<script lang="ts" setup>
import { DEFAULT_DURATION_SWIPE_BUTTON_SHEET } from '@/commons'
import { BaseModalEmits, ModalBottomSheetProps, ModalBottomSheetType } from '@/models/widgets/modal'
import VueBottomSheet from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { ref, defineExpose, onMounted, watch } from 'vue'

const props = withDefaults(defineProps<ModalBottomSheetProps>(), {
  transitionDuration: DEFAULT_DURATION_SWIPE_BUTTON_SHEET
})

defineEmits<BaseModalEmits>()

const bottomSheet = ref()
const bottomSheetCheck = ref()

const open = () => {
  bottomSheet.value.open()
}

const close = () => {
  bottomSheet.value.close()
}

defineExpose({
  open,
  close
})

const initStyle = () => {
  const parentBottomSheet = bottomSheetCheck.value.closest('.bottom-sheet')
  if (parentBottomSheet) {
    parentBottomSheet.removeAttribute('class')
    let parentClass = 'wf-modal-full-screen-bottom-sheet'
    if (props.type == ModalBottomSheetType.swipeFitContent) {
      parentClass = 'wf-modal-swipe-fit-content-bottom-sheet'
    } else if (props.type == ModalBottomSheetType.swipeFullscreen) {
      parentClass = 'wf-modal-swipe-full-screen-bottom-sheet'
    }
    parentBottomSheet.classList?.add('bottom-sheet')
    parentBottomSheet.classList?.add(parentClass)

    if (props.hideHeader) {
      parentBottomSheet.classList?.add('wf-modal-hide-header')
    } else {
      parentBottomSheet.classList?.remove('wf-modal-hide-header')
    }
  }
}

onMounted(() => {
  initStyle()
  setTimeout(() => open())
})

watch(() => [props.type, props.hideHeader], initStyle)
</script>

<template>
  <VueBottomSheet
    ref="bottomSheet"
    :can-swipe="props.type != ModalBottomSheetType.click"
    :overlay="props.type == ModalBottomSheetType.swipeFitContent"
    :overlay-click-close="props.type == ModalBottomSheetType.swipeFitContent"
    :transition-duration="props.transitionDuration"
    @closed="$emit('onClose')"
  >
    <div ref="bottomSheetCheck"></div>
    <template #footer v-if="props.disableDraggingContent">
      <slot />
    </template>
    <slot v-if="!props.disableDraggingContent"></slot>
  </VueBottomSheet>
</template>
