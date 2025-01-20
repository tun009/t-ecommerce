<script setup lang="ts">
import { computed } from 'vue'
interface IconStarProps {
  empty?: boolean
  small?: boolean
}
const props = withDefaults(defineProps<IconStarProps>(), {
  empty: false
})

const width = computed(() => {
  return props.small ? '16' : '29'
})

const color = computed(() => {
  return !props.empty ? '#F6CF00' : '#CCCCCC'
})
</script>

<template>
  <svg :width="width" :height="width" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="star">
      <path
        id="Star 1"
        d="M7.06837 2.3884C7.39945 1.5396 8.60054 1.5396 8.93163 2.3884L9.97732 5.06919C10.1166 5.42638 10.4479 5.67246 10.8301 5.70268L13.6654 5.92686C14.5431 5.99626 14.9092 7.08412 14.2521 7.67011L12.0105 9.66895C11.7377 9.91225 11.6193 10.285 11.7019 10.6412L12.3846 13.5857C12.5878 14.4623 11.6204 15.1403 10.8658 14.6503L8.54462 13.1429C8.2134 12.9278 7.7866 12.9278 7.45537 13.1429L5.13423 14.6503C4.3796 15.1403 3.41223 14.4623 3.61544 13.5857L4.29809 10.6412C4.38065 10.285 4.26231 9.91225 3.98947 9.66895L1.74792 7.67011C1.09077 7.08412 1.45691 5.99626 2.33464 5.92686L5.16987 5.70268C5.55208 5.67246 5.88336 5.42638 6.02268 5.06919L7.06837 2.3884Z"
        :fill="color"
      />
    </g>
  </svg>
</template>
