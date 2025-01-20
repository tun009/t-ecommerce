<script setup lang="ts">
interface WelfareNotFound {
  desc: string
}

const props = defineProps<WelfareNotFound>()
</script>
<template>
  <div class="prd-not-found wf-font_15--reg">
    <span>{{ props.desc }}</span>
    <slot name="content" />
  </div>
</template>

<style scoped lang="scss">
.prd {
  &-not-found {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333333;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
