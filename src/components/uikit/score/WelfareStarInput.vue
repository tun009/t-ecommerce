<script setup lang="ts">
import IconHalfStar from '@/components/icons/IconHalfStar.vue'
import IconStarReview from '@/components/icons/IconStarReview.vue'

interface WelfareScoreProps {
  value: string
  isHalf: boolean
  onClickRating: (value: string) => void
  isChecked: boolean
  small?: boolean
  readonly?: boolean
  index?: number
}

const { value, isChecked, isHalf, small, index, readonly, onClickRating } = withDefaults(defineProps<WelfareScoreProps>(), {
  value: '',
  isHalf: false,
  isChecked: false,
  small: false,
  readonly: true
})
</script>
<template>
  <input type="radio" :name="`${index ?? 'rating'}`" :id="`${index ? `star${index}` : `star${value}`}`" :value="value" :checked="isChecked" />
  <label
    :class="{
      isHalf: isHalf,
      'isHalf-small': small && isHalf,
      readonly: readonly
    }"
    :for="`${index !== undefined ? `star${index}` : `star${value}`}`"
    @click="() => onClickRating(value)"
  >
    <IconStarReview :small="small" v-if="!isHalf" />
    <IconHalfStar :small="small" v-else />

    <!-- <IconStar   /> -->
    <!-- <IconHalfStar /> -->
  </label>
</template>

<style scoped="scss">
input {
  display: none;
}
label {
  cursor: pointer;
  color: #cccccc;
  font-size: 1.5rem;
  &.readonly {
    pointer-events: none;
  }
}
.isHalf {
  position: absolute;
  width: 14px;
  overflow: hidden;

  &:nth-of-type(10) {
    transform: translate(-139px);
  }
  &:nth-of-type(8) {
    transform: translate(-108px);
  }
  &:nth-of-type(6) {
    transform: translate(-77px);
  }
  &:nth-of-type(4) {
    transform: translate(-46px);
  }
  &:nth-of-type(2) {
    transform: translate(-15px);
  }
}
.isHalf-small {
  position: absolute;
  width: 12px;
  overflow: hidden;

  &:nth-of-type(10) {
    transform: translate(-76.3px);
  }
  &:nth-of-type(8) {
    transform: translate(-58.5px);
  }
  &:nth-of-type(6) {
    transform: translate(-40px);
  }
  &:nth-of-type(4) {
    transform: translate(-22px);
  }
  &:nth-of-type(2) {
    transform: translate(-4px);
  }
}
</style>
