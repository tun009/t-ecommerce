<script setup lang="ts">
interface MyPageWelfarePointCouponItemProps {
  title: string
  amount: string
  unit: string
  note: string
  tag?: string
  timeLeft?: string
  timeRight?: string
}

defineProps<MyPageWelfarePointCouponItemProps>()
</script>

<template>
  <div class="wf-px-20 wf-pt-26 wf-pb-26 wf-br-1 wf-br--g-e-7">
    <div class="wf_flex wf_flex-col wf-space-y-13 wf_relative">
      <div class="wf_flex wf_flex-col wf-space-y-8">
        <span class="wf-font_15--bold wf-color--g-333 wf_letter-spacing--1 wf-line-clamp-1">{{ $props.title }}</span>
        <div :class="`wf-color--red-ff-3-b-4-f wf_flex wf-space-x-3 wf_items-center `">
          <span :class="`wf-font_21--bold`">{{ $props.amount }}</span>
          <span :class="`wf-font_13--mid`">{{ $props.unit }}</span>
        </div>
      </div>
      <div class="wf_flex wf_flex-col wf-space-y-8 wf-font_13--reg wf-color--g-777 wf_letter-spacing--1-68">
        <span class="">{{ $props.note }}</span>
        <div class="wf_flex wf-space-x-8" v-if="$props.timeLeft && $props.timeRight">
          <span class="">{{ $props.timeLeft }}</span>
          <span v-if="$props.timeRight">|</span>
          <span v-if="$props.timeRight">{{ $props.timeRight }}</span>
        </div>
      </div>

      <div
        class="wf_absolute wf_min-width-44 wf_right-0 wf_bottom-0 wf-py-6 wf-px-10 wf-bg--red-ff-3-b-4-f wf-font_15--bold wf-color--g-fff wf_letter-spacing--1"
        v-if="$props.tag"
      >
        {{ $props.tag }}
      </div>
    </div>
  </div>
</template>
