<script setup lang="ts">
import IconQuestionGreyCircle from '@/components/icons/IconQuestionGreyCircle.vue'
import { WelfareTooltipProps } from '@/models/uikits/WelfareTooltipTypes'
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<WelfareTooltipProps>(), {
  visible: false,
  type: 'top',
  position: 'center'
})

const toolTipRef = ref()

onMounted(() => {
  if (toolTipRef.value) {
    if (props.type == 'right') {
      toolTipRef.value.parentElement.classList.add('wf_relative')
    } else {
      toolTipRef.value.classList.add('wf_relative')
    }
  }
})
</script>

<template>
  <div :class="`wf-tooltip-wrap ${props.visible && ' wf-visible '}`" ref="toolTipRef">
    <slot name="content"></slot>
    <IconQuestionGreyCircle />
    <div :class="`wf-tooltip wf-font_13--reg wf-tooltip-${props.type} wf-tooltip-position-${props.position} `">{{ props.text }}</div>
  </div>
</template>
<style scoped>
@import url('@/assets/styles/uikit/_welfare-tooltip.scss');
</style>
