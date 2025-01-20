<script setup lang="ts">
import WelfareModalContentFullscreen from './modalFakeView/WelfareModalContentFullscreen.vue'
import WelfareModalContentSwipeHalfScreen from './modalFakeView/WelfareModalContentSwipeHalfScreen.vue'
import WelfareModalContent from './modalFakeView/WelfareModalContent.vue'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import WelfareContainer from '@/components/uikit/WelfareContainer.vue'
import WelfareTitleInfo from '@/components/uikit/WelfareTitleInfo.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'

const { showModal, closeModal } = useModalBottomSheet()

const handleShowSwipeFullModal = () => {
  showModal?.({
    type: ModalBottomSheetType.swipeFullscreen,
    component: WelfareModalContentFullscreen
  })
}

const handleShowFullModal = () => {
  showModal?.({
    type: ModalBottomSheetType.click,
    component: WelfareModalContent,
    props: {
      title: '쿠폰'
    },
    events: {
      close: closeModal
    }
  })
}

const handleShowSwipeFit = () => {
  showModal?.({
    type: ModalBottomSheetType.swipeFitContent,
    component: WelfareModalContentSwipeHalfScreen,
    disableDraggingContent: true,
  })
}
</script>

<template>
  <WelfareContainer title="COMPONENT" class="wf_width-auto">
    <WelfareTitleInfo title="Modal Popup" des="활용법" subDes=" 배경 DIM컬러는 #000000, 50%를 적용합니다." />
    <div class="wf-bg--g-f-3-f-3 wf_flex wf_flex-col wf_justify-center wf_items-center wf-pb-20 wf-px-20">
      <div class="wf-pt-30 wf_grid wf_grid-cols-2 wf-pb-20 wf-br--g-bbb wf-border-width-b-1 wf_width-full">
        <span class="wf-font_15--mid wf-color--g-777">Header - Navigation Bar</span>
      </div>

      <div class="wf-pt-20 wf_flex wf_justify-center wf_flex-wrap wf-space-x-20 wf-space-y-20 wf_width-full">
        <WelfareButtonLine type="md" text="Show modal swipe full" @click="handleShowSwipeFullModal" />
        <WelfareButtonLine type="md" text="Show modal bottom sheet" @click="handleShowFullModal" />
        <WelfareButtonLine type="md" text="Show modal swipe" @click="handleShowSwipeFit" />
      </div>
    </div>
  </WelfareContainer>
</template>
