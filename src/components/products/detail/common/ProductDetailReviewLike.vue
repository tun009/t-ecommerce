<script setup lang="ts">
import { MAX_REVIEW_LIKE, defaultColor } from '@/commons'
import IconReviewLike from '@/components/icons/IconReviewLike.vue'
interface ProductDetailReviewLikeProps {
  class?: string
  like?: boolean
  value: number
}

defineProps<ProductDetailReviewLikeProps>()
</script>

<template>
  <div
    class="wf_flex wf_items-center wf_justify-center wf-space-x-4 wf-pr-12 wf-pl-10 wf-py-5 wf_border-radius-999 wf-br-1 wf-transition-03 wf-pointer"
    :class="$props.like ? ' wf-bg--red-ff-3-b-4-f wf-br--red-ff-3-b-4-f' : ' wf-br--g-e-7'"
  >
    <IconReviewLike :color="$props.like ? defaultColor.white : defaultColor.gray4" />
    <span class="wf-font_15--mid wf_letter-spacing--1" :class="$props.like ? 'wf-color--g-fff' : 'wf-color--g-555'">{{
      $props.value < MAX_REVIEW_LIKE ? $props.value : `${MAX_REVIEW_LIKE}+`
    }}</span>
  </div>
</template>
