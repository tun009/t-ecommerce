<script setup lang="ts">
import { useModalBottomSheet } from '@/composables/common/useModalBottomSheet'
import { ModalBottomSheetType } from '@/models/widgets/modal'
import MyPageRefundInformationModal from '../myPage/modal/MyPageRefundInformationModal.vue'
import WelfareButtonLine from '@/components/uikit/button/WelfareButtonLine.vue'

const { showModal, closeModal } = useModalBottomSheet()

const handleShowRefundInformationModal = () => {
  showModal?.({
    type: ModalBottomSheetType.swipeFitContent,
    component: MyPageRefundInformationModal,
    hideHeader: true,
    props: {
      title: 'myPage.refundInformation.titleShipping',
      showCheckbox: false,
      disappearCheckbox: true,
      orderKey: 0
    },
    events: {
      close: () => {
        closeModal?.()
      }
    }
  })
}
</script>

<template>
  <div class="wf_flex wf_justify-center wf_items-center wf_width-full wf_height-screen">
    <WelfareButtonLine type="lg" lg-state="grey-line" text="show return shipping fee payment" @click="handleShowRefundInformationModal" />
  </div>
</template>
