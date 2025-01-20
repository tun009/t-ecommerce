<!-- FO_MC_IT011020P, FO_MC_IT011021P, FO_MC_IT011022P -->
<script setup lang="ts">
import { TIME_HIDDEN_HEART_POPUP, defaultColor } from '@/commons'
import IconHeartActive from '@/components/icons/IconHeartActive.vue'
import { useModal } from '@/composables/common/useModal'
import { onMounted, computed } from 'vue'
import IconHeartBorder from '@/components/icons/IconHeartBorder.vue'
import IconCart from '@/components/icons/IconCart.vue'
import { ProductDetailHeartPopupType } from '@/models/views/products/ProductDetailHeartPopupModel'

interface Props {
  iconType: ProductDetailHeartPopupType
}

type Emits = (e: 'onClose') => void

const props = withDefaults(defineProps<Props>(), {
  iconType: ProductDetailHeartPopupType.active
})
const emits = defineEmits<Emits>()

const { closeModalByPop } = useModal()

onMounted(() => {
  setTimeout(() => {
    closeModalByPop?.()
    emits('onClose')
  }, TIME_HIDDEN_HEART_POPUP)
})

const textMessage = computed(() => {
  if (props.iconType === ProductDetailHeartPopupType.active) {
    return '좋아요 성공!'
  }
  return props.iconType === ProductDetailHeartPopupType.inactive ? '좋아요 취소!' : '장바구니에 담겼습니다.'
})
</script>
<template>
  <div class="wf_heart-root show">
    <div
      class="wf_heart-container"
      :class="[
        { active: props.iconType === ProductDetailHeartPopupType.active || props.iconType === ProductDetailHeartPopupType.cart },
        { 'in-active': props.iconType === ProductDetailHeartPopupType.inactive }
      ]"
    >
      <IconHeartActive
        v-if="props.iconType === ProductDetailHeartPopupType.active"
        class="i-heart"
        :color="defaultColor.white"
        :width="60"
        :height="60"
      />
      <IconHeartBorder v-else-if="props.iconType === ProductDetailHeartPopupType.inactive" class="i-heart" />
      <IconCart v-else :width="48" :height="47" :color="defaultColor.white" class="i-heart" />
      <span class="wf_font-15--semi wf-px-42 wf-color--g-fff text"> {{ textMessage }} </span>
    </div>
  </div>
</template>
<style>
@import url('@/assets/styles/views/products/detail/_welfare-product-heart.scss');
</style>
