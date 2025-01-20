'
<script setup lang="ts">
import WelfareStarInput from '@/components/uikit/score/WelfareStarInput.vue'
import { ref } from 'vue'

interface WelfareScoreProps {
  small?: boolean
  readonly?: boolean
  value?: string
  rating?: number
  index?: number
}

const starsInfo = [
  { value: '5.0', isHalf: false },
  { value: '4.5', isHalf: true },
  { value: '4.0', isHalf: false },
  { value: '3.5', isHalf: true },
  { value: '3.0', isHalf: false },
  { value: '2.5', isHalf: true },
  { value: '2.0', isHalf: false },
  { value: '1.5', isHalf: true },
  { value: '1.0', isHalf: false },
  { value: '0.5', isHalf: true }
]

const { small, rating, index } = withDefaults(defineProps<WelfareScoreProps>(), {
  small: false,
  value: ''
})

const rate = ref(rating ? rating?.toFixed(1) : '0.5')
const emits = defineEmits<(e: 'handleClickRating', value: string) => void>()
const handleClickRating = (value: string) => {
  rate.value = value
  emits('handleClickRating', value)
}
</script>
<template>
  <div class="rating-container wf_flex wf_items-center wf-space-x-10">
    <div class="rating-field">
      <template v-for="(star, i) in starsInfo" :key="i">
        <WelfareStarInput
          :onClickRating="handleClickRating"
          :value="star.value"
          :isHalf="star.isHalf"
          :isChecked="rate === star.value"
          :small="small"
          :readonly="readonly"
          :index="index"
        />
      </template>
    </div>
    <div class="rating-rate" :class="{ 'wf-font_15--reg wf-color--g-555 small': small, 'wf-font_23--bold wf-mt-2': !small }">
      <span>{{ rate }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.rating {
  &-field {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 2px;
    margin-bottom: 3px;
    input:checked ~ label,
    labeL:hover,
    labeL:hover ~ label {
      transition: 0.2s;
      color: #f6cf00;
    }
  }
  &-rate {
    min-width: 35px;
  }
}
</style>
'
