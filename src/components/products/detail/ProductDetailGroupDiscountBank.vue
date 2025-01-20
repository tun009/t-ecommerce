<script setup lang="ts">
import IconQuestionGreyCircle from '@/components/icons/IconQuestionGreyCircle.vue'
import WelfareViewPrice from '@/components/uikit/product/WelfareViewPrice.vue'

interface Props {
  title: string
}

type Emits = (e: 'click-question') => void

const props = defineProps<Props>()

const emits = defineEmits<Emits>()
</script>
<template>
  <div class="wf_flex wf_justify-between">
    <div class="wf_flex wf_items-center wf-space-x-6">
      <span class="wf-font_13--reg wf-color--g-333">{{ props.title }}</span>
      <button class="wf_flex wf_items-center" @click="emits('click-question')">
        <IconQuestionGreyCircle />
      </button>
    </div>
    <WelfareViewPrice :price="18000" class="wf-font_13--reg wf-color--g-333" class-price="wf-font_13--reg" />
  </div>
</template>
>
