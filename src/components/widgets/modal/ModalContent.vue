<script setup lang="ts">
import { ModalContainerProps } from '@/models/widgets/modal'
interface WelfareModalContentComponent {
  data: ModalContainerProps<any>
  onClose: () => void
}
defineProps<WelfareModalContentComponent>()
</script>
<template>
  <div class="wf-modal-container-main">
    <div @click="onClose" class="wf-modal-overlay"></div>
    <div class="wf-modal-content">
      <component :is="data.component" v-bind="data.props ?? {}" v-on="data.events ?? {}" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-modal.scss');
</style>
