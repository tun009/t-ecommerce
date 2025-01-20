<script setup lang="ts">
import { formatSecondsToTimeHHMMSS, timeProductStartCountDown } from '@/commons'
import { useProductCountDownTime } from '@/composables/products/detail/useProductCountDownTime'
import { computed } from 'vue'

interface Props {
  timeCount?: string
  message?: string
}

const props = defineProps<Props>()
const { times } = useProductCountDownTime(props.timeCount ?? '')
const messageDisplay = computed(() => {
  return Number(props.timeCount ?? 0) < timeProductStartCountDown ? formatSecondsToTimeHHMMSS(+times.value) : props.message
})
</script>
<template>
  <div v-if="props.timeCount" class="wf_unit-product-tag wf-bg--g-555 wf-color--g-fff wf-font_15--mid">
    {{ messageDisplay }}
  </div>
</template>
