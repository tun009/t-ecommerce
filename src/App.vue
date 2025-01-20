<script setup lang="ts">
import ContentApp from './ContentApp.vue'
import { useModalProvide } from './composables/common/useModal'
import { useModalBottomSheetProvide } from './composables/common/useModalBottomSheet'
import { useAlertProvide } from './composables/common/useAlert'
import ModalGlobalContainer from './components/widgets/modal/ModalGlobalContainer.vue'
import ModalBottomSheetGlobalContainer from './components/widgets/modal/ModalBottomSheetGlobalContainer.vue'
import WelfareAlertContainer from './components/uikit/alert/WelfareAlertContainer.vue'
import { useLoadingProvide } from './composables/common/useLoading'
import LoadingComponent from './components/layout/LoadingComponent.vue'

const modalProps = useModalProvide()
const { bottomSheetRef, modal: modalBottomSheet } = useModalBottomSheetProvide()
const alertsData = useAlertProvide()
const { loading, size } = useLoadingProvide()
</script>

<template>
  <ContentApp />
  <LoadingComponent :loading="loading" :size="size" />
  <ModalGlobalContainer v-bind="modalProps" />
  <ModalBottomSheetGlobalContainer ref="bottomSheetRef" v-bind="modalBottomSheet" />
  <WelfareAlertContainer :alerts="alertsData.alerts" />
</template>
