<script lang="ts" setup>
interface ProductOrderTitleProps {
  title: string
  options?: any
  classTitle?: string
  rawText?: boolean
}

type ProductOrderTitleEmits = (e: 'click') => void

const props = withDefaults(defineProps<ProductOrderTitleProps>(), {
  classTitle: 'wf-font_17--bold'
})
const emits = defineEmits<ProductOrderTitleEmits>()
</script>

<template>
  <div @click="emits('click')" class="wf_flex wf_items-center wf_justify-between wf-space-x-5">
    <p class="wf-color--g-111 wf-mt-2 " :class="props.classTitle">{{ props.rawText ? props.title : $t(props.title, options) }}</p>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
