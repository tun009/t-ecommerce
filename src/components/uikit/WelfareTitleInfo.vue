<script lang="ts" setup>
interface WelfareContainerProps {
  title?: string
  des?: string
  subDes?: string
}
defineProps<WelfareContainerProps>()
</script>
<template>
  <div class="">
    <div class="wf-cl-border wf-br--g-bbb wf_flex">
      <p class="wf_min-width-120 wf-font_21--bold wf-mr-20">{{ $props.title }}</p>
      <div>
        <h4 class="wf-font_16--bold">{{ $props.des }}</h4>
        <p class="wf-font_14-reg--lh130 wf-mt-12">{{ $props.subDes }}</p>
      </div>
    </div>
  </div>
  <div class="mz_pad-top30"></div>
</template>

<style lang="scss" scoped>
@import url('@/assets/styles/uikit/_welfare-common-review.scss');
</style>
