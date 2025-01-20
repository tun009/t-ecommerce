<script setup lang="ts">
type CustomerCommentEmits = (e: 'click') => void

const emits = defineEmits<CustomerCommentEmits>()
</script>

<template>
  <div class="mb-20" @click="emits('click')">
    <span>
      <span class="fw-700 font-19 mr-2">Q.</span>
      이미 가입한 아이디/휴대폰이라고 나옵니다.
    </span>
  </div>
</template>
<style scoped lang="scss">
@import url('@/assets/styles/views/customer/_welfare-customer.scss');
</style>
