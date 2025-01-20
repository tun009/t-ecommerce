<script setup lang="ts">
import { WelfareAlertData } from '@/models/uikits/WelfareAlertTypes'
import WelfareAlert from './WelfareAlert.vue'

const props = defineProps<{ alerts: WelfareAlertData[] }>()
</script>

<template>
  <div class="wf-alerts-group wf-space-y-8">
    <WelfareAlert v-for="item in props.alerts" :data="item" @closed="item?.onClose" :key="item.id" :message="item.message" :type="item.type" />
  </div>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-alert.scss');
</style>
