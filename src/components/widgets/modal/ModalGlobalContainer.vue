<script setup lang="ts">
import { useModal } from '@/composables/common/useModal'
import { ModalContainerProps } from '@/models/widgets/modal'
import ModalContent from './ModalContent.vue'
defineProps<{ modals: ModalContainerProps<any>[] }>()
const { closeModalByPop } = useModal()
</script>

<template>
  <div v-if="modals?.length" class="wf-modal-container">
    <ModalContent v-for="(modalItem, index) in modals" :key="index" :data="modalItem" :onClose="() => closeModalByPop?.()" />
  </div>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-modal.scss');
</style>
