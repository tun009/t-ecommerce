<script lang="ts" setup>
import { defaultColor } from '@/commons'
import IconHeartActive from '@/components/icons/IconHeartActive.vue'
import IconHeartInActive from '@/components/icons/IconHeartInActive.vue'
import { WelfareButtonHeartEmits, WelfareButtonHeartProps } from '@/models/uikits/WelfareButtonTypes'
import { computed } from 'vue'

const emits = defineEmits<WelfareButtonHeartEmits>()
const props = withDefaults(defineProps<WelfareButtonHeartProps>(), {
  type: 'lg'
})

const handleClick = () => {
  emits('update:isActive', !props.isActive)
}

const size = computed(() => {
  if (props.size) return props.size
  return props.type === 'sm' ? 20 : 30
})
</script>
<template>
  <button :disabled="props.disabled" class="btn-heart" :class="[type]" @click="handleClick">
    <IconHeartInActive v-if="props.disabled" :width="size" :height="size" :color="defaultColor.gray_dd" />
    <template v-else>
      <IconHeartActive :width="size" :height="size" v-if="props.isActive" />
      <IconHeartInActive :width="size" :height="size" v-else />
    </template>
  </button>
</template>

<style scoped>
@import url('@/assets/styles/uikit/_welfare-button-heart.scss');
</style>
