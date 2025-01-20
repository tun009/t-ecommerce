<script setup lang="ts">
import { formatNumberDot } from '@/commons'
import WelfareColorTag from '@/components/uikit/tag/WelfareColorTag.vue'
import { computed } from 'vue'

interface MyPageWelfarePointItemProps {
  topText: string
  topTextNote?: string
  title: string
  note?: string
  amount: number
  unit: string
  isUse?: boolean
  hideTag?: boolean
}

const props = defineProps<MyPageWelfarePointItemProps>()

const positiveNumberAmount = computed(() => {
  return props.amount > 0 ? props.amount : -1 * props.amount
})
</script>

<template>
  <div class="wf_flex wf_flex-col wf-py-20 wf-br-b-1 wf-br--g-e-7" :class="$props.hideTag ? 'wf-space-y-11' : 'wf-space-y-5'">
    <div class="wf_flex wf_items-center wf_justify-between" v-if="!$props.hideTag">
      <span class="wf-font_13--mid wf_letter-spacing--1 wf-color--g-777">{{ $props.topText }}</span>
      <WelfareColorTag class="wf_min-width-31" active text="적립" v-if="!isUse" />
      <WelfareColorTag class="wf_min-width-31" disabled text="사용" v-else />
    </div>
    <div class="wf_flex wf_items-center wf-space-x-6" v-else>
      <div
        class="wf_min-width-73 wf_flex wf_items-center wf_justify-center wf-px-10 wf-py-4 wf-font_13--light wf_letter-spacing--1 wf-color--g-555 wf-br-1 wf-br--g-e-7"
      >
        {{ $props.topText }}
      </div>
      <span class="wf-font_13--reg wf-color--g-777">{{ $props.topTextNote }}</span>
    </div>
    <div class="wf_flex wf_items-center wf_justify-between">
      <div class="wf_flex wf_flex-col wf-space-y-9">
        <span class="wf-font_15--mid wf-color--g-333">{{ $props.title }}</span>
        <span class="wf-font_13--reg wf-color--g-777" v-if="$props.note">{{ $props.note }}</span>
      </div>
      <span :class="`wf-font_17--semi  ${$props.isUse ? 'wf-color--red-ff-3-b-4-f' : 'wf-color_blue'}`">{{
        `${$props.isUse ? '-' : '+'} ${formatNumberDot(positiveNumberAmount)}${$props.unit}`
      }}</span>
    </div>
  </div>
</template>
